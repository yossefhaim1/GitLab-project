import Delete from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import type { Items } from "../../Type";

interface DeleteItemProps {
  item: Items;
  ondeleteItems: (id: string) => void;
}

export default function DeleteItem({ item, ondeleteItems }: DeleteItemProps) {
  return (
    <IconButton
      size="small"
      onClick={() => ondeleteItems(item.id)}
      sx={{ width: 34, height: 34 }}
    >
      <Delete fontSize="small" />
    </IconButton>
  );
}
