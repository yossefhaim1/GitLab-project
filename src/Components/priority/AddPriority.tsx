import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAddPriority } from "../../React_Queries/useBoardMutationsAddData";
import { PRIORITY_TYPES, type PriorityTypeValues } from "../../Type";

export function AddPriority() {
  const [open, setOpen] = useState<boolean>(false);
  const [priorityType, setPriorityType] = useState<PriorityTypeValues>("LOW");
  const [selectedColor, setSelectedColor] = useState<string>("#3b82f6");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const addPriority = useAddPriority();

  function handleOpen() {
    setPriorityType("LOW");
    setSelectedColor("#3b82f6");
    setErrorMessage("");
    setOpen(true);
  }

  function handleClose() {
    setErrorMessage("");
    setOpen(false);
  }

  function handleAddPriority() {
    const cleanColor = selectedColor.trim();

    if (!priorityType) {
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

    addPriority.mutate(
      {
        type: priorityType,
        color: cleanColor,
      },
      {
        onSuccess: () => {
          setErrorMessage("");
          setPriorityType("LOW");
          setSelectedColor("#3b82f6");
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
        <DialogTitle>Add Priority</DialogTitle>

        <DialogContent>
          <Typography>Enter the type of the new priority:</Typography>

          <Autocomplete
            options={PRIORITY_TYPES}
            value={priorityType}
            onChange={(_, value) => {
              if (value) {
                setPriorityType(value);

                if (errorMessage) {
                  setErrorMessage("");
                }
              }
            }}
            sx={{ mt: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Priority Type" />
            )}
          />

          {errorMessage ? (
            <Typography color="error" sx={{ mt: 1, fontSize: 13 }}>
              {errorMessage}
            </Typography>
          ) : null}

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
                backgroundColor: selectedColor || "#3b82f6",
                border: "3px solid #e5e7eb",
                position: "relative",
                cursor: "pointer",
                boxShadow: "0 8px 18px rgba(15,23,42,0.15)",
                flexShrink: 0,
              }}
            >
              <input
                type="color"
                value={selectedColor || "#3b82f6"}
                onChange={(e) => {
                  setSelectedColor(e.target.value);

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
              value={selectedColor}
              onChange={(e) => {
                setSelectedColor(e.target.value);

                if (errorMessage) {
                  setErrorMessage("");
                }
              }}
              placeholder="#ff0000"
              fullWidth
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={addPriority.isPending}>
            Cancel
          </Button>

          <Button
            onClick={handleAddPriority}
            color="primary"
            variant="contained"
            disabled={addPriority.isPending}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Button variant="contained" onClick={handleOpen}>
        Add Priority
      </Button>
    </Box>
  );
}