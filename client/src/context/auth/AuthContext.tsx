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
  errorMsg: string | undefined;
}

const AuthContext = createContext({} as IAuth);

export const AuthContextProvider: React.FC<AuthContextProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState();
  const router = useRouter();
  const [user, setUser] = useLocalStorage("userData", "");

  const login = (email: string, password: string) => {
    setLoading(true);
    const loginData = {
      email,
      password,
    };

    try {
      axios
        .post<ILogin>(
          `https://instapp-two.vercel.app/api/auth/login`,
          loginData,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          const { name, id, email } = res.data.data.existingUser;
          const userData = {
            id,
            name,
            email,
          };
          setUser(userData);
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
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
      .post("https://instapp-two.vercel.app/api/auth/signup", signupData, {
        withCredentials: false,
      })
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
  };

  const logOut = () => {
    axios
      .get("https://instapp-two.vercel.app/api/auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.clear();
        router.replace("/auth/login");
      })
      .catch((err) => {
        localStorage.clear();
      });
  };

  return (
    <AuthContext.Provider value={{ login, signUp, logOut, loading, errorMsg }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
