import { API } from "../Api/boardPageApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";


// this part its for to ADD data for the boards, columns, items and users 
// by this part "refetchOnMount" in the useQuery in the useBoards, useColumns, useItems and useUsers
// we will get the new data after the add without to do anything because of this part "refetchOnMount: true" in the useQuery 

export function useAddBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: API.addBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
    },
  });
}

export function useAddColumn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: API.addColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["columns"],
      });
    },
  });
}

export function useAddItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: API.addItemRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });
}

export function useAddUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: API.addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
