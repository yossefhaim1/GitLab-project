import { Box,  IconButton,  InputAdornment,  TextField } from "@mui/material"
import { useBoardStore } from "../../store/boardStore";
import { Clear } from "@mui/icons-material";
import { useEffect, useState } from "react";

export function Search() {
  const onSearchItemChange = useBoardStore((state) => state.setSearchItem);
  const [inputValue , setInputValue] = useState<string>("");

  useEffect(()=>{
    const timer = setTimeout(()=> {
      onSearchItemChange(inputValue);
    }, 750);

    return () => clearTimeout(timer);
  }, [inputValue, onSearchItemChange]);

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
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        InputProps={{
          endAdornment: inputValue && (
            <InputAdornment position="end">
              <IconButton onClick={() => setInputValue("")}>
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
        

    </Box>
  )
}