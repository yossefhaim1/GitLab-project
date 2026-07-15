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
  const { data: priorities = [], isLoading, error } = usePriorities();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h6">Table Of Priorities</Typography>
          <AddPriority />
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {isLoading ? (
          <Typography>Loading priorities...</Typography>
        ) : error ? (
          <Typography color="error">Error loading priorities</Typography>
        ) : priorities.length === 0 ? (
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
                {priorities.map((priority) => (
                  <TableRow key={priority.id}>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            backgroundColor: priority.color,
                            border: "1px solid #cbd5e1",
                            flexShrink: 0,
                          }}
                        />

                        <Typography>{priority.type}</Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="right">
                      <Stack
                        direction="row"
                        gap={1}
                        justifyContent="flex-end"
                      >
                        <UpDatePriority
                          id={priority.id}
                          type={priority.type}
                          color={priority.color}
                        />

                        <DeletePriority
                          id={priority.id}
                          type={priority.type}
                        />
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
        <Button autoFocus onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}