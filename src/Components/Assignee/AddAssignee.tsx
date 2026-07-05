import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useAddAssignee } from "../../React_Queries/useBoardMutationsAddData";

export default function AddAssignee() {
  const [open, setOpen] = useState<boolean>(false);
  const [assigneeName, setAssigneeName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const addAssignee = useAddAssignee();

  function handleSaveAssignee() {
    const cleanName = assigneeName.trim();

    if (!cleanName) {
      setErrorMessage("Assignee name is required.");
      return;
    }

    addAssignee.mutate(
      { name: cleanName },
      {
        onSuccess: () => {
          setErrorMessage("");
          setAssigneeName("");
          setOpen(false);
        },
        onError: () => {
          setErrorMessage("Failed to add assignee. Please try again.");
        },
      },
    );
  }
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Assignee</DialogTitle>

        <DialogContent>
            <Typography>
                Enter the name of the new assignee:
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              label="Assignee Name"
              type="text"
              fullWidth
              variant="standard"
              value={assigneeName}
              onChange={(e) => {
                setAssigneeName(e.target.value);
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
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveAssignee} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Add Assignee
      </Button>
    </Box>
  );
}
