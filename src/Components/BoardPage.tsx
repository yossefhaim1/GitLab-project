import { useEffect } from "react";
import Table from "./Board/Board";
import { Box } from "@mui/material";
import { useBoardStore } from "../store/boardStore";
import { AddNewBoard } from "./TopAddNewBoard/AddNewBoard";

export default function BoardPage() {
  const activeBoardId = useBoardStore((state) => state.activeBoardId);
  const loading = useBoardStore((state) => state.loading);
  const error = useBoardStore((state) => state.error);
  const fetchBoards = useBoardStore((state) => state.fetchBoards);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  if (loading && !activeBoardId) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!activeBoardId) {
    return <div>No board selected</div>;
  }

  return (
    <Box>
      <AddNewBoard />
      <Table/>
    </Box>
  );
}