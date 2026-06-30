import { Box, Paper, Tooltip, Typography } from "@mui/material";
import DeleteItem from "./DeleteItem";
import {UpdateItem} from "./UpdateItem";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useColumns, useItems } from "../../React_Queries/useBoardsGetData";
import { useBoardStore } from "../../store/boardStore";

type ItemCardProps = {
  itemId: number;
};

export default function ItemCard({ itemId }: ItemCardProps) {
  const activeBoard = useBoardStore((state) => state.activeBoardId);

  const { data: columns } = useColumns(activeBoard);
  const { data: items } = useItems(activeBoard);

  const item = items?.find((currentItem) => currentItem.id === itemId);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `item-${itemId}`,
  });

  if (!item) return null;

  const column = columns?.find(
    (currentColumn) => currentColumn.id === item.columnId
  );

  if (!column) return null;

  return (
    <Paper
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.25 : 1,
      }}
      elevation={1}
      sx={{
        p: 2.25,
        mb: 2,
        borderRadius: 3,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 150,
        "&:hover": {
          boxShadow: 4,
        },
        "&:hover .edit-btn": {
          opacity: 1,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography
            {...attributes}
            {...listeners}
            sx={{
              fontSize: "15px",
              fontWeight: 800,
              lineHeight: 1.25,
              cursor: isDragging ? "grabbing" : "grab",
              userSelect: "none",
            }}
          >
            {item.title}
          </Typography>

          <Box
            className="edit-btn"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            sx={{
              opacity: 0,
              transition: "0.15s",
              ml: 0.5,
            }}
          >
            <UpdateItem itemId={item.id} />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#6b7280",
            }}
          >
            p{item.position}-#{item.id}
          </Typography>

          {item.priority && (
            <Box
              sx={{
                fontSize: "11px",
                fontWeight: 800,
                backgroundColor: `${item.priority.color}98`,
                color: "#ffffff",
                px: 1,
                height: 22,
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              {item.priority.type[0].toUpperCase()}
            </Box>
          )}
        </Box>
      </Box>

      {item.tags?.length > 0 && (
        <Box
          sx={{
            mt: 1.25,
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {item.tags.map((tag) => (
            <Box
              key={tag.id}
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                backgroundColor: `${tag.color}98`,
                color: "#ffffff",
                border: `1px solid ${tag.color}90`,
                textShadow: "0 0 3px rgba(0,0,0,0.6)",
                px: 1,
                height: 24,
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                lineHeight: 1,
              }}
            >
              {tag.title}
            </Box>
          ))}
        </Box>
      )}

      {item.assignee && (
        <Typography
          sx={{
            mt: 1.25,
            fontSize: "12px",
            fontWeight: 700,
            color: "#6b7280",
          }}
        >
        {item.assignee.name}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 1.5,
        }}
      >
        <Tooltip title="Delete Item" placement="bottom" arrow enterDelay={200}>
          <Box
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <DeleteItem itemId={item.id} />
          </Box>
        </Tooltip>

        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 1.25,
            py: 0.5,
            height: "24px",
            backgroundColor: `${column.color}33`,
            borderRadius: "25px",
            border: `1px solid ${column.color}30`,
            boxShadow: `0 2px 6px ${column.color}20`,
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: column.color,
            }}
          />

          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: 600,
              color: column.color,
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            {column.title.replace("_", " ")}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
