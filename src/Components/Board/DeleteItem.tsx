import Delete from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
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
import { useDeleteItem } from "../../React_Queries/useBoardMutationsDeleteData";

type DeleteItemProps = {
  itemId: number;
};

export default function DeleteItem({ itemId }: DeleteItemProps) {
  const deleteItem = useDeleteItem();
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleDelete() {
    deleteItem.mutate(itemId, {
      onSuccess: () => {
        setErrorMessage("");
        setOpen(false);
      },
      onError: () => {
        setErrorMessage("Failed to delete this item. Please try again.");
      },
    });
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
          {errorMessage ? (
            <Typography color="error" sx={{ mt: 1 }}>
              {errorMessage}
            </Typography>
          ) : null}
        </DialogContent>

        <DialogActions>
            <Button autoFocus onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleteItem.isPending}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
