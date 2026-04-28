import Delete from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useBoardStore } from "../../store/boardStore";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

type DeleteItemProps = {
  itemId: number;
};

export default function DeleteItem({ itemId }: DeleteItemProps) {
  const deleteItem = useBoardStore((state) => state.deleteItem);
  const [open, setOpen] = useState<boolean>(false);

  async function handleDelete() {
    await deleteItem(itemId);
    setOpen(false);
  }

  return (
    <Box>
      <Tooltip title="Delete Task" placement="bottom" arrow enterDelay={200}>
        <IconButton
          size="small"
          onClick={() => setOpen(true)}
          sx={{ width: 34, height: 34 }}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete Item</DialogTitle>

        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
