import { useQuery } from "@tanstack/react-query";
import { API } from "../Api/boardPageApi";
import type { Boards, Columns, Items } from "../Type";

const defaultQueryOptions = {
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 10,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchInterval: 1000 * 60 * 5,
  retry: 2,
};

export function useBoards() {
  return useQuery<{ boards: Boards[] }, Error, { boards: Boards[]; defaultBoardId: number | undefined }>({
    queryKey: ["boards"],
    queryFn: API.getBoards,
    ...defaultQueryOptions,
    refetchOnMount: true,
    select: (data) => {
      const boards = data.boards ?? [];
      const defaultBoardId = boards.find((board) => board.isDefault)?.id;
      return { boards, defaultBoardId };
    },
  });
}

export function useColumns(boardId: number | undefined) {
  return useQuery<{ columns: Columns[] }, Error, Columns[]>({
    queryKey: ["columns", boardId],
    queryFn: () => API.getColumnsByBoardId(boardId!),
    enabled: boardId !== undefined,
    ...defaultQueryOptions,
    refetchOnMount: false,
    select: (data) => data.columns ?? [],
  });
}

export function useItems(boardId: number | undefined) {
  return useQuery<Items[], Error, Items[]>({
    queryKey: ["items", boardId],
    queryFn: () => API.getItemsByBoardId(boardId!),
    enabled: boardId !== undefined,
    ...defaultQueryOptions,
    refetchOnMount: false,
  });
}

export function useAssignees() {
  return useQuery({
    queryKey: ["assignees"],
    queryFn: API.getAssignees,
    ...defaultQueryOptions,
    refetchOnMount: true,
    placeholderData: [],
    select: (assignees) => [...assignees].sort((a, b) => a.id - b.id),
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