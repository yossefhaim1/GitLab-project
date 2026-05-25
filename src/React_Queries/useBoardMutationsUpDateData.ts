import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../Api/boardPageApi";
import type { Items, User } from "../Type";

export function useUpDateBoard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (boardData: { id: number }) =>
      API.updateBoardById(boardData.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
    },
  });
}

export function useUpDateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemData: { id: number; changes: Partial<Items> }) =>
      API.updateItemRequest(itemData.id, itemData.changes),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });
}

export function useUpDateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: { id: number; changes: Partial<User> }) =>
      API.updateUserById(userData.id, userData.changes),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
