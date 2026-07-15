import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useUpDatePriority } from "../../React_Queries/useBoardMutationsUpDateData";
import type { PriorityTypeValues } from "../../Type";
import { PRIORITY_TYPES } from "../../Type";
import EditIcon from "@mui/icons-material/Edit";

interface UpDatePriorityProps {
  id: number;
  type: PriorityTypeValues;
  color: string;
}

export function UpDatePriority({ id, type, color }: UpDatePriorityProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [newType, setNewType] = useState<PriorityTypeValues>(type);
  const [newColor, setNewColor] = useState<string>(color);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const updatePriority = useUpDatePriority();

  function handleOpen() {
    setNewType(type);
    setNewColor(color);
    setErrorMessage("");
    setOpen(true);
  }

  function handleClose() {
    setErrorMessage("");
    setOpen(false);
  }

  function handleUpdatePriority() {
    const cleanColor = newColor.trim();

    if (!newType) {
      setErrorMessage("Priority type is required.");
      return;
    }

    if (!cleanColor) {
      setErrorMessage("Priority color is required.");
      return;
    }

    const isValidHexColor = /^#[0-9A-Fa-f]{6}$/.test(cleanColor);

    if (!isValidHexColor) {
      setErrorMessage("Color must be a valid hex color, for example #ff0000.");
      return;
    }

    updatePriority.mutate(
      {
        id,
        changes: {
          type: newType,
          color: cleanColor,
        },
      },
      {
        onSuccess: () => {
          setErrorMessage("");
          setOpen(false);
        },
        onError: () => {
          setErrorMessage(
            "The priority needs to be LOW, MEDIUM, HIGH, URGENT, or CRITICAL",
          );
        },
      },
    );
  }

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "500px",
            maxWidth: "90vw",
          },
        }}
      >
        <DialogTitle>Update Priority</DialogTitle>

        <DialogContent>
          <Typography>Update the priority type and color:</Typography>

          <Autocomplete
            options={PRIORITY_TYPES}
            value={newType}
            onChange={(_, value) => {
              if (value) {
                setNewType(value);

                if (errorMessage) {
                  setErrorMessage("");
                }
              }
            }}
            sx={{ mt: 2 }}
            renderInput={(params) => (
              <TextField {...params} autoFocus label="Priority Type" />
            )}
          />

          <Typography sx={{ mt: 2, mb: 1, fontWeight: 700 }}>
            Priority Color
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
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
                backgroundColor: newColor || "#3b82f6",
                border: "3px solid #e5e7eb",
                position: "relative",
                cursor: "pointer",
                boxShadow: "0 8px 18px rgba(15,23,42,0.15)",
                flexShrink: 0,
              }}
            >
              <input
                type="color"
                value={newColor || "#3b82f6"}
                onChange={(e) => {
                  setNewColor(e.target.value);

                  if (errorMessage) {
                    setErrorMessage("");
                  }
                }}
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
              label="Color"
              value={newColor}
              onChange={(e) => {
                setNewColor(e.target.value);

                if (errorMessage) {
                  setErrorMessage("");
                }
              }}
              placeholder="#ff0000"
              fullWidth
            />
          </Box>

          {errorMessage ? (
            <Typography color="error" sx={{ mt: 1, fontSize: 13 }}>
              {errorMessage}
            </Typography>
          ) : null}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={updatePriority.isPending}>
            Cancel
          </Button>

          <Button
            onClick={handleUpdatePriority}
            color="primary"
            variant="contained"
            disabled={updatePriority.isPending}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Tooltip title="Edit Priority">
        <IconButton onClick={handleOpen} color="primary">
          <EditIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}