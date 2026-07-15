import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  ListItemIcon,
  Box,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { API } from "../Api/boardPageApi";
import { useQueryClient } from "@tanstack/react-query";
import { useState, type MouseEvent } from "react";
import { useBoardStore } from "../store/boardStore";

export function ProfileAvatar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const profile = useBoardStore((state) => state.profile);
  const clearProfile = useBoardStore((state) => state.clearProfile);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogout() {
    handleClose();

    API.logout();
    queryClient.clear();
    clearProfile();

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <>
      <Tooltip title="Profile" arrow>
        <IconButton
          size="small"
          onClick={handleOpen}
          aria-label="open profile menu"
          aria-controls={open ? "profile-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{
            p: 0.4,
            borderRadius: "50%",
            border: "1px solid",
            borderColor: open ? "primary.main" : "divider",
            bgcolor: "background.paper",
            boxShadow: open
              ? "0 0 0 3px rgba(25, 118, 210, 0.12)"
              : "0 2px 8px rgba(0, 0, 0, 0.08)",
            transition: "all 0.2s ease",

            "&:hover": {
              bgcolor: "background.paper",
              borderColor: "primary.main",
              transform: "translateY(-1px)",
              boxShadow: "0 5px 14px rgba(0, 0, 0, 0.12)",
            },
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              fontSize: 17,
              fontWeight: 700,
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            {profile?.name[0].toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1.2,
              width: 260,
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              boxShadow: "0 14px 35px rgba(0, 0, 0, 0.13)",

              "& .MuiMenu-list": {
                p: 0,
              },
            },
          },
        }}
      >
        <Box
          sx={{
            px: 2.2,
            py: 2.1,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "background.default",
          }}
        >
          <Avatar
            sx={{
              width: 48,
              height: 48,
              fontSize: 19,
              fontWeight: 700,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              flexShrink: 0,
            }}
          >
            {profile?.name[0].toUpperCase()}
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 700,
                color: "text.primary",
                lineHeight: 1.4,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {profile?.name}
            </Typography>

            <Typography
              sx={{
                mt: 0.25,
                fontSize: 12.5,
                color: "text.secondary",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {profile?.email}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: 1 }}>
          <MenuItem
            onClick={handleLogout}
            sx={{
              minHeight: 46,
              px: 1.4,
              borderRadius: 2,
              fontSize: 14,
              fontWeight: 600,
              color: "text.primary",
              transition: "all 0.2s ease",

              "&:hover": {
                bgcolor: "rgba(211, 47, 47, 0.08)",
                color: "error.main",

                "& .MuiListItemIcon-root": {
                  color: "error.main",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                color: "text.secondary",
                transition: "color 0.2s ease",
              }}
            >
              <LogoutIcon fontSize="small" />
            </ListItemIcon>

            Logout
          </MenuItem>
        </Box>
      </Menu>
    </>
  );
}