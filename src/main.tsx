import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { LoginContextProvider } from "./contexts/LoginContext.tsx";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <LoginContextProvider>
            <App queryClient={queryClient} />
          </LoginContextProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
