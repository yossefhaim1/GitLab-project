import { Delete } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useBoardStore } from "../../store/boardStore";


export function DeleteColumn() {
    const deleteColumn = useBoardStore((state) => state.deleteColumn);
    const activeBoardId = useBoardStore((state) => state.activeBoardId);

    async function handelDelete() {
        await deleteColumn(activeBoardId!);
    }
    
    return(
        <Box>
            <IconButton
            size="small"
            onClick={handelDelete}
            sx={{width:34, height:34}}
            >
                <Delete fontSize="small" />
            </IconButton>
        </Box>
    )
}