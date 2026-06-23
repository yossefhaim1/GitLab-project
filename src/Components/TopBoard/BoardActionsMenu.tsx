import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from '@mui/icons-material/Person';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useState } from "react";
import type { MouseEvent } from "react";

import { TableOfPriorities} from './TableOfPriorities';
import { TableOfTags} from './TableOfTags';
import { TableOfUsers} from "../Users/AllUsers";
import { AddNewBoard } from "./AddNewBoard";
import { DeleteBoard } from "./DeleteBoard";

export function BoardActionsMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [openAddBoard, setOpenAddBoard] = useState<boolean>(false);
  const [openDeleteBoard, setOpenDeleteBoard] = useState<boolean>(false);
  const [openBoardUserBoard, setOpenBoardUserBoard] = useState<boolean>(false);
  const [openTableOfPriorities, setOpenTableOfPriorities] = useState<boolean>(false);
  const [openTableOfTags, setOpenTableOfTags] = useState<boolean>(false);

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
        <Tooltip
          title="Board Actions"
          placement="bottom"
          arrow
          enterDelay={200}
        >
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
        </Tooltip>

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
              minWidth: 215,
              borderRadius: "25px",
              border: "1px solid #e5e7eb",
              overflow: "hidden",
            },
          }}
        >
            <MenuItem
            onClick={() => {
              handleCloseMenu();
              setOpenBoardUserBoard(true);
            }}
          >
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Table Users" />
          </MenuItem> 
          
            <MenuItem
            onClick={() => {
              handleCloseMenu();
              setOpenTableOfPriorities(true);
            }}
          >
            <ListItemIcon>
              <PriorityHighIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary=" Priorities Table" />
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleCloseMenu();
              setOpenTableOfTags(true);
            }}
          >
            <ListItemIcon>
              <BookmarkAddedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary=" Tags Table" />
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={() => {
              handleCloseMenu();
              setTimeout(() => {
                setOpenAddBoard(true);
              }, 0);
            }}
          >
            <ListItemIcon>
              <AddIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Add New Board" />
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={() => {
              handleCloseMenu();

              setTimeout(() => {
                setOpenDeleteBoard(true);
              }, 0);
            }}
            sx={{ color: "error.main" }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText primary="Delete Board" />
          </MenuItem>
        </Menu>
      </Box>

      <AddNewBoard open={openAddBoard} onClose={() => setOpenAddBoard(false)} />

      <DeleteBoard
        open={openDeleteBoard}
        onClose={() => setOpenDeleteBoard(false)}
      />
      <TableOfUsers
        open={openBoardUserBoard}
        onClose={() => setOpenBoardUserBoard(false)}
      />

      <TableOfPriorities
        open={openTableOfPriorities}
        onClose={() => setOpenTableOfPriorities(false)}
      />
      <TableOfTags
        open={openTableOfTags}
        onClose={() => setOpenTableOfTags(false)}
      />      
    </>
  );
}
