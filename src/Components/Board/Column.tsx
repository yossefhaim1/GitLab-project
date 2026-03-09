import { Box, Typography } from "@mui/material";
import type { Columns, Items } from "../../Type";
import ItemCard from "./ItemCard";
import AddItem from "./AddItem";

type ColumnProps = {
  column: Columns;
  items: Items[];      // של העמודה בלבד
  allItems: Items[];   // של כל הבורד (ל-id הבא)
  boardId: string;     // אם אין column.boardId תמיד
  ondeleteItems: (id: string) => void;
  onaddItem: (item: Items) => void;
  updateItem: (id: string, changes: Partial<Items>) => void; 
  columns: Columns[];
};

export default function Column({column, items, allItems, boardId, ondeleteItems, onaddItem, updateItem , columns}: ColumnProps) {
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
      {/* Header */}
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
          <Typography sx={{ fontWeight: 800, fontSize: "15px", letterSpacing: "0.3px" }}>
            {column.title}
          </Typography>

          <Box sx={{ mt: 0.5, height: 4, width: "100%", borderRadius: 2, backgroundColor: column.color }} />
        </Box>

        <AddItem
          boardId={boardId}
          columnId={column.id}
          status={column.statusKey}
          allItems={allItems}
          onaddItem={onaddItem}
        />
      </Box>

      {/* Items */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          pr: 0.5,
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#ccc", borderRadius: "10px" },
          "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#aaa", cursor: "default", boxShadow: "0 4px 12px rgba(9, 30, 66, 0.15)" },
        }}
      >
        {items.map((item) => (
          <ItemCard key={item.id} item={item} column={column} ondeleteItems={ondeleteItems} updateItem={updateItem} columns={columns}/>
        ))}
      </Box>
    </Box>
  );
}