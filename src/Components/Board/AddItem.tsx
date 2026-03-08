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
  status: string;
  allItems: Items[];
  onaddItem: (item: Items) => void;
}

export default function AddItem({
  boardId,
  columnId,
  status,
  allItems,
  onaddItem,
}: AddItemProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [assigneeId, setAssigneeId] = useState<number>(0);
  const [priority, setPriority] = useState<PriorityType>("LOW");

  const [tagText, setTagText] = useState<string>("");
  const [tagColor, setTagColor] = useState<string>("#3b82f6"); // צבע ברירת מחדל
  const [tags, setTags] = useState<TagInput[]>([]);

  const nextId = useMemo(() => {
    const nums = allItems
      .map((i) => Number(String(i.id).split("-")[1]))
      .filter((n) => Number.isFinite(n));
    const max = nums.length ? Math.max(...nums) : 0;
    return `task-${max + 1}`;
  }, [allItems]);

  const nextPosition = useMemo(() => {
    const positions = allItems
      .filter((item) => item.columnId === columnId)
      .map((item) => item.position);

    return Math.max(0, ...positions) + 1;
  }, [allItems, columnId]);

  function addTag() {
    const value = tagText.trim();
    if (!value) return;

    if (tags.some((t) => t.type.toLowerCase() === value.toLowerCase())) {
      setTagText("");
      return;
    }

    setTags((prev) => [...prev, { type: value, color: tagColor }]);
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
      tags,
    };

    onaddItem(newItem);

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
          <Typography sx={{ fontWeight: 800, mb: 2 }}>Add task</Typography>

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
            onFocus={(e) => {
              if (assigneeId === 0) e.target.select();
            }}
            inputProps={{ min: 0 }}
            sx={{ mb: 2 }}
          />

          {/* Tags */}
          <Box sx={{ display: "flex", gap: 1, mb: 1, alignItems: "center" }}>
            <TextField
              fullWidth
              label="Add tag"
              value={tagText}
              onChange={(e) => setTagText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTag();
              }}
            />

            {/* בוחר צבע מובנה */}
            {/* בוחר צבע כעיגול נקי */}
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "500px",
                backgroundColor: tagColor, // הצבע ממלא את כל העיגול
                border: "2px solid #e5e7eb",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <input
                type="color"
                value={tagColor}
                onChange={(e) => setTagColor(e.target.value)}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0, // שקוף לגמרי
                  cursor: "pointer",
                  border: "none",
                }}
              />
            </Box>

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
                sx={{
                  backgroundColor: `${t.color}33`,
                  color: t.color,
                  border: `1px solid ${t.color}`,
                }}
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
