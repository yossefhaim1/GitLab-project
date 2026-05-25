import { API } from "../Api/boardPageApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {CreateBoardPayload, CreateColumnPayload, CreateItemPayload, CreateUserPayload} from "../Type";
import { useBoardStore } from "../store/boardStore";

// this part its for to ADD data for the boards, columns, items and users 
// by this part "refetchOnMount" in the useQuery in the useBoards, useColumns, useItems and useUsers
// we will get the new data after the add without to do anything because of this part "refetchOnMount: true" in the useQuery 

export function useAddBoard() {
  const queryClient = useQueryClient();

  const setActiveBoardId = useBoardStore(
    (state) => state.setActiveBoardId
  );

  return useMutation({
    mutationFn: (BoardData : CreateBoardPayload) => 
      API.addBoard(BoardData),
    onSuccess: (newBoard) => {
      queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
      setActiveBoardId(newBoard.id);
    },
  });
}

export function useAddColumn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ColumnData : CreateColumnPayload) => API.addColumn(ColumnData),
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
    mutationFn: (ItemData : CreateItemPayload) => API.addItemRequest(ItemData),
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
    mutationFn: (UserData : CreateUserPayload) => API.addUser(UserData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
