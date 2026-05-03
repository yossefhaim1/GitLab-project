import { Box } from "@mui/material";
import Column from "./Column";
import { useBoardStore } from "../../store/boardStore";
import { AllTopBoard } from "../TopBoard/AllTopBoard";
import { AddColum } from "../TopColum/AddColum";
import { useEffect, useRef } from "react";
import BoardDndProvider from "./BoardDndProvider";

export default function Board() {
  const columns = useBoardStore((state) => state.columns);
  const activeBoardId = useBoardStore((state) => state.activeBoardId);

  const boardScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  const board = boardScrollRef.current;
  if (!board) return;

  const handleWheel = (e: WheelEvent) => {
    const rect = board.getBoundingClientRect();

    const isMouseNearBottom = e.clientY >= rect.bottom - 35;

    if (!isMouseNearBottom) {
      return;
    }

    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();

      board.scrollBy({
        left: e.deltaY * 5,
        behavior: "smooth",
      });
    }
  };

  board.addEventListener("wheel", handleWheel, { passive: false });

  return () => {
    board.removeEventListener("wheel", handleWheel);
  };
}, []);

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
        <BoardDndProvider>
          <Box
            ref={boardScrollRef}
            sx={{
              display: "flex",
              gap: 3,
              overflowX: "auto",
              overflowY: "hidden",
              height: "100%",
              scrollBehavior: "smooth",
            }}
          >
            {columns.map((col) => (
              <Column key={col.id} columnId={col.id} />
            ))}

            <AddColum />
          </Box>
        </BoardDndProvider>
      </Box>
    </Box>
  );
}