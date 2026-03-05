import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  TextField,
  Typography,
  MenuItem,
  Chip,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import type { Items } from "../../Type";

type PriorityType = "LOW" | "MEDIUM" | "HIGH";

const PRIORITY_COLOR: Record<PriorityType, string> = {
  LOW: "#374151",
  MEDIUM: "#b45309",
  HIGH: "#b91c1c",
};

type TagInput = { type: string; color: string };

interface AddItemProps {
  boardId: string;
  columnId: string;
  status: string; // לדוגמה: "to-do" / "in-progress" / "done" (מה שיש אצלך)
  allItems: Items[]; // כל האייטמים של הבורד (כדי להוציא ID הבא)
  onaddItem: (item: Items) => void;
}

export default function AddItemDrawer({
  boardId,
  columnId,
  status,
  allItems,
  onaddItem,
}: AddItemProps) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [assigneeId, setAssigneeId] = useState<number>(0);
  const [priority, setPriority] = useState<PriorityType>("LOW");

  const [tagText, setTagText] = useState("");
  const [tags, setTags] = useState<TagInput[]>([]);

  // ✅ ID הבא מכל האייטמים (לא רק מהעמודה)
  const nextId = useMemo(() => {
    const nums = allItems
      .map((i) => Number(String(i.id).split("-")[1]))
      .filter((n) => Number.isFinite(n));
    const max = nums.length ? Math.max(...nums) : 0;
    return `row-${max + 1}`;
  }, [allItems]);

  // ✅ position הבא בתוך העמודה (נוח לסידור)
  const nextPosition = useMemo(() => {
    const colPositions = allItems
      .filter((i) => i.columnId === columnId)
      .map((i) => i.position ?? 0);
    const max = colPositions.length ? Math.max(...colPositions) : 0;
    return max + 1;
  }, [allItems, columnId]);

  function addTag() {
    const value = tagText.trim();
    if (!value) return;

    // צבע לדוגמה – אפשר לשדרג למפה קבועה שלך
    const color = "#3b82f6";

    // לא להוסיף כפולים
    if (tags.some((t) => t.type.toLowerCase() === value.toLowerCase())) {
      setTagText("");
      return;
    }

    setTags((prev) => [...prev, { type: value, color }]);
    setTagText("");
  }

  function removeTag(type: string) {
    setTags((prev) => prev.filter((t) => t.type !== type));
  }

  function handleCreate() {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    const newItem: Items = {
      id: nextId,
      boardId,
      columnId,
      position: nextPosition,
      title: cleanTitle,
      status,
      assigneeId,
      priority: [{ type: priority, color: PRIORITY_COLOR[priority] }],
      tags, // כבר במבנה נכון: [{type,color}]
    };

    onaddItem(newItem);

    // reset + close
    setTitle("");
    setAssigneeId(0);
    setPriority("LOW");
    setTags([]);
    setTagText("");
    setOpen(false);
  }

  return (
    <>
      <IconButton
        size="small"
        sx={{ width: 34, height: 34 }}
        onClick={() => setOpen(true)}
      >
        <Add fontSize="small" />
      </IconButton>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 360, p: 2.5 }}>
          <Typography sx={{ fontWeight: 800, mb: 2 }}>Add Item</Typography>

          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            select
            fullWidth
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as PriorityType)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="LOW">LOW</MenuItem>
            <MenuItem value="MEDIUM">MEDIUM</MenuItem>
            <MenuItem value="HIGH">HIGH</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Assignee Id"
            type="number"
            value={assigneeId}
            onChange={(e) => setAssigneeId(Number(e.target.value))}
            sx={{ mb: 2 }}
          />

          {/* Tags */}
          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            <TextField
              fullWidth
              label="Add tag"
              value={tagText}
              onChange={(e) => setTagText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTag();
              }}
            />
            <Button onClick={addTag} variant="contained">
              Add
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {tags.map((t) => (
              <Chip
                key={t.type}
                label={t.type}
                onDelete={() => removeTag(t.type)}
              />
            ))}
          </Box>

          <Typography sx={{ fontSize: 12, color: "#6b7280", mb: 2 }}>
            Will create: <b>{nextId}</b> • position: <b>{nextPosition}</b>
          </Typography>

          <Button fullWidth variant="contained" onClick={handleCreate}>
            Create
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
