import { NavLink, useNavigate } from "react-router-dom";
import supabase from "../clients/supabase";

export const TopBar = () => {
  const navigate = useNavigate();
  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="hidden md:flex justify-between items-center bg-brand-cardBackground border-b border-brand-border h-full">
      <button className="bg-brand-primary">
        <NavLink to="/">Home</NavLink>
      </button>
      <button onClick={logout} className="bg-brand-secondary">
        Logout
      </button>
    </div>
  );
};
