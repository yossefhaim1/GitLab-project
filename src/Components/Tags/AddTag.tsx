import {
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
import { useAddTag } from "../../React_Queries/useBoardMutationsAddData";

export function AddTag() {
  const [open, setOpen] = useState<boolean>(false);
  const [tagTitle, setTagTitle] = useState<string>("");
  const [tagColor, setTagColor] = useState<string>("#3b82f6");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const addTag = useAddTag();

  function handleOpen() {
    setTagTitle("");
    setTagColor("#3b82f6");
    setErrorMessage("");
    setOpen(true);
  }

  function handleClose() {
    setErrorMessage("");
    setOpen(false);
  }

  function handleAddTag() {
    const cleanTagTitle = tagTitle.trim();
    const cleanTagColor = tagColor.trim();

    if (!cleanTagTitle) {
      setErrorMessage("Tag title is required.");
      return;
    }

    if (!cleanTagColor) {
      setErrorMessage("Tag color is required.");
      return;
    }

    const isValidHexColor = /^#[0-9A-Fa-f]{6}$/.test(cleanTagColor);

    if (!isValidHexColor) {
      setErrorMessage("Color must be a valid hex color, for example #ff0000.");
      return;
    }

    addTag.mutate(
      {
        title: cleanTagTitle,
        color: cleanTagColor,
      },
      {
        onSuccess: () => {
          setErrorMessage("");
          setTagTitle("");
          setTagColor("#3b82f6");
          setOpen(false);
        },
        onError: () => {
          setErrorMessage("Tag title must be unique.");
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
        <DialogTitle>Add Tag</DialogTitle>

        <DialogContent>
          <Typography>Enter tag details below:</Typography>

          <TextField
            label="Tag Title"
            autoFocus
            value={tagTitle}
            onChange={(e) => {
              setTagTitle(e.target.value);

              if (errorMessage) {
                setErrorMessage("");
              }
            }}
            error={!!errorMessage}
            helperText={errorMessage}
            fullWidth
            sx={{ mt: 2 }}
          />

          <Typography sx={{ mt: 2, mb: 1, fontWeight: 700 }}>
            Tag Color
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
                backgroundColor: tagColor || "#3b82f6",
                border: "3px solid #e5e7eb",
                position: "relative",
                cursor: "pointer",
                boxShadow: "0 8px 18px rgba(15,23,42,0.15)",
                flexShrink: 0,
              }}
            >
              <input
                type="color"
                value={tagColor || "#3b82f6"}
                onChange={(e) => {
                  setTagColor(e.target.value);

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
              value={tagColor}
              onChange={(e) => {
                setTagColor(e.target.value);

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
          <Button onClick={handleClose}>Cancel</Button>

          <Button
            onClick={handleAddTag}
            variant="contained"
            color="primary"
            disabled={addTag.isPending}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ mt: 2 }}
      >
        Add Tag
      </Button>
    </Box>
  );
}