import { API } from "../Api/boardPageApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  CreateBoardPayload,
  CreateColumnPayload,
  CreateItemPayload,
  CreateUserPayload,
  CreatePriorityPayload,
  CreateTagPayload,
  CreateItemTagPayload,
} from "../Type";
import { useBoardStore } from "../store/boardStore";

export function useAddBoard() {
  const queryClient = useQueryClient();
  const setActiveBoardId = useBoardStore((state) => state.setActiveBoardId);

  return useMutation({
    mutationFn: (boardData: CreateBoardPayload) => API.addBoard(boardData),

    onSuccess: (newBoard) => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      setActiveBoardId(newBoard.id);
    },
  });
}

export function useAddColumn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (columnData: CreateColumnPayload) => API.addColumn(columnData),

    onSuccess: (newColumn) => {
      queryClient.invalidateQueries({ queryKey: ["columns", newColumn.boardId] });
    },
  });
}

export function useAddItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemData: CreateItemPayload) => API.addItemRequest(itemData),

    onSuccess: (newItem) => {
      queryClient.invalidateQueries({ queryKey: ["items", newItem.boardId] });
    },
  });
}

export function useAddItemWithTags() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      item,
      tagIds,
    }: {
      item: CreateItemPayload;
      tagIds: number[];
    }) => {
      const newItem = await API.addItemRequest(item);

      await Promise.all(
        tagIds.map((tagId) =>
          API.addItemTag({
            itemId: newItem.id,
            tagId,
          })
        )
      );

      return newItem;
    },

    onSuccess: (newItem) => {
      queryClient.invalidateQueries({ queryKey: ["items", newItem.boardId] });
    },
  });
}

export function useAddUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: CreateUserPayload) => API.addUser(userData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useAddPriority() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (priorityData: CreatePriorityPayload) =>
      API.addPriority(priorityData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["priorities"] });
    },
  });
}

export function useAddTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tagData: CreateTagPayload) => API.createTag(tagData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
}

export function useAddItemTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemTagData: CreateItemTagPayload) =>
      API.addItemTag(itemTagData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itemTags"] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}