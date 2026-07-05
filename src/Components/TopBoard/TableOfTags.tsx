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
import { useTags } from "../../React_Queries/useBoardsGetData";
import { AddTag } from "../Tags/AddTag";
import { DeleteTag } from "../Tags/DeleteTag";
import { UpdateTag } from "../Tags/UpDateTag";

interface TableOfTagsProps {
  open: boolean;
  onClose: () => void;
}

export function TableOfTags({ open, onClose }: TableOfTagsProps) {
  const { data: tags = [], isLoading, error } = useTags();

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
          <Typography variant="h6">Table Of Tags</Typography>
          <AddTag />
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {isLoading ? (
          <Typography>Loading Tags...</Typography>
        ) : error ? (
          <Typography color="error">Error loading tags</Typography>
        ) : tags.length === 0 ? (
          <Typography>No tags available</Typography>
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
                    Tag Name
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
                {tags.map((tag) => (
                  <TableRow key={tag.id}>
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
                            backgroundColor: tag.color,
                            border: "1px solid #cbd5e1",
                            flexShrink: 0,
                          }}
                        />

                        <Typography>{tag.title}</Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="right">
                      <Stack
                        direction="row"
                        gap={1}
                        justifyContent="flex-end"
                      >
                        <UpdateTag
                          id={tag.id}
                          title={tag.title}
                          color={tag.color}
                        />

                        <DeleteTag id={tag.id} title={tag.title} />
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