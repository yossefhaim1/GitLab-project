import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDeletePriority } from "../../React_Queries/useBoardMutationsDeleteData";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

interface DeletePriorityProps {
  id: number;
  type: string;
}

export function DeletePriority({ id, type }: DeletePriorityProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const deletePriority = useDeletePriority();

  function handleOpen() {
    setErrorMessage("");
    setOpen(true);
  }

  function handleClose() {
    setErrorMessage("");
    setOpen(false);
  }

  function handleDeletePriority() {
    deletePriority.mutate(id, {
      onSuccess: () => {
        setErrorMessage("");
        setOpen(false);
      },
      onError: () => {
        setErrorMessage("Failed to delete this priority. Please try again.");
      },
    });
  }

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Priority</DialogTitle>

        <DialogContent>
          <Typography sx={{ mt: 1, fontSize: 14  }}>
            Are you sure you want to delete the priority "{type}"?
          </Typography>

          {errorMessage ? (
            <Typography color="error" sx={{ mt: 1, fontSize: 13 }}>
              {errorMessage}
            </Typography>
          ) : null}
        </DialogContent>

        <DialogActions>
          <Tooltip title="Cancel">
            <IconButton
              autoFocus
              onClick={handleClose}
              color="secondary"
              disabled={deletePriority.isPending}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              onClick={handleDeletePriority}
              color="primary"
              disabled={deletePriority.isPending}
            >
              <DoneIcon />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </Dialog>

      <Tooltip title="Delete Priority">
        <IconButton onClick={handleOpen} color="error">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}