import { Autocomplete, Box, TextField } from "@mui/material";
import { useBoardStore } from "../../store/boardStore";

export function ListOfBoards() {
  const boards = useBoardStore((state) => state.boards);
  const activeBoardId = useBoardStore((state) => state.activeBoardId);
  const setActiveBoardId = useBoardStore((state) => state.setActiveBoardId);

  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        options={boards}
        getOptionLabel={(option) => `${option.name} ${option.isDefault ? "(Default)" : ""}`}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={boards.find((board) => board.id === activeBoardId) || null}
        onChange={(_, newValue) => {
          if (newValue) {
            setActiveBoardId(newValue.id);
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="Select Board" size="small" />
        )}
      />
    </Box>
  );
}