import { Box } from "@mui/material";
import Column from "./Column";
import { useBoardStore } from "../../store/boardStore";
import { AllTopBoard } from "../TopBoard/AllTopBoard";
import { AddColum } from "../TopColum/AddColum";

export default function Board() {
  const columns = useBoardStore((state) => state.columns);
  const activeBoardId = useBoardStore((state) => state.activeBoardId);

  if (!activeBoardId) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f4f5f7",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          px: 3,
          pt: 2.5,
          pb: 1,
          backgroundColor: "#f4f5f7",
          borderBottom: "1px solid #e5e7eb",
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: 3,
            px: 2.5,
            py: 1.25,
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          }}
        >
          <AllTopBoard />
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          px: 3,
          pt: 2,
          pb: 2.5,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2.5,
            alignItems: "flex-start",
            height: "100%",
            overflowX: "auto",
            overflowY: "hidden",
            pb: 1, // קצת רווח קטן

            "& > *": {
              flexShrink: 0,
            },

            // 🔥 זה מה שמקטין את הפס
            scrollbarWidth: "thin", // Firefox

            "&::-webkit-scrollbar": {
              height: "6px", // 👈 הגובה של הפס (תשחק עם זה)
            },

            "&::-webkit-scrollbar-track": {
              background: "transparent", // שלא יהיה בלוק אפור גדול
            },

            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#94a3b8",
              borderRadius: "999px",
            },

            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#64748b",
            },
          }}
        >
          {columns.map((column) => (
            <Column key={column.id} columnId={column.id} />
          ))}

          <AddColum />
        </Box>
      </Box>
    </Box>
  );
}
