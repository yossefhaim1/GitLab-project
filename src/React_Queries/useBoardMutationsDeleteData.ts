import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../Api/boardPageApi";

export function useDeleteBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardId: number | undefined) => API.deleteBoardById(boardId!),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
    },
  });
}

export function useDeleteColumn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (columnId: number | undefined) =>
      API.DeleteColumnById(columnId!),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["columns"],
      });
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ItemId: number | undefined) => API.deleteItemById(ItemId!),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (UserId: number | undefined) => API.deleteUserById(UserId!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
