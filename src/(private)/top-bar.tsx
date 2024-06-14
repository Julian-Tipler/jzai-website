import { useNavigate } from "react-router-dom";
import supabase from "../clients/supabase";
import Button from "../components/button";

export const TopBar = () => {
  const navigate = useNavigate();
  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="bg-white z-10 sticky left-0 top-0 right-0 min-h-[60px]">
      <div className="hidden md:flex justify-end items-center bg-brand-cardBackground border-b border-brand-border h-full p-2">
        <Button onClick={logout}>Logout</Button>
      </div>
    </header>
  );
};
