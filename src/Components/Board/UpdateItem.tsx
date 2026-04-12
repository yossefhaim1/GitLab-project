import { useEffect, useState } from "react";
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
import { Edit } from "@mui/icons-material";
import type { Items } from "../../Type";
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

type UpdateItemProps = {
  itemId: string;
};

export default function UpdateItem({ itemId }: UpdateItemProps) {
  const items = useBoardStore((state) => state.items);
  const columns = useBoardStore((state) => state.columns);
  const updateItem = useBoardStore((state) => state.updateItem);

  const item = items.find((currentItem) => currentItem.id === itemId);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [assigneeId, setAssigneeId] = useState(0);
  const [priority, setPriority] = useState<PriorityType>("LOW");
  const [tagText, setTagText] = useState("");
  const [tagColor, setTagColor] = useState("#3b82f6");
  const [tags, setTags] = useState<TagInput[]>([]);

  useEffect(() => {
    if (open && item) {
      setTitle(item.title);
      setStatus(item.status);
      setAssigneeId(item.assigneeId);
      setPriority((item.priority?.[0]?.type as PriorityType) || "LOW");
      setTags(item.tags || []);
      setTagText("");
      setTagColor("#3b82f6");
    }
  }, [open, item]);

  function addTag() {
    const value = tagText.trim();

    if (!value) return;

    const alreadyExists = tags.some(
      (tag) => tag.type.toLowerCase() === value.toLowerCase()
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

  async function handleSave() {
    if (!item) return;

    const changes: Partial<Items> = {};
    const cleanTitle = title.trim();

    if (cleanTitle !== item.title) {
      changes.title = cleanTitle;
    }

    if (status !== item.status) {
      changes.status = status;

      const targetColumn = columns.find((column) => column.statusKey === status);

      if (targetColumn && targetColumn.id !== item.columnId) {
        changes.columnId = targetColumn.id;

        const itemsInTargetColumn = items.filter(
          (currentItem) => currentItem.columnId === targetColumn.id
        );

        const maxPosition = itemsInTargetColumn.length
          ? Math.max(
              ...itemsInTargetColumn.map((currentItem) => currentItem.position)
            )
          : 0;

        changes.position = maxPosition + 1;
      }
    }

    if (assigneeId !== item.assigneeId) {
      changes.assigneeId = assigneeId;
    }

    const nextPriority = [
      {
        type: priority,
        color: PRIORITY_COLOR[priority],
      },
    ];

    if (JSON.stringify(nextPriority) !== JSON.stringify(item.priority)) {
      changes.priority = nextPriority;
    }

    if (JSON.stringify(tags) !== JSON.stringify(item.tags)) {
      changes.tags = tags;
    }

    if (Object.keys(changes).length === 0) {
      setOpen(false);
      return;
    }

    await updateItem(item.id, changes);
    setOpen(false);
  }

  if (!item) {
    return null;
  }

  return (
    <>
      <IconButton
        size="small"
        sx={{ width: 34, height: 34, p: 0.5 }}
        onClick={() => setOpen(true)}
      >
        <Edit fontSize="small" />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 360, p: 2.5 }}>
          <Typography sx={{ fontWeight: 800, mb: 2 }}>
            Edit Task #{item.id.split("-")[1]}
          </Typography>

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
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="TO_DO">TO_DO</MenuItem>
            <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
            <MenuItem value="DONE">DONE</MenuItem>
          </TextField>

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

          <Button fullWidth variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Drawer>
    </>
  );
}