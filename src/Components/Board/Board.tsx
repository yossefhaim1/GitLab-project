import { Box } from "@mui/material";
import Column from "./Column";
import { useBoardStore } from "../../store/boardStore";

export default function Board() {
  const columns = useBoardStore((state) => state.columns);
  const activeBoardId = useBoardStore((state) => state.activeBoardId);

  if (!activeBoardId) return null;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2.5,
        px: 3,
        py: 2.5,
        backgroundColor: "#f4f5f7",
        width: "100%",
        height: "100vh",
        overflowX: "auto",
        boxSizing: "border-box",
      }}
    >
      {columns.map((column) => (
        <Column key={column.id} columnId={column.id} />
      ))}
    </Box>
  );
}