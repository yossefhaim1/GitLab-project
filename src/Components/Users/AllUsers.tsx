import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Box,
  Tooltip,
  TableContainer,
  TextField,
  Stack,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { useBoardStore } from "../../store/boardStore";
import AddUser from "./AddUser";
import UpDateUser from "./UpDateUser";
import DeleteUser from "./DeleteUser";

interface TableOfUsersProps {
  open: boolean;
  onClose: () => void;
}

type User = {
  id: number;
  name: string;
};

export function TableOfUsers({ open, onClose }: TableOfUsersProps) {
  const users = useBoardStore((state) => state.users);
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Table Of Users
            <AddUser/>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          {users.length === 0 ? (
            <Typography>No users found</Typography>
          ) : (
            <TableContainer sx={{ maxHeight: 350 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        backgroundColor: "#eeeeee",
                        fontWeight: "bold",
                        color: "#636363",
                      }}
                    >
                      User Name
                    </TableCell>

                    <TableCell
                      align="right"
                      sx={{
                        backgroundColor: "#eeeeee",
                        fontWeight: "bold",
                        color: "#636363",
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>{user.name}</TableCell>

                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <UpDateUser id={user.id} name={user.name} />

                        <DeleteUser id={user.id} name={user.name} />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
