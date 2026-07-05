import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useUpDateAssignee } from "../../React_Queries/useBoardMutationsUpDateData";

interface UpdateAssigneeProps {
  id: number;
  name: string;
}

export default function UpdateAssignee({ id, name }: UpdateAssigneeProps) {
  const updateAssignee = useUpDateAssignee();
  const [open, setOpen] = useState<boolean>(false);
  const [newNameAssignee, setNewNameAssignee] = useState<string>(name);
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleUpdateAssignee() {
    const cleanName = newNameAssignee.trim();

    if (!cleanName) {
      setErrorMessage("Assignee name is required.");
      return;
    }

    updateAssignee.mutate(
      { id, changes: { name: cleanName } },
      {
        onSuccess: () => {
          setErrorMessage("");
          setOpen(false);
        },
        onError: () => {
          setErrorMessage("Failed to update assignee. Please try again.");
        },
      },
    );
  }
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Assignee</DialogTitle>
        <DialogContent>
          <Typography>Enter the new name for the assignee:</Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Assignee Name"
            type="text"
            fullWidth
            variant="standard"
            value={newNameAssignee}
            onChange={(e) => {
              setNewNameAssignee(e.target.value);
              if (errorMessage) {
                setErrorMessage("");
              }
            }}
          />
          {errorMessage ? (
            <Typography color="error" sx={{ mt: 1, fontSize: 13 }}>
              {errorMessage}
            </Typography>
          ) : null}
        </DialogContent>
        <DialogActions>
          <IconButton onClick={() => setOpen(false)} color="secondary">
            <CloseIcon />
          </IconButton>
          <IconButton onClick={handleUpdateAssignee} color="primary">
            <SaveAltIcon />
          </IconButton>
        </DialogActions>
      </Dialog>

      <Tooltip title="Edit Assignee">
        <IconButton onClick={() => setOpen(true)} color="primary">
          <EditIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
