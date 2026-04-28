import {
  Box,
  Button,
  Drawer,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import { useMemo, useState } from "react";
import { useBoardStore } from "../../store/boardStore";
import type { CreateColumnPayload, CreateStatusPayload } from "../../Type";

export function AddColum() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [tagColor, setTagColor] = useState("#3b82f6");

  const statuses = useBoardStore((state) => state.statuses);
  const addColumn = useBoardStore((state) => state.addColumn);
  const activeBoardId = useBoardStore((state) => state.activeBoardId);
  const columns = useBoardStore((state) => state.columns);
  const addStatus = useBoardStore((state) => state.addStatus);


  const nextOrder = useMemo(() => {
    const orders = columns
      .filter((col) => col.boardId === activeBoardId)
      .map((col) => col.order);

    return orders.length > 0 ? Math.max(...orders) + 1 : 1;
  }, [columns, activeBoardId]);

  function handleCreate() {
    const cleanTitle = title.trim();
    
    if (!cleanTitle || !activeBoardId) return;

    const isStatusExists = statuses.some(
  (status) =>
    (status.value ?? "").toLowerCase() === title.toLowerCase() ||
    (status.key ?? "").toLowerCase() === title.toLowerCase()
);

    if (isStatusExists) {
      alert("Status already exists");
      return;
    }

    const newColumn: CreateColumnPayload = {
      title: cleanTitle,
      boardId: activeBoardId,
      order: nextOrder,
      statusKey: title.toUpperCase().replaceAll(" ", "_"),
      color: tagColor,
    };
    const newStatus : CreateStatusPayload = {
      key: newColumn.statusKey,
      value: title,
    };
    addColumn(newColumn);
    addStatus(newStatus);

    setTitle("");
    
    setTagColor("#3b82f6");
    setOpen(false);
  }

  return (
    <Box
      sx={{
        minWidth: 190,
        width: 190,
        height: 550,
        flexShrink: 0,
        borderRadius: "18px",
        border: "2px dashed #cbd5e1",
        background:
          "linear-gradient(180deg, rgba(248,250,252,0.9), rgba(226,232,240,0.65))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: "14px",
        transition: "0.25s",
        cursor: "pointer",
        "&:hover": {
          borderColor: "#6366f1",
          background:
            "linear-gradient(180deg, rgba(239,246,255,0.95), rgba(224,231,255,0.75))",
        },
      }}
      onClick={() => setOpen(true)}
    >
      <Box
        sx={{
          width: 135,
          height: 170,
          borderRadius: "22px",
          backgroundColor: "#ffffff",
          boxShadow: "0 14px 35px rgba(15, 23, 42, 0.12)",
          border: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.2,
        }}
      >
        <Box
          sx={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 20px rgba(37,99,235,0.25)",
          }}
        >
          <Add />
        </Box>

        <Typography sx={{ fontWeight: 900, fontSize: 15, color: "#0f172a" }}>
          Add Column
        </Typography>

        <Typography sx={{ fontSize: 12, color: "#64748b", textAlign: "center" }}>
          New status
        </Typography>
      </Box>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          sx={{
            width: 390,
            height: "100%",
            p: 3,
            background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
          }}
        >
          <Typography sx={{ fontWeight: 900, fontSize: 24, color: "#0f172a" }}>
            Add new column
          </Typography>

          <Typography sx={{ mt: 0.5, mb: 3, color: "#64748b", fontSize: 14 }}>
            Create a new column for your board
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <TextField
            fullWidth
            label="Column title"
            placeholder="Example: Review"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Typography sx={{ fontWeight: 800, mb: 1, color: "#0f172a" }}>
            Column color
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 4,
              p: 2,
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                backgroundColor: tagColor,
                border: "3px solid #e5e7eb",
                position: "relative",
                cursor: "pointer",
                boxShadow: "0 8px 18px rgba(15,23,42,0.15)",
                flexShrink: 0,
              }}
            >
              <input
                type="color"
                value={tagColor}
                onChange={(e) => setTagColor(e.target.value)}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                  border: "none",
                }}
              />
            </Box>

            <TextField
              size="small"
              value={tagColor}
              onChange={(e) => setTagColor(e.target.value)}
              sx={{ flex: 1 }}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={handleCreate}
            sx={{
              py: 1.4,
              borderRadius: "14px",
              fontWeight: 900,
              textTransform: "none",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              boxShadow: "0 12px 24px rgba(37,99,235,0.25)",
              "&:hover": {
                background: "linear-gradient(135deg, #1d4ed8, #6d28d9)",
              },
            }}
          >
            Add column
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}