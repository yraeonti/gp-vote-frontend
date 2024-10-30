"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface IAuthValues {
  token: string | null;
  saveToken: (token: string) => void;
  logOut: () => void;
  done: boolean;
}

const defaultValues: IAuthValues = {
  token: null,
  saveToken: (token: string) => {},
  logOut: () => {},
  done: false,
};

const TOKEN_AUTH = "auth_token";

const AuthContext = createContext(defaultValues);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [token, setToken] = useState(defaultValues.token);

  const [done, setDone] = useState(defaultValues.done);

  const saveToken = (token: string) => {
    setToken(token);
    localStorage.setItem(TOKEN_AUTH, token);
  };

  const logOut = () => {
    setToken(null);
    localStorage.removeItem(TOKEN_AUTH);
  };

  useLayoutEffect(() => {
    const token = localStorage.getItem(TOKEN_AUTH);

    if (token) setToken(token);

    setDone(true);
  }, []);

  return (
    <AuthContext.Provider value={{ token, saveToken, done, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
