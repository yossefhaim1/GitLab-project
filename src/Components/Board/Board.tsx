import { Box } from "@mui/material";
import type { Columns, Items } from "../../Type";
import Column from "./Column";

type BoardProps = {
  columns: Columns[];
  items: Items[];
  ondeleteItems: (id: string) => void;
  onaddItem: (item: Items) => void;
  boardId: string; // 👈 תוסיף אם אין ל-column boardId קבוע
  updateItem: (id: string, changes: Partial<Items>) => void; 
};

export default function Board({
  columns,
  items,
  ondeleteItems,
  onaddItem,
  boardId,
  updateItem
}: BoardProps) {
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
      {columns.map((column) => {
        const columnItems = items
          .filter((item) => item.columnId === column.id)
          .sort((b, a) => a.position - b.position);

        return (
          <Column
            key={column.id}
            column={column}
            items={columnItems}   // ✅ items של העמודה
            allItems={items}      // ✅ כל items של הבורד (בשביל ID הבא)
            boardId={boardId}     // ✅ אם צריך
            ondeleteItems={ondeleteItems}
            onaddItem={onaddItem}
            updateItem={updateItem}
            columns={columns}
          />
        );
      })}
    </Box>
  );
}