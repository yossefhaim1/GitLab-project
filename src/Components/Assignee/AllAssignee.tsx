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
  Box,
  TableContainer,
  Stack,
} from "@mui/material";

import AddAssignee from "./AddAssignee";
import UpdateAssignee from "./UpdateAssignee";
import { useAssignees } from "../../React_Queries/useBoardsGetData";
import DeleteAssignee from "./DeleteAssignee";

interface TableOfAssigneesProps {
  open: boolean;
  onClose: () => void;
}

export function TableOfAssignees({ open, onClose }: TableOfAssigneesProps) {
  const { data: assignees = [], isLoading, error } = useAssignees();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Table Of Assignees
          <AddAssignee />
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {isLoading ? (
          <Typography>Loading assignees...</Typography>
        ) : error ? (
          <Typography color="error">Failed to load assignees</Typography>
        ) : assignees.length === 0 ? (
          <Typography>No assignees found</Typography>
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
                    Assignee Name
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
                {assignees.map((assignee) => (
                  <TableRow key={assignee.id} hover>
                    <TableCell>{assignee.name}</TableCell>

                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                      >
                        <UpdateAssignee id={assignee.id} name={assignee.name} />
                        <DeleteAssignee id={assignee.id} name={assignee.name} />
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
  );
}
