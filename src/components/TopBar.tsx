import { NavLink, useNavigate } from "react-router-dom";
import supabase from "../clients/supabase";
import Button from "./Button";

export const TopBar = () => {
  const navigate = useNavigate();
  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="sticky left-0 top-0 right-0 min-h-[60px]">
      <div className="hidden md:flex justify-between items-center bg-brand-cardBackground border-b border-brand-border h-full p-4">
        <button className="bg-brand-primary">
          <NavLink to="/">Home</NavLink>
        </button>
        <Button onClick={logout}>Logout</Button>
      </div>
    </header>
  );
};
