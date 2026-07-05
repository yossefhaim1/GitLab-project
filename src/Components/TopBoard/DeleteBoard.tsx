import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useBoardStore } from "../../store/boardStore";
import { useDeleteBoard } from "../../React_Queries/useBoardMutationsDeleteData";

interface DeleteBoardProps {
  open: boolean;
  onClose: () => void;
}

export function DeleteBoard({ open, onClose }: DeleteBoardProps) {
  const deleteBoard = useDeleteBoard();
  const activeBoardId = useBoardStore((state) => state.activeBoardId);
  const [errorMessage, setErrorMessage] = useState("");

  function handleDelete() {
    if (!activeBoardId) {
      setErrorMessage("No active board selected.");
      return;
    }

    deleteBoard.mutate(activeBoardId, {
      onSuccess: () => {
        setErrorMessage("");
        onClose();
      },
      onError: () => {
        setErrorMessage("Failed to delete board. Please try again.");
      },
    });
  }

  return (
    <Dialog open={open} onClose={onClose} sx={{}}>
      <DialogTitle>Delete Board</DialogTitle>

      <DialogContent>
        <Typography>Are you sure you want to delete this board?</Typography>
        {errorMessage ? (
          <Typography color="error" sx={{ mt: 1 }}>
            {errorMessage}
          </Typography>
        ) : null}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          disabled={deleteBoard.isPending}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
