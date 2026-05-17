import { Box, Button, Paper, Typography } from "@mui/material";
import {
  useBoards,
  useColumns,
  useItems,
} from "../../React_Queries/useBoardsGetData";

export function TestBoards() {
  const {
    data: { boards, defaultBoardId } = {},
    isLoading: isBoardsLoading,
    refetch,
    isError: isBoardsError,
  } = useBoards();

  const { data: columns } = useColumns(defaultBoardId);
  const { data: items } = useItems(defaultBoardId);

  if (isBoardsLoading) return <div>Loading...</div>;
  if (isBoardsError) return <div>Error loading boards</div>;

  return (
    <Box sx={{ padding: "16px", backgroundColor: "#f0f0f0" }}>
      <Typography
        variant="h6"
        sx={{
          color: "#0026ff",
        }}
      >
        Boards from React Query
      </Typography>

      {boards?.map((board) => (
        <Box
          key={board.id}
          sx={{
            marginBottom: "8px",
            color: board.isDefault ? "#ff00fb" : "#000000",
          }}
        >
          {board.name} {board.isDefault ? "(Default)" : ""}{" "}
        </Box>
      ))}

      <Typography
        variant="h6"
        sx={{
          color: "#0026ff",
          marginTop: "24px",
        }}
      >
        Columns for Board{" "}
        {boards?.find((board) => board.id === defaultBoardId)?.name ??
          "no board"}
      </Typography>

      {columns?.map((column) => (
        <Box key={column.id} sx={{ marginBottom: "8px", color: column.color }}>
          {column.title} ({column.id})
        </Box>
      ))}

      <Typography
        variant="h6"
        sx={{
          color: "#0026ff",
          marginTop: "24px",
        }}
      >
        Items for Board{" "}
        {boards?.find((board) => board.id === defaultBoardId)?.name ??
          "no board"}
      </Typography>

      {items?.map((item) => (
        <Paper
          sx={{
        p: 2.25,
        mb: 2,
        borderRadius: 3,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 150,
        "&:hover": {
          boxShadow: 4,
        },
        "&:hover .edit-btn": {
          opacity: 1,
        },
      }}
          key={item.id}
        >
          <Box key={item.id} sx={{ marginBottom: "8px" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {item.title} - {item.id}
            </Typography>
            <Box>Column ID: {item.columnId} </Box>
            {item.assigneeId
              ? `(Assignee ID: ${item.assigneeId})`
              : "(No Assignee)"}
          </Box>
        </Paper>
      ))}
      <Button onClick={() => refetch()}>Refetch Boards</Button>
    </Box>
  );
}
