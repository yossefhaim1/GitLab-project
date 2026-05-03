import {
  DndContext,
  closestCorners,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { useBoardStore } from "../../store/boardStore";
import ItemCard from "./ItemCard";

type BoardDndProviderProps = {
  children: React.ReactNode;
};

export default function BoardDndProvider({ children }: BoardDndProviderProps) {
  const [activeItemId, setActiveItemId] = useState<number | null>(null);

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

    const items = useBoardStore.getState().items;
    const setItems = useBoardStore.getState().setItems;
    const updateItem = useBoardStore.getState().updateItem;

    const activeItemId = getItemId(active.id);
    const overId = String(over.id);

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

      const oldIndex = sourceItems.findIndex((item) => item.id === activeItemId);
      const newIndex = sourceItems.findIndex((item) => item.id === overItemId);

      if (oldIndex === -1 || newIndex === -1) return;
      if (oldIndex === newIndex) return;

      const reorderedItems = arrayMove(sourceItems, oldIndex, newIndex).map(
        (item, index) => ({
          ...item,
          position: index + 1,
        })
      );

      const updatedItems = items.map((item) => {
        return reorderedItems.find((changed) => changed.id === item.id) ?? item;
      });

      setItems(updatedItems);

      for (const item of reorderedItems) {
        await updateItem(item.id, {
          position: item.position,
        });
      }

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
      const foundIndex = targetItems.findIndex((item) => item.id === overItemId);
      insertIndex = foundIndex === -1 ? targetItems.length : foundIndex;
    }

    const updatedTargetItems = [...targetItems];

    updatedTargetItems.splice(insertIndex, 0, movedItem);

    const fixedTargetItems = updatedTargetItems.map((item, index) => ({
      ...item,
      columnId: targetColumnId,
      position: index + 1,
    }));

    const updatedItems = items.map((item) => {
      const sourceChanged = updatedSourceItems.find(
        (changed) => changed.id === item.id
      );

      if (sourceChanged) return sourceChanged;

      const targetChanged = fixedTargetItems.find(
        (changed) => changed.id === item.id
      );

      if (targetChanged) return targetChanged;

      return item;
    });

    setItems(updatedItems);

    for (const item of updatedSourceItems) {
      await updateItem(item.id, {
        position: item.position,
      });
    }

    for (const item of fixedTargetItems) {
      await updateItem(item.id, {
        columnId: item.columnId,
        position: item.position,
      });
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