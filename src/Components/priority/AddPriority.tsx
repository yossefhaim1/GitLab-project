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

  function handleAddPriority() {
    const cleanType = priorityType;

    if (!cleanType) {
      setErrorMessage("Priority type is required.");
      return;
    }

    addPriority.mutate(
      { type: cleanType, color: selectedColor },
      {
        onSuccess: () => {
          setErrorMessage("");
          setPriorityType("LOW");
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
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "500px",
            maxWidth: "90vw",
          },
        }}
      >
        {" "}
        <DialogTitle>Add Priority</DialogTitle>
        <DialogContent>
          <Typography>Enter the type of the new priority:</Typography>
          <br />
          <Autocomplete
            options={PRIORITY_TYPES}
            value={priorityType}
            onChange={(_, value) => {
              if (value) {
                setPriorityType(value);
              }
            }}
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
                onChange={(e) => setSelectedColor(e.target.value)}
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
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              placeholder="#ff0000"
              sx={{ flex: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddPriority}
            color="primary"
            variant="contained"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Priority
      </Button>
    </Box>
  );
}
