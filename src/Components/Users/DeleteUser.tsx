import { Box,  Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, Typography, } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useDeleteUser } from "../../React_Queries/useBoardMutationsDeleteData";

interface DeleteUserProps {
    id: number;
    name: string;
}
export default function DeleteUser({id , name}: DeleteUserProps){
    const [open , setOpen] = useState<boolean>(false);
    const deleteUser = useDeleteUser();

    function handleDeleteUser() {
        deleteUser.mutate(id);
        setOpen(false);
    }
    
    return(
        <Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Delete User</DialogTitle>

                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this user {name}?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <IconButton onClick={() => setOpen(false)} color="secondary">
                        <CloseIcon />
                    </IconButton>
                    <IconButton onClick={handleDeleteUser} color="primary">
                        <DoneIcon />
                    </IconButton>
                </DialogActions>

            </Dialog>
            
            <Tooltip title="Delete User">
                <IconButton onClick={() => setOpen(true)} color="error">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Box>
    );
}