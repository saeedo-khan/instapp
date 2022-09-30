import axios, { AxiosRequestHeaders } from "axios";
import { useRouter } from "next/router";
import React, { createContext, useContext, useState } from "react";
import { useSessionStorage } from "../../hooks/useSessionStorage";

interface AuthContextProps {
  children: React.ReactNode;
}
interface IAuth {
  login: (email: string, password: string) => void;
  signUp: (name: string, email: string, password: string) => void;
  logOut: () => void;
  loading: boolean;
}

const AuthContext = createContext({} as IAuth);

export const AuthContextProvider: React.FC<AuthContextProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [user, setUser] = useSessionStorage("userData", "");

  const login = (email: string, password: string) => {
    setLoading(true);
    const loginData = {
      email,
      password,
    };

    axios
      .post("http://localhost:3000/login", loginData, { withCredentials: true })
      .then((res) => {
        const { name, id, token } = res.data.existingUser;
        const userData = {
          id: id,
          name: name,
          email: email,
        };
        localStorage.setItem("token", token);
        setUser(userData);
        setLoading(false);
        router.replace("/");
      });
  };

  const signUp = (name: string, email: string, password: string) => {
    setLoading(true);
    const signupData = {
      name,
      email,
      password,
    };
    axios
      .post("http://localhost:3000/signup", signupData, {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        router.push("/");
      });
  };

  const logOut = () => {
    axios
      .get("http://localhost:3000/logout", {
        withCredentials: true,
        headers: { "x-access-token": `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        localStorage.clear();
        router.replace("/auth/login");
        sessionStorage.clear();
      })
      .catch((err) => {
        localStorage.clear();
        router.replace("/");
      });
  };

  return (
    <AuthContext.Provider value={{ login, signUp, logOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
