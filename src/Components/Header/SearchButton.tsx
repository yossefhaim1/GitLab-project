import { Autocomplete, Box, TextField, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import type { SearchData } from "../../Type";


export default function SearchButton() {
    const [data, setData] = useState<SearchData[]>([]);

    useEffect(() => {
        fetch('/api/searchData')
            .then(response => response.json())
            .then(data => {
                console.log("Users data:", data);
                setData(data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Tooltip title="Search Users" placement="bottom">
        <Autocomplete
          multiple
          id="tags-outlined"
          options={data}
          getOptionLabel={(option) => `${option.icon} ${option.username} ${option.type}`}
          renderInput={(params) => (
            <TextField {...params} 
            label="Search Users"
            variant="outlined" 
            placeholder="Search Users"
            />
          )}
          filterSelectedOptions
          onChange={(_, newValue) => {
            console.log("Selected user:", newValue);
          }}
          
        />
      </Tooltip>
    </Box>
  );
}
