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

  function handleUpdatePriority() {
    const cleanType = newType.trim();

    if (!cleanType) {
      setErrorMessage("Priority type is required.");
      return;
    }
    updatePriority.mutate(
      {
        id,
        changes: {
          type: cleanType as PriorityTypeValues,
          color: newColor,
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
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "500px",
            maxWidth: "90vw",
          },
        }}
      >
        {" "}
        <DialogTitle>Update Priority</DialogTitle>
        <DialogContent>
            <br />
          <Autocomplete
            options={PRIORITY_TYPES}
            value={newType}
            onChange={(_, value) => {
              if (value) {
                setNewType(value);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="Priority Type" />
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
                backgroundColor: newColor,
                border: "3px solid #e5e7eb",
                position: "relative",
                cursor: "pointer",
                boxShadow: "0 8px 18px rgba(15,23,42,0.15)",
                flexShrink: 0,
              }}
            >
              <input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
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
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              sx={{ flex: 1 }}
            />
          </Box>
          {errorMessage && (
            <Typography color="error">{errorMessage}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdatePriority} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Tooltip title="Edit Priority">
        <IconButton onClick={() => setOpen(true)} color="primary">
          <EditIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
