import { useEffect, useMemo, useState } from "react";
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
import type { CreateItemPayload } from "../../Type";
import { useBoardStore } from "../../store/boardStore";

type PriorityType = "LOW" | "MEDIUM" | "HIGH";

const PRIORITY_COLOR: Record<PriorityType, string> = {
  LOW: "#374151",
  MEDIUM: "#b45309",
  HIGH: "#b91c1c",
};

type TagInput = {
  type: string;
  color: string;
};

type AddItemProps = {
  columnId: number;
};

export default function AddItem({ columnId }: AddItemProps) {
  const items = useBoardStore((state) => state.items);
  const columns = useBoardStore((state) => state.columns);
  const activeBoardId = useBoardStore((state) => state.activeBoardId);
  const addItem = useBoardStore((state) => state.addItem);
  const nextItemId = useBoardStore((state) => state.nextItemId);
  const fetchNextItemId = useBoardStore((state) => state.fetchNextItemId);

  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [assigneeId, setAssigneeId] = useState<number>(0);
  const [priority, setPriority] = useState<PriorityType>("LOW");
  const [tagText, setTagText] = useState<string>("");
  const [tagColor, setTagColor] = useState<string>("#3b82f6");
  const [tags, setTags] = useState<TagInput[]>([]);

  const column = columns.find((col) => col.id === columnId);

  useEffect(() => {
    fetchNextItemId();
  }, [items]);

  const nextPosition = useMemo(() => {
    const positions = items
      .filter((item) => item.columnId === columnId)
      .map((item) => item.position);

    return Math.max(0, ...positions) + 1;
  }, [items, columnId]);

  function addTag() {
    const value = tagText.trim();

    if (!value) return;

    const alreadyExists = tags.some(
      (tag) => tag.type.toLowerCase() === value.toLowerCase(),
    );

    if (alreadyExists) {
      setTagText("");
      return;
    }

    setTags((prev) => [...prev, { type: value, color: tagColor }]);
    setTagText("");
  }

  function removeTag(type: string) {
    setTags((prev) => prev.filter((tag) => tag.type !== type));
  }

  async function handleCreate() {
    try {
      const cleanTitle = title.trim();

      if (!cleanTitle || !activeBoardId || !column) return;

      const newItem: CreateItemPayload = {
        boardId: activeBoardId,
        columnId,
        position: nextPosition,
        title: cleanTitle,
        status: column.statusKey,
        assigneeId,
        priority: [
          {
            type: priority,
            color: PRIORITY_COLOR[priority],
          },
        ],
        tags,
      };

      await addItem(newItem);
      console.log("seccses to add item");

      setTitle("");
      setAssigneeId(0);
      setPriority("LOW");
      setTags([]);
      setTagText("");
      setTagColor("#3b82f6");
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
    if (!activeBoardId || !column) {
      return null;
    }
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

            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "500px",
                backgroundColor: tagColor,
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
                  opacity: 0,
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
            {tags.map((tag) => (
              <Chip
                key={tag.type}
                label={tag.type}
                onDelete={() => removeTag(tag.type)}
                sx={{
                  backgroundColor: `${tag.color}33`,
                  color: tag.color,
                  border: `1px solid ${tag.color}`,
                }}
              />
            ))}
          </Box>

          <Typography sx={{ fontSize: 12, color: "#6b7280", mb: 2 }}>
            Will create: <b>{nextItemId}</b> • position: <b>{nextPosition}</b>
          </Typography>

          <Button fullWidth variant="contained" onClick={handleCreate}>
            Create
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
