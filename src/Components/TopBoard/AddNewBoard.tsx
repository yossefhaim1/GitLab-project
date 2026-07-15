import { Box, Button, Drawer, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAddBoard } from "../../React_Queries/useBoardMutationsAddData";
import { useBoards } from "../../React_Queries/useBoardsGetData";

interface AddNewBoardProps {
  open: boolean;
  onClose: () => void;
}

export function AddNewBoard({ open, onClose }: AddNewBoardProps) {
  const [boardName, setBoardName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data } = useBoards();
  const boards = data?.boards ?? [];

  const addBoard = useAddBoard();

  function handleCloseDrawer() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setErrorMessage("");
    onClose();
  }

  async function handleCreate() {
    const nameBoard = boardName.trim();

    if (!nameBoard) {
      setErrorMessage("Board name is required.");
      return;
    }

    const boardExists = boards.some(
      (board) => board.title.trim().toLowerCase() === nameBoard.toLowerCase(),
    );

    if (boardExists) {
      setErrorMessage("A board with this name already exists.");
      return;
    }

    try {
      await addBoard.mutateAsync(
        {
          title: nameBoard,
          isDefault: boards.length === 0,
        },
        {
          onSuccess: () => {
            setErrorMessage("");
          },
          onError: () => {
            setErrorMessage("Failed to create board. Please try again.");
          },
        },
      );

      setBoardName("");
      handleCloseDrawer();
    } catch {
      // Error state is handled via onError callback.
    }
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleCloseDrawer}
      ModalProps={{
        keepMounted: false,
      }}
    >
      <Box sx={{ width: 360, p: 2.5 }}>
        <Typography sx={{ fontWeight: 800, mb: 2 }}>
          Add new board
        </Typography>

        <TextField
          fullWidth
          label="Board name"
          autoFocus
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          sx={{ mb: 2 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreate();
            }
          }}
        />

        {errorMessage ? (
          <Typography color="error" sx={{ mb: 2, fontSize: 13 }}>
            {errorMessage}
          </Typography>
        ) : null}

        <Button
          fullWidth
          variant="contained"
          onClick={handleCreate}
          disabled={addBoard.isPending}
        >
          {addBoard.isPending ? "Creating..." : "CREATE"}
        </Button>
      </Box>
    </Drawer>
  );
}