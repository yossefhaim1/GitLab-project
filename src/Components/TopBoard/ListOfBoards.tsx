import { Autocomplete, Box, TextField } from "@mui/material";
import { useBoardStore } from "../../store/boardStore";
import { useBoards } from "../../React_Queries/useBoardsGetData";

export function ListOfBoards() {
  const {data}  = useBoards();

  const boards = data?.boards ?? [];

  const activeBoardId = useBoardStore((state) => state.activeBoardId);

  const setActiveBoardId = useBoardStore((state) => state.setActiveBoardId);

  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        options={boards}
        getOptionLabel={(option) =>
          `${option.title} ${option.isDefault ? "(Default)" : ""}`
        }
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
