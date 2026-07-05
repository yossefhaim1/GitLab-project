import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDeleteColumn } from "../../React_Queries/useBoardMutationsDeleteData";

interface DeleteColumnProps {
  columnId: number;
}

export function DeleteColumn({ columnId }: DeleteColumnProps) {
  const [open, setOpen] = useState(false);
  const deleteColumn = useDeleteColumn();
  const [errorMessage, setErrorMessage] = useState("");

  function handleDelete() {
    deleteColumn.mutate(columnId, {
      onSuccess: () => {
        setErrorMessage("");
        setOpen(false);
      },
      onError: () => {
        setErrorMessage("Failed to delete column. Please try again.");
      },
    });
  }

  return (
    <Box>
      <Tooltip title="Delete Column" placement="bottom" arrow enterDelay={200}>
        <IconButton
          size="small"
          onClick={() => setOpen(true)}
          sx={{ width: 34, height: 34 }}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete Column</DialogTitle>

        <DialogContent>
          <Typography>Are you sure you want to delete this column?</Typography>
          {errorMessage ? (
            <Typography color="error" sx={{ mt: 1 }}>
              {errorMessage}
            </Typography>
          ) : null}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleteColumn.isPending}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
