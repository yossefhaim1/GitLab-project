import { BoardActionsMenu } from "./BoardActionsMenu";
import {Search} from "./Search"
import { ListOfBoards } from "./ListOfBoards";
import { SetDefaultBoardButton } from "./SetDefaulteBoardButton";
import { Box } from "@mui/material";


export function AllTopBoard(){
    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 0.75,
                minHeight: 40,

                // Keep all top controls visually aligned with the same vertical rhythm.
                "& .MuiButton-root": { height: 40 },
                "& .MuiIconButton-root": { width: 40, height: 40 },
            }}
        >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ListOfBoards />
                </Box>

                <Box
                    sx={{
                        width: { xs: "100%", md: 420 },
                        maxWidth: 420,
                        display: "flex",
                        alignItems: "center",
                        position: { xs: "static", md: "absolute" },
                        left: { md: "50%" },
                        transform: { md: "translateX(-50%)" },
                    }}
                >
                    <Search />
                </Box>

                <Box sx={{ ml: { xs: 0, md: "auto" }, display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ mr: { xs: 1, md: 2.5 } }}>
                        <SetDefaultBoardButton />
                    </Box>
                    <BoardActionsMenu />
                </Box>
    </Box>
    
    )
}  