import { Box, Paper, Tooltip, Typography } from "@mui/material";
import type { Columns, Items } from "../../Type";
import DeleteItem from "./DeleteItem";

type ItemCardProps = {
  item: Items;
  column: Columns;
  ondeleteItems: (id: string) => void;
};

export default function ItemCard({ item, column, ondeleteItems  }: ItemCardProps) {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2.25,
        mb: 2,
        borderRadius: 3,
        backgroundColor: "#ffffff",
        transition: "0.15s",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 150,
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      {/* Top row: title + meta */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 800,
            lineHeight: 1.25,
          }}
        >
          {item.title}
        </Typography>

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
            #{item.id.split("-")[1]}
          </Typography>

          {item.priority.map((priority, index) => (
            <Box
              key={index}
              sx={{
                fontSize: "11px",
                fontWeight: 800,
                backgroundColor: `${priority.color}98`,
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
              {priority.type[0].toUpperCase()}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Tags */}
      <Box
        sx={{
          mt: 1.25,
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {item.tags.map((tag, index) => (
          <Box
            key={index}
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
              "&:hover": {
                textDecoration: "underline",
                cursor: "default",
              },
            }}
          >
            {tag.type}
          </Box>
        ))}
      </Box>

      {/* Bottom actions */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 1.5,
        }}
      >
        <Tooltip title="Delete User" placement="bottom">
          <DeleteItem item={item} ondeleteItems={ondeleteItems} />
        </Tooltip>

        {/* Status */}
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
            transition: "transform 0.2s ease",
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
            {column.statusKey.replace("_", " ")}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}