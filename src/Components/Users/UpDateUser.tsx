import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from "@mui/icons-material/Edit";
import { useUpDateUser } from "../../React_Queries/useBoardMutationsUpDateData";


interface UpDateUserProps {
  id: number;
  name: string;
}

export default function UpDateUser({ id, name }: UpDateUserProps) {
  const updateUser = useUpDateUser();
  const [open, setOpen] = useState<boolean>(false);
  const [newNameUser, setNewNameUser] = useState<string>(name);

  function hendeleUpdateUser() {
    updateUser.mutate({ id, changes: { name: newNameUser } });
    setOpen(false);
  }
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <Typography>
            Enter the new name for the user:
            </Typography>
            <TextField
              autoFocus
              margin="dense"
                label="User Name"
                type="text"
                fullWidth
                variant="standard"
                value={newNameUser}
                onChange={(e) => setNewNameUser(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
          <IconButton onClick={() => setOpen(false)} color="secondary">
            <CloseIcon />
          </IconButton>
          <IconButton onClick={hendeleUpdateUser} color="primary">
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
