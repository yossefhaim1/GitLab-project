import { Box, Button, Tooltip, Typography } from "@mui/material";
import { AddNewBoard } from "./TopBoard/AddNewBoard";
import { useState } from "react";

export function FirstBoardForNewUser() {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // מצמיד להתחלה (למעלה)
        minHeight: "100vh",
        bgcolor: "#f0f2f5",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: 430,
          maxWidth: "100%",
          mt: "15vh", // <--- כאן הקסם: דוחף את האלמנט בדיוק לנקודה שבין הלמעלה למרכז
          p: 4,
          borderRadius: 4,
          backgroundColor: "#ffffff",
          boxShadow: "0 20px 45px rgba(15,23,42,0.12)",
          textAlign: "center",
          border: "1px solid #e5e7eb",
        }}
      >
        <Typography sx={{ fontSize: 28, fontWeight: 900, mb: 1 }}>
          Welcome to TaskBoard!
        </Typography>

        <Typography sx={{ color: "#64748b", mb: 3 }}>
          Create your first board to start working with columns and items.
        </Typography>

        <Tooltip
          title="Create your first board"
          placement="bottom"
          arrow
          enterDelay={200}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            sx={{
              backgroundColor: "#000000",
              color: "#ffffff",
              fontWeight: 600,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: "#e5e7eb",
                color: "#000000",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              },
            }}
          >
            click here to Create Board
          </Button>
        </Tooltip>
        <AddNewBoard open={open} onClose={() => setOpen(false)} />
      </Box>
    </Box>
  );
}
