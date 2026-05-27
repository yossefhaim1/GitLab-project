import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useAddUser } from "../../React_Queries/useBoardMutationsAddData";

export default function AddUser() {
  const [open, setOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const addUser = useAddUser();

  function handleSaveUser() {
    if (!userName.trim()) return;
    addUser.mutate({ name: userName });
    setUserName("");
    setOpen(false);
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
              onChange={(e) => setUserName(e.target.value)}
            />
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
