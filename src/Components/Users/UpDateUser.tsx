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
import { useUpDateUser } from "../../React_Queries/useBoardMutationsUpDateData";

interface UpdateUserProps {
  id: number;
  name: string;
}

export default function UpdateUser({ id, name }: UpdateUserProps) {
  const updateUser = useUpDateUser();
  const [open, setOpen] = useState<boolean>(false);
  const [newNameUser, setNewNameUser] = useState<string>(name);
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleUpdateUser() {
    const cleanName = newNameUser.trim();

    if (!cleanName) {
      setErrorMessage("User name is required.");
      return;
    }

    updateUser.mutate(
      { id, changes: { name: cleanName } },
      {
        onSuccess: () => {
          setErrorMessage("");
          setOpen(false);
        },
        onError: () => {
          setErrorMessage("Failed to update user. Please try again.");
        },
      },
    );
  }
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <Typography>Enter the new name for the user:</Typography>
          <TextField
            autoFocus
            margin="dense"
            label="User Name"
            type="text"
            fullWidth
            variant="standard"
            value={newNameUser}
            onChange={(e) => {
              setNewNameUser(e.target.value);
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
          <IconButton onClick={handleUpdateUser} color="primary">
            <SaveAltIcon />
          </IconButton>
        </DialogActions>
      </Dialog>

      <Tooltip title="Edit User">
        <IconButton onClick={() => setOpen(true)} color="primary">
          <EditIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
