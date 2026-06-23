import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { usePriorities } from "../../React_Queries/useBoardsGetData";
import { DeletePriority } from "../priority/DeletePriority";
import { AddPriority } from "../priority/AddPriority";
import { UpDatePriority } from "../priority/UpDatePriority";

interface TableOfPrioritiesProps {
  open: boolean;
  onClose: () => void;
}

export function TableOfPriorities({ open, onClose }: TableOfPrioritiesProps) {
  const { data: priority = [], isLoading, error } = usePriorities();
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
          Table Of Priorities
          <AddPriority  />
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {isLoading ? (
          <Typography>Loading priorities...</Typography>
        ) : error ? (
          <Typography color="error">Error loading priorities</Typography>
        ) : priority.length === 0 ? (
          <Typography>No priorities available</Typography>
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
                    Priority Name
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
                {priority.map((priority) => (
                  <TableRow key={priority.id}>
                    <TableCell>
                      <Box
                        sx={{ display: "flex",
                           alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 50,
                            height: 20,
                            borderRadius: "10%",
                            backgroundColor: priority.color,
                          }}
                        />
                        {priority.type}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" gap={1} justifyContent="flex-end">
                        <UpDatePriority id={priority.id} type={priority.type} color={priority.color} />
                        <DeletePriority id={priority.id} type={priority.type} />
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
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
