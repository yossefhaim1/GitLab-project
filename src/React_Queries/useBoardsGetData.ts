import { useQuery } from "@tanstack/react-query";
import { API } from "../Api/boardPageApi";

const defaultQueryOptions = {
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 10,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchInterval: 1000 * 60 * 5,
  retry: 2,
};

export function useBoards() {
  return useQuery({
    queryKey: ["boards"],
    queryFn: API.getBoards,
    ...defaultQueryOptions,
    refetchOnMount: true,
    placeholderData: [],
    select: (boards) => {
      const defaultBoardId = boards.find((board) => board.isDefault)?.id;
      return { boards, defaultBoardId };
    },
  });
}

export function useColumns(boardId: number | undefined) {
  return useQuery({
    queryKey: ["columns", boardId],
    queryFn: () => API.getColumnsByBoardId(boardId!),
    enabled: boardId !== undefined,
    ...defaultQueryOptions,
    refetchOnMount: false,
    placeholderData: [],
    select: (columns) => [...columns].sort((a, b) => a.order - b.order),
  });
}

export function useItems(boardId: number | undefined) {
  return useQuery({
    queryKey: ["items", boardId],
    queryFn: () => API.getItemsByBoardId(boardId!),
    enabled: boardId !== undefined,
    ...defaultQueryOptions,
    refetchOnMount: false,
    placeholderData: [],
    select: (items) => [...items].sort((a, b) => a.position - b.position),
  });
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: API.getUsers,
    ...defaultQueryOptions,
    refetchOnMount: true,
    placeholderData: [],
    select: (users) => [...users].sort((a, b) => a.id - b.id),
  });
}

export function usePriorities() {
  return useQuery({
    queryKey: ["priorities"],
    queryFn: API.getPriorities,
    ...defaultQueryOptions,
    refetchOnMount: true,
    placeholderData: [],
    select: (priorities) => [...priorities].sort((a, b) => a.id - b.id),
  });
}

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: API.getTags,
    ...defaultQueryOptions,
    refetchOnMount: true,
    placeholderData: [],
    select: (tags) => [...tags].sort((a, b) => a.id - b.id),
  });
}

export function useItemTags(itemId: number | undefined) {
  return useQuery({
    queryKey: ["itemTags", itemId],
    queryFn: () => API.getTagsByItemId(itemId!),
    enabled: itemId !== undefined,
    ...defaultQueryOptions,
    refetchOnMount: true,
    placeholderData: [],
  });
}