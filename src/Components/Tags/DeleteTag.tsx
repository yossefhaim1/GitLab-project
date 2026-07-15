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
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDeleteTag } from "../../React_Queries/useBoardMutationsDeleteData";

interface DeleteTagProps {
  id: number;
  title: string;
}

export function DeleteTag({ id, title }: DeleteTagProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const deleteTag = useDeleteTag();

  function handleOpen() {
    setErrorMessage("");
    setOpen(true);
  }

  function handleClose() {
    setErrorMessage("");
    setOpen(false);
  }

  function handleDeleteTag() {
    deleteTag.mutate(id, {
      onSuccess: () => {
        setErrorMessage("");
        setOpen(false);
      },
      onError: () => {
        setErrorMessage("Failed to delete tag. Please try again.");
      },
    });
  }

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Tag</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete the tag "{title}"?
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
              disabled={deleteTag.isPending}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              onClick={handleDeleteTag}
              color="primary"
              disabled={deleteTag.isPending}
            >
              <DoneIcon />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </Dialog>

      <Tooltip title="Delete Tag">
        <IconButton onClick={handleOpen} color="error">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}