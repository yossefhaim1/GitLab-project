import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useItemsWithoutPriority } from "../../Hook/useItemsWithoutPriority";
import { UpdateItem } from "../Board/UpdateItem";

interface ItemWithoutPriorityProps {
  open: boolean;
  onClose: () => void;
}

export function ItemWithoutPriority({
  open,
  onClose,
}: ItemWithoutPriorityProps) {
  const { itemsWithoutPriority, count, isLoading, error } =
    useItemsWithoutPriority();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Items Without Priority</DialogTitle>

      <DialogContent dividers>
        {isLoading ? (
          <Typography>Loading items...</Typography>
        ) : error ? (
          <Typography color="error">Error loading items</Typography>
        ) : count === 0 ? (
          <Typography>All items have priority.</Typography>
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
                    Item Title
                  </TableCell>

                  <TableCell
                    sx={{
                      backgroundColor: "#eeeeee",
                      fontWeight: "bold",
                      color: "#636363",
                    }}
                  >
                    Column ID
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
                {itemsWithoutPriority.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.columnId}</TableCell>

                    <TableCell align="right" >
                      <UpdateItem itemId={item.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
