import { useEffect } from "react";
import Board from "./Board/Board";
import { Box } from "@mui/material";
import { useBoardStore } from "../store/boardStore";
import { FirstBoardForNewUser } from "./FirstBoardForNewUser";
import { useBoards } from "../React_Queries/useBoardsGetData";

export default function BoardPage() {
  const { data, isLoading, isFetching, error } = useBoards();
  const defaultBoardId = data?.defaultBoardId;
  const boards = data?.boards ?? [];

  const activeBoardId = useBoardStore((state) => state.activeBoardId);
  const setActiveBoardId = useBoardStore((state) => state.setActiveBoardId);

  useEffect(() => {
    const activeBoardExists = boards.some((board) => board.id === activeBoardId);

    if (!activeBoardId && defaultBoardId) {
      setActiveBoardId(defaultBoardId);
      return;
    }

    if (activeBoardId && !activeBoardExists && !isFetching && defaultBoardId) {
      setActiveBoardId(defaultBoardId);
    }
  }, [activeBoardId, defaultBoardId, boards, isFetching, setActiveBoardId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (boards.length === 0) {
    return <FirstBoardForNewUser />;
  }

  return (
    <Box>
      <Board />
    </Box>
  );
}