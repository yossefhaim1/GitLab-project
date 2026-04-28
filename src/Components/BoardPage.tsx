import { useEffect } from "react";
import Table from "./Board/Board";
import { Box } from "@mui/material";
import { useBoardStore } from "../store/boardStore";
import { FirstBoardForNewUser } from "./FirstBoardForNewUser";
export default function BoardPage() {
  const loading = useBoardStore((state) => state.loading);
  const error = useBoardStore((state) => state.error);
  const fetchBoards = useBoardStore((state) => state.fetchBoards);
  const boards = useBoardStore((state) => state.boards);
  const setActiveBoardId = useBoardStore((state) => state.setActiveBoardId);

   useEffect(() => {
    const load = async () => {
      await fetchBoards();

      const state = useBoardStore.getState();
      const boards = state.boards;

      if (boards.length > 0 && !state.activeBoardId) {
        const defaultBoard =
          boards.find((b) => b.isDefault) ?? boards[0];

        setActiveBoardId(defaultBoard.id);
      }
    };

    load();
  }, [fetchBoards, setActiveBoardId]);
if (loading) {
  return <div>Loading...</div>;
}

if (error && boards.length > 0) {
  return <div>{error}</div>;
}

if (boards.length === 0) {
  return <FirstBoardForNewUser />;
}
  return (
    <Box>
      <Table />
    </Box>
  );
}
