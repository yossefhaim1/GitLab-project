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

  const { data } = useBoards();
  const boards = data?.boards ?? [];

  const addBoard = useAddBoard();

  function handleCloseDrawer() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    onClose();
  }

  async function handleCreate() {
    const nameBoard = boardName.trim();

    if (!nameBoard) return;

    await addBoard.mutateAsync({
      name: nameBoard,
      isDefault: boards.length === 0,
    });

    setBoardName("");
    handleCloseDrawer();
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
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          sx={{ mb: 2 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreate();
            }
          }}
        />

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