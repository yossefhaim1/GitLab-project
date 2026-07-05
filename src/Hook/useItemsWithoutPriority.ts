import { useItems } from "../React_Queries/useBoardsGetData";
import { useBoardStore } from "../store/boardStore";

export function useItemsWithoutPriority() {
  const activeBoard = useBoardStore((state) => state.activeBoardId);

  const { data: items = [], isLoading, error } = useItems(activeBoard);

  const itemsWithoutPriority = items.filter((item) => !item.priorityId);

  return {
    itemsWithoutPriority,
    count: itemsWithoutPriority.length,
    isLoading,
    error,
  };
}