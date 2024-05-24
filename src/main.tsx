import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { LoginModalContextProvider } from "./contexts/LoginModalContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoginModalContextProvider>
        <App />
      </LoginModalContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
