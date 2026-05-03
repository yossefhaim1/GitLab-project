import { Box, Stack, Typography } from "@mui/material";
import ItemCard from "./ItemCard";
import AddItem from "./AddItem";
import { useBoardStore } from "../../store/boardStore";
import { DeleteColumn } from "../TopColum/DeletColumn";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type ColumnProps = {
  columnId: number;
};

export default function Column({ columnId }: ColumnProps) {
  const columns = useBoardStore((state) => state.columns);
  const items = useBoardStore((state) => state.items);
  const searchItem = useBoardStore((state) => state.searchItem);

  const column = columns.find((col) => col.id === columnId);

  const { setNodeRef } = useDroppable({
    id: `column-${columnId}`,
  });

  const columnItems = items
    .filter((item) => {
      const searchWords = searchItem
        .toLowerCase()
        .trim()
        .split(" ")
        .filter(Boolean);

      const title = item.title.toLowerCase();

      const isSameColumn = item.columnId === columnId;

      const isMatchSearch =
        searchWords.length === 0 ||
        searchWords.every((word) => title.includes(word));

      return isSameColumn && isMatchSearch;
    })
    .sort((a, b) => a.position - b.position);

  if (!column) {
    return null;
  }

  return (
    <Box
      sx={{
        flex: "0 0 calc((100% - 48px) /3.5)",
        minWidth: "calc((100% - 48px) / 3.5)",
        maxWidth: "calc((100% - 48px) / 3.5)",
        backgroundColor: "#ebecf0",
        borderRadius: 3.5,
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
        ref={setNodeRef}
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
        <SortableContext
          items={columnItems.map((item) => `item-${item.id}`)}
          strategy={verticalListSortingStrategy}
        >
          {columnItems.map((item) => (
            <ItemCard key={item.id} itemId={item.id} />
          ))}
        </SortableContext>
      </Box>
    </Box>
  );
}