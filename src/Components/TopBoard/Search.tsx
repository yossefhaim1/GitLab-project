import { Box,  TextField } from "@mui/material"
import { useBoardStore } from "../../store/boardStore";

export function Search() {
  const searchItem = useBoardStore((state) => state.searchItem);
  const onSearchItemChange = useBoardStore((state) => state.setSearchItem);
  
  return(
    <Box sx={{
      alignItems : "center",
      display: "flex"
    }}>
        <TextField
        size="small"
        placeholder="Search"
        sx={{width:450 ,
            backgroundColor:"#F0F0F0",
            borderRadius:5,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
              },

        }}
        value={searchItem}
        onChange={(e) => onSearchItemChange(e.target.value)}
        />
        

    </Box>
  )
}