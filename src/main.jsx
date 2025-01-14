import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import AppRoute from "./Routers/Routes.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { Toaster } from "sonner";
import { ThemeProvider } from "./Context/ThemeProvider.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <AuthProvider>
        <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AppRoute />
        </QueryClientProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
