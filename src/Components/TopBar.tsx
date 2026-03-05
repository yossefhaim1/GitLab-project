import { AppBar, Toolbar, Box } from "@mui/material";
import ToggleFocusMode from "./Header/ToggleFocusMode";
import SearchButton from "./Header/SearchButton";

export default function TopNavigationBar() {
  return (
    <AppBar
      position="static"
      sx={{
        paddingTop: "10px",
        paddingBottom: "10px",
        backgroundColor: "#ffffff", // צבע לבן נקי (אפשר לשנות ל-primary.main)
        color: "#000000",
        boxShadow: "0px 1px 5px rgba(0,0,0,0.1)", // הצללה עדינה
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* מרכז: חיפוש */}
        <Box sx={{ display: "flex", justifyContent: "felx-end", flex: 5 }}>
          <SearchButton />
        </Box>
        {/* כפתור הגדלה */}
        <Box sx={{ display: "flex", justifyContent: "flex-start" , flex: 1 }}>
          <ToggleFocusMode />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
