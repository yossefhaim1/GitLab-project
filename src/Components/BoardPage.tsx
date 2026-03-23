import { useEffect } from "react";
import Table from "./Board/Board";
import { Box } from "@mui/material";
import { useBoardStore } from "../store/boardStore";

export default function BoardPage() {
  const activeBoardId = useBoardStore((state) => state.activeBoardId);
  const columns = useBoardStore((state) => state.columns);
  const items = useBoardStore((state) => state.items);
  const loading = useBoardStore((state) => state.loading);
  const error = useBoardStore((state) => state.error);
  const fetchBoards = useBoardStore((state) => state.fetchBoards);
  const addItem = useBoardStore((state) => state.addItem);
  const updateItem = useBoardStore((state) => state.updateItem);
  const deleteItem = useBoardStore((state) => state.deleteItem);

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
      <Table
        columns={columns}
        items={items}
        ondeleteItems={deleteItem}
        onaddItem={addItem}
        boardId={activeBoardId}
        updateItem={updateItem}
      />
    </Box>
  );
}