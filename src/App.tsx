import { Box } from "@mui/material";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import BoardPage from "./Components/BoardPage";
import { Login } from "./Login/login";
import { Register } from "./Register/register";
import ProtectedRoute from "./Routes/ProtectedRoute";
import PublicRoute from "./Routes/PublicRoute";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Box className="App">
          <Routes>
            {/* עמודים ציבוריים */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* עמודים מוגנים */}
            <Route element={<ProtectedRoute />}>
              <Route path="/boards" element={<BoardPage />} />
            </Route>

            {/* כתובת ראשית */}
            <Route
              path="/"
              element={<Navigate to="/boards" replace />}
            />

            {/* כתובת שלא קיימת */}
            <Route
              path="*"
              element={<Navigate to="/boards" replace />}
            />
          </Routes>
        </Box>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}