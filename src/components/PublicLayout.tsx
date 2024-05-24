import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const PublicLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
