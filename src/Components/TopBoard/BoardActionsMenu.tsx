import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import type { MouseEvent } from "react";

import { AddNewBoard } from "./AddNewBoard";
import { DeleteBoard } from "./DeletBoard";
// import { UpdateBoard } from "./UpdateBoard";

export function BoardActionsMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [openAddBoard, setOpenAddBoard] = useState(false);
  const [openDeleteBoard, setOpenDeleteBoard] = useState(false);
  const [openUpdateBoard, setOpenUpdateBoard] = useState(false);

  const openMenu = Boolean(anchorEl);

  function handleOpenMenu(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  return (
    <>
      <Box>
        <IconButton
          onClick={handleOpenMenu}
          sx={{
            width: 38,
            height: 38,
            borderRadius: "12px",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            "&:hover": {
              backgroundColor: "#eef2ff",
            },
          }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            elevation: 4,
            sx: {
              mt: 1,
              minWidth: 190,
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
              overflow: "hidden",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleCloseMenu();
              setOpenAddBoard(true);
            }}
          >
            <ListItemIcon>
              <AddIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="הוספת Board" />
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleCloseMenu();
              setOpenUpdateBoard(true);
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="עדכון Board" />
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={() => {
              handleCloseMenu();
              setOpenDeleteBoard(true);
            }}
            sx={{ color: "error.main" }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText primary="מחיקת Board" />
          </MenuItem>
        </Menu>
      </Box>

      <AddNewBoard
        open={openAddBoard}
        onClose={() => setOpenAddBoard(false)}
      />

      <DeleteBoard
        open={openDeleteBoard}
        onClose={() => setOpenDeleteBoard(false)}
      />
    </>
  );
}