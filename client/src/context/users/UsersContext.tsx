import axios from "axios";
import React, { createContext, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useSessionStorage } from "../../hooks/useSessionStorage";

interface UsersContextProps {
  children: React.ReactNode;
}

interface IUsersData {
  followUser: (followerId: string) => void;
}

const UserContext = createContext({} as IUsersData);

export const UsersContextProvider: React.FC<UsersContextProps> = ({
  children,
}) => {
  const [userData, setUserData] = useSessionStorage("userData", "");

  const followUser = (followerId: string) => {
    const data = {
      userId: userData.id,
      followerId,
      isFollower: true,
    };
    axios
      .post("http://localhost:3000/users/follow", data)
      .then((res) => {
        toast.success(`you start follow `, {
          position: "top-center",
          duration: 4000,
        });
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(`failed ${err}`, {
          position: "top-center",
          duration: 4000,
        });
      });
  };

  return (
    <UserContext.Provider value={{ followUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default function useUsers() {
  return useContext(UserContext);
}
