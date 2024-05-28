import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { LoginContextProvider } from "./contexts/LoginContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <LoginContextProvider>
          <App />
        </LoginContextProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
