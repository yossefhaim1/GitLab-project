import Delete from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useBoardStore } from "../../store/boardStore";

type DeleteItemProps = {
  itemId: string;
};

export default function DeleteItem({ itemId }: DeleteItemProps) {
  const deleteItem = useBoardStore((state) => state.deleteItem);

  async function handleDelete() {
    await deleteItem(itemId);
  }

  return (
    <IconButton
      size="small"
      onClick={handleDelete}
      sx={{ width: 34, height: 34 }}
    >
      <Delete fontSize="small" />
    </IconButton>
  );
}