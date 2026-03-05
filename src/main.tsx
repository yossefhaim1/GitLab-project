import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light", // אפשר לשנות ל-"dark"
  },
  typography: {
    fontFamily: "Open Sans, Arial, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);