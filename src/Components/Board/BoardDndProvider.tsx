import {
  DndContext,
  closestCorners,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import ItemCard from "./ItemCard";
import type { Items } from "../../Type";
import { useQueryClient } from "@tanstack/react-query";
import { API } from "../../Api/boardPageApi";
import { useBoardStore } from "../../store/boardStore";

type BoardDndProviderProps = {
  children: React.ReactNode;
  items: Items[];
};

export default function BoardDndProvider({
  children,
  items,
}: BoardDndProviderProps) {
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const activeBoardId = useBoardStore((state) => state.activeBoardId);
  const queryClient = useQueryClient();

  function toSortedItems(nextItems: Items[]) {
    return [...nextItems].sort((a, b) => a.position - b.position);
  }

  function getItemId(id: string | number) {
    return Number(String(id).replace("item-", ""));
  }

  function getColumnId(id: string | number) {
    return Number(String(id).replace("column-", ""));
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveItemId(getItemId(event.active.id));
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveItemId(null);

    if (!over) return;

    const activeItemId = getItemId(active.id);
    const overId = String(over.id);

    if (!activeBoardId) return;

    const previousItems = items;

    try {

    const activeItem = items.find((item) => item.id === activeItemId);
    if (!activeItem) return;

    const sourceColumnId = activeItem.columnId;

    let targetColumnId = sourceColumnId;
    let overItemId: number | null = null;

    if (overId.startsWith("column-")) {
      targetColumnId = getColumnId(over.id);
    }

    if (overId.startsWith("item-")) {
      overItemId = getItemId(over.id);

      const overItem = items.find((item) => item.id === overItemId);
      if (!overItem) return;

      targetColumnId = overItem.columnId;
    }

    const sourceItems = items
      .filter((item) => item.columnId === sourceColumnId)
      .sort((a, b) => a.position - b.position);

    const targetItems = items
      .filter((item) => item.columnId === targetColumnId)
      .sort((a, b) => a.position - b.position);

    if (sourceColumnId === targetColumnId) {
      if (overItemId === null) return;

      const oldIndex = sourceItems.findIndex(
        (item) => item.id === activeItemId
      );

      const newIndex = sourceItems.findIndex(
        (item) => item.id === overItemId
      );

      if (oldIndex === -1 || newIndex === -1) return;
      if (oldIndex === newIndex) return;

      const reorderedItems = arrayMove(sourceItems, oldIndex, newIndex).map(
        (item, index) => ({
          ...item,
          position: index + 1,
        })
      );

      const nextItems = items.map((item) => {
        const updatedItem = reorderedItems.find((updated) => updated.id === item.id);
        return updatedItem ?? item;
      });

      queryClient.setQueryData(["items", activeBoardId], toSortedItems(nextItems));

      const changedItems = reorderedItems.filter((item) => {
        const originalItem = sourceItems.find((sourceItem) => sourceItem.id === item.id);
        return originalItem?.position !== item.position;
      });

      await Promise.all(
        changedItems.map((item) =>
          API.updateItemRequest(item.id, {
            position: item.position,
          })
        )
      );

      queryClient.invalidateQueries({ queryKey: ["items", activeBoardId] });

      return;
    }

    const updatedSourceItems = sourceItems
      .filter((item) => item.id !== activeItemId)
      .map((item, index) => ({
        ...item,
        position: index + 1,
      }));

    const movedItem = {
      ...activeItem,
      columnId: targetColumnId,
    };

    let insertIndex = targetItems.length;

    if (overItemId !== null) {
      const foundIndex = targetItems.findIndex(
        (item) => item.id === overItemId
      );

      insertIndex = foundIndex === -1 ? targetItems.length : foundIndex;
    }

    const updatedTargetItems = [...targetItems];

    updatedTargetItems.splice(insertIndex, 0, movedItem);

    const fixedTargetItems = updatedTargetItems.map((item, index) => ({
      ...item,
      columnId: targetColumnId,
      position: index + 1,
    }));

    const nextItems = items.map((item) => {
      const updatedSourceItem = updatedSourceItems.find(
        (updated) => updated.id === item.id
      );

      if (updatedSourceItem) {
        return updatedSourceItem;
      }

      const updatedTargetItem = fixedTargetItems.find(
        (updated) => updated.id === item.id
      );

      return updatedTargetItem ?? item;
    });

    queryClient.setQueryData(["items", activeBoardId], toSortedItems(nextItems));

    const changedSourceItems = updatedSourceItems.filter((item) => {
      const originalItem = sourceItems.find((sourceItem) => sourceItem.id === item.id);
      return originalItem?.position !== item.position;
    });

    const changedTargetItems = fixedTargetItems.filter((item) => {
      const originalItem = items.find((currentItem) => currentItem.id === item.id);
      return (
        originalItem?.columnId !== item.columnId ||
        originalItem?.position !== item.position
      );
    });

    await Promise.all([
      ...changedSourceItems.map((item) =>
        API.updateItemRequest(item.id, {
          position: item.position,
        })
      ),
      ...changedTargetItems.map((item) =>
        API.updateItemRequest(item.id, {
          columnId: item.columnId,
          position: item.position,
        })
      ),
    ]);

    queryClient.invalidateQueries({ queryKey: ["items", activeBoardId] });
    } catch {
      queryClient.setQueryData(["items", activeBoardId], toSortedItems(previousItems));
      alert("Failed to move item. Please try again.");
    }
  }

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}

      <DragOverlay>
        {activeItemId !== null ? <ItemCard itemId={activeItemId} /> : null}
      </DragOverlay>
    </DndContext>
  );
}