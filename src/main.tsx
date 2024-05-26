import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { LoginModalContextProvider } from "./contexts/LoginModalContext.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <LoginModalContextProvider>
          <App />
        </LoginModalContextProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
