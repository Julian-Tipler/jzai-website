import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

type LoginModalContextType = {
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  redirectTo: string;
  setRedirectTo: (url: string) => void;
};

const LoginModalContext = createContext<LoginModalContextType>(
  {} as LoginModalContextType,
);

interface LoginModalContextProviderProps {
  children: ReactNode;
}

export function LoginModalContextProvider({
  children,
}: LoginModalContextProviderProps) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState("");

  useEffect(() => {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split("/").slice(0, 3).join("/");
    const defaultRedirectTo = `${baseUrl}/profile`;

    setRedirectTo(defaultRedirectTo);
  }, []);

  const value = {
    loginModalOpen,
    setLoginModalOpen,
    redirectTo,
    setRedirectTo,
  };

  return (
    <LoginModalContext.Provider value={value}>
      {children}
    </LoginModalContext.Provider>
  );
}

export const useLoginModalContext = () => useContext(LoginModalContext);
