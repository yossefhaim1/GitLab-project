import { Box, Stack, Typography } from "@mui/material";
import ItemCard from "./ItemCard";
import AddItem from "./AddItem";
import { useBoardStore } from "../../store/boardStore";
import { DeleteColumn } from "../TopColum/DeletColumn";

type ColumnProps = {
  columnId: number;
};

export default function Column({ columnId }: ColumnProps) {
  const columns = useBoardStore((state) => state.columns);
  const items = useBoardStore((state) => state.items);
  const searchItem = useBoardStore((state) => state.searchItem);

  const column = columns.find((col) => col.id === columnId);

 const columnItems = items
  .filter((item) => {
    const search = searchItem.toLowerCase().trim();

    const isSameColumn = item.columnId === columnId;

    const isMatchSearch =
      search === "" ||
      item.title.toLowerCase().includes(search);

    return isSameColumn && isMatchSearch;
  })
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
        <Stack direction="row" gap={1}>
          <DeleteColumn columnId={column.id} />
          <AddItem columnId={column.id} />
        </Stack>
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
