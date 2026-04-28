import {
    
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useBoardStore } from "../../store/boardStore";

interface DeleteBoardProps {
  open: boolean;
  onClose: () => void;
}

export function DeleteBoard({ open, onClose }: DeleteBoardProps) {
  const deleteBoard = useBoardStore((state) => state.deleteBoard);
  const activeBoardId = useBoardStore((state) => state.activeBoardId);

  async function handleDelete() {
    if (!activeBoardId) return;

    await deleteBoard(activeBoardId);
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Board</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete this board?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}