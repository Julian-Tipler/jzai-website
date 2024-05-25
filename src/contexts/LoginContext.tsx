import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

type LoginContextType = {
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  redirectTo: string;
  setRedirectTo: (url: string) => void;
  handleModalLogin: (destination: string) => void;
};

const LoginContext = createContext<LoginContextType>({} as LoginContextType);

interface LoginContextProviderProps {
  children: ReactNode;
}

export function LoginContextProvider({ children }: LoginContextProviderProps) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState("");

  useEffect(() => {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split("/").slice(0, 3).join("/");
    const defaultRedirectTo = `${baseUrl}/profile`;

    setRedirectTo(defaultRedirectTo);
  }, []);

  const handleModalLogin = (destination: string) => {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split("/").slice(0, 3).join("/");

    setLoginModalOpen(true);
    setRedirectTo(`${baseUrl}${destination}`);
  };

  const value = {
    loginModalOpen,
    setLoginModalOpen,
    redirectTo,
    setRedirectTo,
    handleModalLogin,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}

export const useLoginContext = () => useContext(LoginContext);
