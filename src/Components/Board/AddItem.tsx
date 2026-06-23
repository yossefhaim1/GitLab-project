import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  TextField,
  Typography,
  Tooltip,
  Autocomplete,
  Chip,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import type { CreateItemPayload, Priority, Tag } from "../../Type";
import { useAddItemWithTags } from "../../React_Queries/useBoardMutationsAddData";
import {
  useColumns,
  useItems,
  useUsers,
  usePriorities,
  useTags,
} from "../../React_Queries/useBoardsGetData";
import { useBoardStore } from "../../store/boardStore";

type AddItemProps = {
  columnId: number;
};

export default function AddItem({ columnId }: AddItemProps) {
  const activeBoard = useBoardStore((state) => state.activeBoardId);

  const { data: columns } = useColumns(activeBoard);
  const { data: items } = useItems(activeBoard);
  const { data: users } = useUsers();
  const { data: priorities } = usePriorities();
  const { data: tags } = useTags();

  const addItemWithTags = useAddItemWithTags();

  const allUsers = users || [];
  const allPriorities = priorities || [];
  const allTags = tags || [];

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [assigneeId, setAssigneeId] = useState<number | null>(null);
  const [priorityId, setPriorityId] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const column = columns?.find((col) => col.id === columnId);

  const nextPosition = useMemo(() => {
    const positions =
      items
        ?.filter((item) => item.columnId === columnId)
        .map((item) => item.position) || [];

    return Math.max(0, ...positions) + 1;
  }, [items, columnId]);

  async function handleCreate() {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      setErrorMessage("Title is required.");
      return;
    }

    if (!activeBoard || !column) {
      setErrorMessage("Board or column data is missing. Please refresh.");
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

    const newItem: CreateItemPayload = {
      boardId: activeBoard,
      columnId,
      position: nextPosition,
      title: cleanTitle,
      assigneeId,
      priorityId,
    };

    addItemWithTags.mutate(
      {
        item: newItem,
        tagIds: selectedTags.map((tag) => tag.id),
      },
      {
        onSuccess: () => {
          setErrorMessage("");
          setTitle("");
          setAssigneeId(null);
          setPriorityId(null);
          setSelectedTags([]);
          setOpen(false);
        },
        onError: () => {
          setErrorMessage("Failed to create task. Please try again.");
        },
      },
    );
  }

  return (
    <Box>
      <Tooltip title="Add Task" placement="bottom" arrow enterDelay={200}>
        <IconButton
          size="small"
          sx={{ width: 34, height: 34 }}
          onClick={() => setOpen(true)}
        >
          <Add fontSize="small" />
        </IconButton>
      </Tooltip>

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

          <Autocomplete
            options={allPriorities}
            getOptionLabel={(option: Priority) => option.type}
            value={
              allPriorities.find((priority) => priority.id === priorityId) ||
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
            options={allTags}
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

          <Typography sx={{ fontSize: 12, color: "#6b7280", mb: 2 }}>
            enter to CREATE new task
          </Typography>

          {errorMessage ? (
            <Typography color="error" sx={{ mb: 2, fontSize: 13 }}>
              {errorMessage}
            </Typography>
          ) : null}

          <Button
            fullWidth
            variant="contained"
            onClick={handleCreate}
            disabled={addItemWithTags.isPending}
          >
            Create
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
