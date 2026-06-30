import { Box,  Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, Typography, } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useDeleteAssignee } from "../../React_Queries/useBoardMutationsDeleteData";

interface DeleteAssigneeProps {
    id: number;
    name: string;
}
export default function DeleteAssignee({id , name}: DeleteAssigneeProps){
    const [open , setOpen] = useState<boolean>(false);
    const deleteAssignee = useDeleteAssignee();
    const [errorMessage, setErrorMessage] = useState<string>("");

    function handleDeleteAssignee() {
        deleteAssignee.mutate(id, {
            onSuccess: () => {
                setErrorMessage("");
                setOpen(false);
            },
            onError: () => {
                setErrorMessage("Failed to delete assignee. Please try again.");
            },
        });
    }
    
    return(
        <Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Delete Assignee</DialogTitle>

                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this assignee {name}?
                    </Typography>
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
                    <IconButton onClick={handleDeleteAssignee} color="primary">
                        <DoneIcon />
                    </IconButton>
                </DialogActions>

            </Dialog>
            
            <Tooltip title="Delete Assignee">
                <IconButton onClick={() => setOpen(true)} color="error">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Box>
    );
}