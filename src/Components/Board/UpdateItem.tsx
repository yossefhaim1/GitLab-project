import { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  TextField,
  Typography,
  Chip,
  Tooltip,
  Autocomplete,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import type { Items, Priority, Tag } from "../../Type";
import {
  useItems,
  useUsers,
  usePriorities,
  useTags,
} from "../../React_Queries/useBoardsGetData";
import { useUpdateItemWithTags } from "../../React_Queries/useBoardMutationsUpDateData";
import { useBoardStore } from "../../store/boardStore";

type UpdateItemProps = {
  itemId: number;
};

export default function UpdateItem({ itemId }: UpdateItemProps) {
  const activeBoard = useBoardStore((state) => state.activeBoardId);

  const { data: items } = useItems(activeBoard);
  const { data: users } = useUsers();
  const { data: priorities } = usePriorities();
  const { data: allTags } = useTags();

  const updateItem = useUpdateItemWithTags();

  const item = items?.find((currentItem) => currentItem.id === itemId);

  const allUsers = users || [];
  const priorityOptions = priorities || [];
  const tagOptions = allTags || [];

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [assigneeId, setAssigneeId] = useState<number | null>(null);
  const [priorityId, setPriorityId] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  function handleOpen() {
    if (!item) return;

    setTitle(item.title);
    setAssigneeId(item.assigneeId);
    setPriorityId(item.priorityId);
    setSelectedTags(item.tags || []);
    setErrorMessage("");
    setOpen(true);
  }

  async function handleSave() {
    if (!item) {
      setErrorMessage("Task not found.");
      return;
    }

    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setErrorMessage("Title is required.");
      return;
    }

    if (!assigneeId) {
      setErrorMessage("Please select a user to assign this task.");
      return;
    }

    if (!priorityId) {
      setErrorMessage("Please select a priority.");
      return;
    }

    setErrorMessage("");

    const changes: Partial<Items> = {};

    if (cleanTitle !== item.title) {
      changes.title = cleanTitle;
    }

    if (assigneeId !== item.assigneeId) {
      changes.assigneeId = assigneeId;
    }

    if (priorityId !== item.priorityId) {
      changes.priorityId = priorityId;
    }

    const selectedTagIds = selectedTags.map((tag) => tag.id);

    updateItem.mutate(
      {
        id: item.id,
        changes,
        tagIds: selectedTagIds,
      },
      {
        onSuccess: () => {
          setErrorMessage("");
          setOpen(false);
        },
        onError: () => {
          setErrorMessage("Failed to update task. Please try again.");
        },
      },
    );
  }

  if (!item) return null;

  return (
    <>
      <Tooltip title="Edit Task" placement="bottom" arrow enterDelay={200}>
        <IconButton
          size="small"
          sx={{ width: 34, height: 34, p: 0.5 }}
          onClick={handleOpen}
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

          <Autocomplete
            options={priorityOptions}
            getOptionLabel={(option: Priority) => option.type}
            value={
              priorityOptions.find((priority) => priority.id === priorityId) ||
              null
            }
            onChange={(_, newValue) => {
              setPriorityId(newValue ? newValue.id : null);
            }}
            renderOption={(props, option) => (
              <Box
                component="li"
                {...props}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: option.color,
                  }}
                />

                {option.type}
              </Box>
            )}
            renderInput={(params) => <TextField {...params} label="Priority" />}
            sx={{ mb: 2 }}
          />

          <Autocomplete
            options={allUsers}
            getOptionLabel={(option) => option.name}
            value={allUsers.find((user) => user.id === assigneeId) || null}
            onChange={(_, newValue) => {
              setAssigneeId(newValue ? newValue.id : null);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Assign task" />
            )}
            sx={{ mb: 2 }}
          />

          <Autocomplete
            multiple
            options={tagOptions}
            getOptionLabel={(option: Tag) => option.title}
            value={selectedTags}
            onChange={(_, newValue) => {
              setSelectedTags(newValue);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });

                return (
                  <Chip
                    key={key}
                    label={option.title}
                    {...tagProps}
                    sx={{
                      backgroundColor: `${option.color}33`,
                      color: option.color,
                      border: `1px solid ${option.color}`,
                    }}
                  />
                );
              })
            }
            renderInput={(params) => <TextField {...params} label="Tags" />}
            sx={{ mb: 2 }}
          />

          {errorMessage ? (
            <Typography color="error" sx={{ mb: 2, fontSize: 13 }}>
              {errorMessage}
            </Typography>
          ) : null}

          <Button
            fullWidth
            variant="contained"
            onClick={handleSave}
            disabled={updateItem.isPending}
          >
            Save
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
