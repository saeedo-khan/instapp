import axios, { AxiosRequestHeaders } from "axios";
import { useRouter } from "next/router";
import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface ILogin {
  type: string;
  message: string;
  data: {
    existingUser: {
      id: string;
      name: string;
      email: string;
    };
  };
}

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
  // const [user, setUser] = useSessionStorage("userData", "");
  const [user, setUser] = useLocalStorage("userData", "");

  const login = (email: string, password: string) => {
    setLoading(true);
    const loginData = {
      email,
      password,
    };

    try {
      axios
        .post<ILogin>("http://localhost:3000/api/auth/login", loginData, {
          withCredentials: true,
        })
        .then((res) => {
          const { name, id, email } = res.data.data.existingUser;
          console.log(res);
          const userData = {
            id,
            name,
            email,
          };
          setUser(userData);
          setLoading(false);
          router.push("/");
        });
    } catch (err) {
      setLoading(false);
      router.reload();
    }
  };

  const signUp = (name: string, email: string, password: string) => {
    setLoading(true);
    const signupData = {
      name: name.split(" ").join("_"),
      email,
      password,
    };
    axios
      .post("http://localhost:3000/api/auth/signup", signupData, {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        router.push("/");
      });
  };

  const logOut = () => {
    axios
      .get("http://localhost:3000/api/auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.clear();
        router.replace("/auth/login");
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
