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
import { useBoardStore } from "../../store/boardStore";
import { useState } from "react";

interface DeleteColumnProps {
  columnId: number;
}

export function DeleteColumn({ columnId }: DeleteColumnProps) {
  const deleteColumn = useBoardStore((state) => state.deleteColumn);
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    await deleteColumn(columnId);
    setOpen(false);
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
