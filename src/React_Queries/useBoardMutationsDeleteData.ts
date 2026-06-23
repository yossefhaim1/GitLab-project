import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../Api/boardPageApi";

export function useDeleteBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardId: number) => API.deleteBoardById(boardId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["columns"] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

export function useDeleteColumn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (columnId: number) => API.deleteColumnById(columnId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns"] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: number) => API.deleteItemById(itemId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["itemTags"] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => API.deleteUserById(userId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

export function useDeletePriority() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (priorityId: number) => API.deletePriorityById(priorityId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["priorities"] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

export function useDeleteTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tagId: number) => API.deleteTagById(tagId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      queryClient.invalidateQueries({ queryKey: ["itemTags"] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

export function useDeleteItemTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemTagId: number) => API.deleteItemTagById(itemTagId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itemTags"] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}