import { Box } from "@mui/material";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import BoardPage from "./Components/BoardPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Box className="App">
        <BoardPage />
      </Box>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}