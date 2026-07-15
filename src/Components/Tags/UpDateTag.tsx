import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useUpDateTag } from "../../React_Queries/useBoardMutationsUpDateData";
import { useState } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

interface UpdateTagProps {
  id: number;
  title: string;
  color: string;
}

export function UpdateTag({ id, title, color }: UpdateTagProps) {
  const updateTag = useUpDateTag();

  const [open, setOpen] = useState<boolean>(false);
  const [newTitleTag, setNewTitleTag] = useState<string>(title);
  const [newColorTag, setNewColorTag] = useState<string>(color);
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleOpen() {
    setNewTitleTag(title);
    setNewColorTag(color);
    setErrorMessage("");
    setOpen(true);
  }

  function handleClose() {
    setErrorMessage("");
    setOpen(false);
  }

  function handleUpdateTag() {
    const cleanTitle = newTitleTag.trim();
    const cleanColor = newColorTag.trim();

    if (!cleanTitle) {
      setErrorMessage("Tag title is required.");
      return;
    }

    if (!cleanColor) {
      setErrorMessage("Tag color is required.");
      return;
    }

    const isValidHexColor = /^#[0-9A-Fa-f]{6}$/.test(cleanColor);

    if (!isValidHexColor) {
      setErrorMessage("Color must be a valid hex color, for example #ff0000.");
      return;
    }

    updateTag.mutate(
      {
        id,
        changes: {
          title: cleanTitle,
          color: cleanColor,
        },
      },
      {
        onSuccess: () => {
          setErrorMessage("");
          setOpen(false);
        },
        onError: () => {
          setErrorMessage("Failed to update tag. Please try again.");
        },
      },
    );
  }

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Tag</DialogTitle>

        <DialogContent>
          <Typography>Enter the new title and color for the tag:</Typography>

          <TextField
            label="Title"
            autoFocus
            value={newTitleTag}
            error={!!errorMessage}
            helperText={errorMessage}
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            onChange={(e) => {
              setNewTitleTag(e.target.value);

              if (errorMessage) {
                setErrorMessage("");
              }
            }}
          />

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
                backgroundColor: newColorTag || "#3b82f6",
                border: "3px solid #e5e7eb",
                position: "relative",
                cursor: "pointer",
                boxShadow: "0 8px 18px rgba(15,23,42,0.15)",
                flexShrink: 0,
              }}
            >
              <input
                type="color"
                value={newColorTag || "#3b82f6"}
                onChange={(e) => {
                  setNewColorTag(e.target.value);

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
              value={newColorTag}
              placeholder="#ff0000"
              fullWidth
              onChange={(e) => {
                setNewColorTag(e.target.value);

                if (errorMessage) {
                  setErrorMessage("");
                }
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <IconButton onClick={handleClose} color="secondary">
            <CloseIcon />
          </IconButton>

          <IconButton
            onClick={handleUpdateTag}
            color="primary"
            disabled={updateTag.isPending}
          >
            <SaveAltIcon />
          </IconButton>
        </DialogActions>
      </Dialog>

      <Tooltip title="Edit Tag">
        <IconButton onClick={handleOpen} color="primary">
          <EditIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}