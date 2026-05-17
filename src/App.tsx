import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryMutations } from "./React_Queries/QueryMutations";

import BoardPage from "./Components/BoardPage";
import { TestBoards } from "./Components/TestBoards/TestBoards";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Box className="App">
          <nav style={{ padding: "16px", display: "flex", gap: "16px" }}>
            <Link to="/">Kanban Board</Link>
            <Link to="/react-query-test">React Query Test</Link>
            <Link to="/query-mutations">React Query Mutations</Link>
          </nav>

          <Routes>
            <Route path="/" element={<BoardPage />} />
            <Route path="/react-query-test" element={<TestBoards />} />
            <Route path="/query-mutations" element={<QueryMutations />} />
          </Routes>
        </Box>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}