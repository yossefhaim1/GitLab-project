import {
  Box,
  Button,
  Drawer,
  TextField,
  Typography,
} from "@mui/material";
import { useBoardStore } from "../../store/boardStore";
import { useState } from "react";
import type { CreateBoardPayload } from "../../Type";

interface AddNewBoardProps {
  open: boolean;
  onClose: () => void;
}

export function AddNewBoard({ open, onClose }: AddNewBoardProps) {
  const [boardName, setBoardName] = useState<string>("");

  const addBoard = useBoardStore((state) => state.addBoard);
  const setActiveBoardId = useBoardStore((state) => state.setActiveBoardId);

  function handleCloseDrawer() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    onClose();
  }

  async function handelCreate() {
    const NameBoard = boardName.trim();

    if (!NameBoard) return;

    const newBoard: CreateBoardPayload = {
      name: NameBoard,
    };

    const createdBoard = await addBoard(newBoard);

    setBoardName("");
    handleCloseDrawer();

    if (!createdBoard) return;

    setActiveBoardId(createdBoard.id);
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
        />

        <Button fullWidth variant="contained" onClick={handelCreate}>
          CREATE
        </Button>
      </Box>
    </Drawer>
  );
}