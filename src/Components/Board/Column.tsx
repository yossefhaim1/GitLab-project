import { Box, Typography } from "@mui/material";
import ItemCard from "./ItemCard";
import AddItem from "./AddItem";
import { useBoardStore } from "../../store/boardStore";

type ColumnProps = {
  columnId: string;
};

export default function Column({ columnId }: ColumnProps) {
  const columns = useBoardStore((state) => state.columns);
  const items = useBoardStore((state) => state.items);

  const column = columns.find((col) => col.id === columnId);

  const columnItems = items
    .filter((item) => item.columnId === columnId)
    .sort((b, a) => b.position - a.position);

  if (!column) {
    return null;
  }

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 360,
        backgroundColor: "#ebecf0",
        borderRadius: 3,
        p: 2.25,
        display: "flex",
        flexDirection: "column",
        maxHeight: "100%",
      }}
    >
      <Box
        sx={{
          mb: 2,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "15px",
              letterSpacing: "0.3px",
            }}
          >
            {column.title}
          </Typography>

          <Box
            sx={{
              mt: 0.5,
              height: 4,
              width: "100%",
              borderRadius: 2,
              backgroundColor: column.color,
            }}
          />
        </Box>

        <AddItem columnId={column.id} />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          pr: 0.5,
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#aaa",
            cursor: "default",
            boxShadow: "0 4px 12px rgba(9, 30, 66, 0.15)",
          },
        }}
      >
        {columnItems.map((item) => (
          <ItemCard key={item.id} itemId={item.id} />
        ))}
      </Box>
    </Box>
  );
}