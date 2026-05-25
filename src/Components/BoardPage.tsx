import { useEffect } from "react";
import Board from "./Board/Board";
import { Box } from "@mui/material";
import { useBoardStore } from "../store/boardStore";
import { FirstBoardForNewUser } from "./FirstBoardForNewUser";
import { useBoards } from "../React_Queries/useBoardsGetData";

export default function BoardPage() {
   const { data: { defaultBoardId , boards } = {} , isLoading, error } = useBoards();

  const activeBoardId = useBoardStore((state) => state.activeBoardId);
  const setActiveBoardId = useBoardStore((state) => state.setActiveBoardId);

  useEffect(() => {
    if (!activeBoardId && defaultBoardId) {
      setActiveBoardId(defaultBoardId);
    }
  }, [activeBoardId, defaultBoardId, setActiveBoardId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (boards?.length === 0) {
    return <FirstBoardForNewUser />;
  }

  return (
    <Box>
      <Board />
    </Box>
  );
}