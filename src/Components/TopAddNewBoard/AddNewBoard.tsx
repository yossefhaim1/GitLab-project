import {
  Box,
  Button,
  Drawer,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useBoardStore } from "../../store/boardStore";
import { Add } from "@mui/icons-material";
import { useMemo, useState } from "react";

export function AddNewBoard() {
  const addBoard = useBoardStore((state) => state.addBoard);
  const boards = useBoardStore((state) => state.boards);
  const [open, setOpen] = useState<boolean>(false);
  const [boardName, setBoardName] = useState<string>("");
  const [isDefault, setIsDefault] = useState<boolean>(false);

  const nextId = useMemo(() => {
    const nums = boards
      .map((board) => Number(String(board.id).split("-")[1]))
      .filter((num) => Number.isFinite(num));
    const maxId = nums.length > 0 ? Math.max(...nums) : 0;
    return `board-${maxId + 1}`;
  }, [boards]);

  async function handelCreate() {
    const NameBoard = boardName.trim();

    if (!boardName) return;

    const newBoard = {
      id: nextId,
      name: NameBoard,
      isDefault: isDefault,
    };
    await addBoard(newBoard);
    setBoardName("");
    setIsDefault(false);
    setOpen(false);
  }

  return (
    <Box>
      <IconButton
        size="small"
        sx={{ width: 34, height: 34 }}
        onClick={() => setOpen(true)}
      >
        <Add fontSize="small" />
      </IconButton>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 360, p: 2.5 }}>
          <Typography sx={{ fontWeight: 800, mb: 2 }}>Add new board</Typography>

          <TextField
            fullWidth
            label="Board name"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <ToggleButtonGroup
            value={isDefault}
            exclusive
            fullWidth
            onChange={(e, newValue) => {
              if (newValue !== null) setIsDefault(newValue);
            }}
            
          >
            <ToggleButton value={true} color="success">
              TRUE
            </ToggleButton>

            <ToggleButton value={false} color="error">
              FALSE
            </ToggleButton>
          </ToggleButtonGroup>

          <Button fullWidth variant="contained" onClick={handelCreate}> CREATE</Button>
        </Box>
      </Drawer>
    </Box>
  );
}
