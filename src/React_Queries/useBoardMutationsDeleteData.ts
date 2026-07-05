import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../Api/boardPageApi";
import { useActiveBoardId } from "../Hook/useActiveBoardId";

export function useDeleteBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardId: number) => API.deleteBoardById(boardId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}

export function useDeleteColumn() {
  const queryClient = useQueryClient();
  const boardId = useActiveBoardId();

  return useMutation({
    mutationFn: (columnId: number) => API.deleteColumnById(columnId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns", boardId] });
      queryClient.invalidateQueries({ queryKey: ["items", boardId] });
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();
  const boardId = useActiveBoardId();

  return useMutation({
    mutationFn: (itemId: number) => API.deleteItemById(itemId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items", boardId] });
    },
  });
}

export function useDeleteAssignee() {
  const queryClient = useQueryClient();
  const boardId = useActiveBoardId();

  return useMutation({
    mutationFn: (assigneeId: number) => API.deleteAssigneeById(assigneeId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignees"] });
      queryClient.invalidateQueries({ queryKey: ["items", boardId] });
    },
  });
}

export function useDeletePriority() {
  const queryClient = useQueryClient();
  const boardId = useActiveBoardId();

  return useMutation({
    mutationFn: (priorityId: number) => API.deletePriorityById(priorityId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["priorities"] });
      queryClient.invalidateQueries({ queryKey: ["items", boardId] });
    },
  });
}

export function useDeleteTag() {
  const queryClient = useQueryClient();
  const boardId = useActiveBoardId();

  return useMutation({
    mutationFn: (tagId: number) => API.deleteTagById(tagId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      queryClient.invalidateQueries({ queryKey: ["items", boardId] });
    },
  });
}

export function useDeleteItemTag() {
  const queryClient = useQueryClient();
  const boardId = useActiveBoardId();

  return useMutation({
    mutationFn: (itemTagId: number) => API.deleteItemTagById(itemTagId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items", boardId] });
    },
  });
}