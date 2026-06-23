import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, Typography } from "@mui/material";
import { useDeletePriority } from "../../React_Queries/useBoardMutationsDeleteData";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

interface DeletePriorityProps {
    id: number;
    type: string;
}

export function DeletePriority({id , type} : DeletePriorityProps) {
    const [open , setOpen] = useState<boolean>(false);
    const deletePriority = useDeletePriority();
    const [errorMessage, setErrorMessage] = useState<string>("");

    function handleDeletePriority() {
        deletePriority.mutate(id, {
            onSuccess: () => {
                setErrorMessage("");
                setOpen(false);
            },
            onError: () => {
                setErrorMessage("Failed to delete this priority. Please try again.");
            },
        });
    }

    return(
        <Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Delete Priority</DialogTitle>

                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this priority {type}?
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
                    <IconButton onClick={handleDeletePriority} color="primary">
                        <DoneIcon />
                    </IconButton>
                </DialogActions>
            </Dialog>

            <Tooltip title="Delete Priority">
                <IconButton onClick={() => setOpen(true)} color="error">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Box>
    )
}