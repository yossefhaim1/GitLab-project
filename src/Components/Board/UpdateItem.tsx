import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  TextField,
  Typography,
  Chip,
  Tooltip,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import type { Items } from "../../Type";
import { useBoardStore } from "../../store/boardStore";

type PriorityType = "LOW" | "MEDIUM" | "HIGH";

const PRIORITY_COLOR: Record<PriorityType, string> = {
  LOW: "#38A169",
  MEDIUM: "#ECC94B",
  HIGH: "#E53E3E",
};

type TagInput = {
  type: string;
  color: string;
};

type UpdateItemProps = {
  itemId: number;
};

export default function UpdateItem({ itemId }: UpdateItemProps) {
  const items = useBoardStore((state) => state.items);
  const updateItem = useBoardStore((state) => state.updateItem);
  const AllUsers = useBoardStore((state) => state.users);
  const item = items.find((currentItem) => currentItem.id === itemId);

  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [assigneeId, setAssigneeId] = useState<string>("");
  const [priority, setPriority] = useState<PriorityType>("LOW");
  const [tagText, setTagText] = useState<string>("");
  const [tagColor, setTagColor] = useState<string>("#3bf63e");
  const [tags, setTags] = useState<TagInput[]>([]);

  useEffect(() => {
    if (!open || !item) return;

    setTitle(item.title);
    setAssigneeId(item.assigneeId);
    setPriority((item.priority?.[0]?.type as PriorityType) || "LOW");
    setTags(item.tags || []);
    setTagText("");
    setTagColor("#3bf63e");
  }, [open, item]);

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

  async function handleSave() {
    if (!item) return;

    const changes: Partial<Items> = {};
    const cleanTitle = title.trim();

    if (cleanTitle === "") return;

    if (cleanTitle !== item.title) {
      changes.title = cleanTitle;
    }

    const cleanAssigneeId = assigneeId.trim();
    if (cleanAssigneeId === "") return;
    if (cleanAssigneeId !== item.assigneeId) {
      changes.assigneeId = cleanAssigneeId;
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

  if (!item) return null;

  return (
    <>
      <Tooltip title="Edit Task" placement="bottom" arrow enterDelay={200}>
        <IconButton
          size="small"
          sx={{ width: 34, height: 34, p: 0.5 }}
          onClick={() => setOpen(true)}
        >
          <Edit fontSize="small" />
        </IconButton>
      </Tooltip>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 360, p: 2.5 }}>
          <Typography sx={{ fontWeight: 800, mb: 2 }}>
            Edit Task #{item.id}
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
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as PriorityType)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="LOW">LOW</MenuItem>
            <MenuItem value="MEDIUM">MEDIUM</MenuItem>
            <MenuItem value="HIGH">HIGH</MenuItem>
          </TextField>

          <Autocomplete
            options={AllUsers}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Assign task" />
            )}
            value={
              AllUsers.find((user) => user.name === assigneeId) || null
            }
            onChange={(_, newValue) => {
              setAssigneeId(newValue ? newValue.name : "");
            }}
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
