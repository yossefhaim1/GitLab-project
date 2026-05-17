import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAddBoard } from "./useBoardMutationsAddData";

export function QueryMutations() {
  const [BoardName, setBoardName] = useState<string>("");

  const AddBoardMutation = useAddBoard();

  function handleAddBoard() {
    if (!BoardName.trim()) return; // לא מאפשר להוסיף לוח עם שם ריק
    AddBoardMutation.mutate(
      {
        name: BoardName,
        isDefault: false,
      },
      {
        onSuccess: () => {
          setBoardName(""); // לנקות את שדה הטקסט אחרי הוספת הלוח
        },
      },
    );
  }


  return (
    <Box sx={{ padding: "24px" }}>
      <Typography variant="h5" sx={{ marginBottom: "16px" }}>
        React Query Mutations
      </Typography>

      <TextField
        label="Board Name"
        placeholder="Enter board name"
        value={BoardName}
        onChange={(e) => setBoardName(e.target.value)}
      ></TextField>
      <Button
        variant="contained"
        sx={{ marginTop: "16px" }}
        disabled={AddBoardMutation.isPending || BoardName.trim() === ""}
        onClick={handleAddBoard}
      >
        {AddBoardMutation.isPending ? "Adding..." : "Add Board"}
      </Button>
    </Box>
  );
}
