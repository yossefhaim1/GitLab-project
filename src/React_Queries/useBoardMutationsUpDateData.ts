import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../Api/boardPageApi";
import type {
  Boards,
  Columns,
  Items,
  User,
  Priority,
  Tag,
} from "../Type";
import { useActiveBoardId } from "../Hook/useActiveBoardId";

export function useUpDateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardData: { id: number; changes: Partial<Boards> }) =>
      API.updateBoardById(boardData.id, boardData.changes),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}

export function useSetDefaultBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardData: { id: number }) =>
      API.setDefaultBoard(boardData.id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}

export function useUpDateColumn() {
  const queryClient = useQueryClient();
  const boardId = useActiveBoardId();

  return useMutation({
    mutationFn: (columnData: { id: number; changes: Partial<Columns> }) =>
      API.updateColumnById(columnData.id, columnData.changes),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns", boardId] });
    },
  });
}

export function useUpDateItem() {
  const queryClient = useQueryClient();
  const boardId = useActiveBoardId();

  return useMutation({
    mutationFn: (itemData: { id: number; changes: Partial<Items> }) =>
      API.updateItemRequest(itemData.id, itemData.changes),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items", boardId] });
    },
  });
}

export function useUpdateItemWithTags() {
  const queryClient = useQueryClient();
  const boardId = useActiveBoardId();

  return useMutation({
    mutationFn: async ({id,changes,tagIds,}: {id: number;changes: Partial<Items>;tagIds: number[];}) => {
      let updatedItem: Items | null = null;

      if (Object.keys(changes).length > 0) {
        updatedItem = await API.updateItemRequest(id, changes);
      }

      const currentItemTags =
        await API.getItemTagRelationsByItemId(id);

      const currentTagIds = currentItemTags.map(
        (itemTag) => itemTag.tagId
      );

      const tagsToAdd = tagIds.filter(
        (tagId) => !currentTagIds.includes(tagId)
      );

      const itemTagsToDelete = currentItemTags.filter(
        (itemTag) => !tagIds.includes(itemTag.tagId)
      );

      await Promise.all(
        itemTagsToDelete.map((itemTag) =>
          API.deleteItemTagById(itemTag.id)
        )
      );

      await Promise.all(
        tagsToAdd.map((tagId) =>
          API.addItemTag({
            itemId: id,
            tagId,
          })
        )
      );

      return updatedItem;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items", boardId] });

    },
  });
}

export function useUpDateUser() {
  const queryClient = useQueryClient();
  const boardId = useActiveBoardId();

  return useMutation({
    mutationFn: (userData: { id: number; changes: Partial<User> }) =>
      API.updateUserById(userData.id, userData.changes),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["items", boardId] });
    },
  });
}

export function useUpDatePriority() {
  const queryClient = useQueryClient();
  const boardId = useActiveBoardId();

  return useMutation({
    mutationFn: (priorityData: { id: number; changes: Partial<Priority> }) =>
      API.updatePriorityById(priorityData.id, priorityData.changes),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["priorities"] });
      queryClient.invalidateQueries({ queryKey: ["items", boardId] });
    },
  });
}

export function useUpDateTag() {
  const queryClient = useQueryClient();
  const boardId = useActiveBoardId();

  return useMutation({
    mutationFn: (tagData: { id: number; changes: Partial<Tag> }) =>
      API.updateTagById(tagData.id, tagData.changes),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      queryClient.invalidateQueries({ queryKey: ["items", boardId] });
    },
  });
  
}