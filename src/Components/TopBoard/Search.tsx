import { Box, TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function Search() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 420,
      }}
    >
      <TextField
        fullWidth
        placeholder="Search items..."
        size="small"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ mr: 0 , boardColor: "#000000" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pr: 1,
                  mr: 1,
                  borderRight: "1px solid #000000",
                }}
              >
                <Button
                  sx={{
                    minWidth: 0,
                    p: 0.75,
                    borderRadius: "999px",
                  }}
                >
                  <SearchIcon sx={{ color: "#000000" }} />
                </Button>
              </Box>
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: "#f0efef",
          borderRadius: "14px",

          "& .MuiOutlinedInput-root": {
            borderRadius: "14px",
            transition: "all 0.2s ease",
            overflow: "hidden",

            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "14px",
              borderColor: "#e5e7eb",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#cbd5e1",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#000000",
              boxShadow: "0 0 0 2px rgba(99,102,241,0.15)",
            },
          },
        }}
      />
    </Box>
  );
}