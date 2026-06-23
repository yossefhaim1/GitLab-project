import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useAddUser } from "../../React_Queries/useBoardMutationsAddData";

export default function AddUser() {
  const [open, setOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const addUser = useAddUser();

  function handleSaveUser() {
    const cleanName = userName.trim();

    if (!cleanName) {
      setErrorMessage("User name is required.");
      return;
    }

    addUser.mutate(
      { name: cleanName },
      {
        onSuccess: () => {
          setErrorMessage("");
          setUserName("");
          setOpen(false);
        },
        onError: () => {
          setErrorMessage("Failed to add user. Please try again.");
        },
      },
    );
  }
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add User</DialogTitle>

        <DialogContent>
            <Typography>
                Enter the name of the new user:
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              label="User Name"
              type="text"
              fullWidth
              variant="standard"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
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
            <Button onClick={handleSaveUser} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Add User
      </Button>
    </Box>
  );
}
