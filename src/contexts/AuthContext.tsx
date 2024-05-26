/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import supabase from "../clients/supabase";
import { Session } from "@supabase/supabase-js";

type AuthContextType = {
  session: Session | null;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      })
      .catch((err) => console.error(err));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  const value = {
    session,
  };

  console.log(value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
