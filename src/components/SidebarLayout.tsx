import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const SidebarLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
