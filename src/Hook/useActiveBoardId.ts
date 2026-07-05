import { useBoardStore } from "../store/boardStore";

export function useActiveBoardId() {
  return useBoardStore((state) => state.activeBoardId);
}