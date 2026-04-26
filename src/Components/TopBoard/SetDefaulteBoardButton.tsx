import { Box, Button } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { useBoardStore } from "../../store/boardStore";

export function SetDefaultBoardButton() {
  const activeBoardId = useBoardStore((state) => state.activeBoardId);
  const boards = useBoardStore((state) => state.boards);
  const setDefaultBoard = useBoardStore((state) => state.setDefaultBoard);

  const activeBoard = boards.find((board) => board.id === activeBoardId);

  return (
    <Box>
      <Button
        variant={activeBoard?.isDefault ? "outlined" : "contained"}
        startIcon={
          activeBoard?.isDefault ? (
            <CheckCircleRoundedIcon fontSize="small" />
          ) : (
            <StarBorderRoundedIcon fontSize="small" />
          )
        }
        disabled={!activeBoardId}
        onClick={() => {
          if (activeBoardId) {
            setDefaultBoard(activeBoardId);
          }
        }}
        sx={{
          height: 40,
          borderRadius: "12px",
          px: 1.5,
          minWidth: 148,
          textTransform: "none",
          fontWeight: 700,
          letterSpacing: 0.2,
          borderWidth: 1.5,
          boxShadow: activeBoard?.isDefault
            ? "none"
            : "0 8px 20px rgba(37, 99, 235, 0.2)",
          background: activeBoard?.isDefault
            ? "#f8fafc"
            : "linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)",
          color: activeBoard?.isDefault ? "#14532d" : "#ffffff",
          borderColor: activeBoard?.isDefault ? "#86efac" : "transparent",
          "&:hover": {
            background: activeBoard?.isDefault
              ? "#f0fdf4"
              : "linear-gradient(90deg, #1d4ed8 0%, #1e40af 100%)",
            borderColor: activeBoard?.isDefault ? "#4ade80" : "transparent",
            boxShadow: activeBoard?.isDefault
              ? "none"
              : "0 10px 24px rgba(29, 78, 216, 0.28)",
          },
          "&.Mui-disabled": {
            background: "#e2e8f0",
            color: "#64748b",
            borderColor: "#cbd5e1",
            boxShadow: "none",
          },
        }}
      >
        {activeBoard?.isDefault ? "Default Saved" : "Set as Default"}
      </Button>
    </Box>
  );
}
