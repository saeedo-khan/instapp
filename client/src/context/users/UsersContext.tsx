import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import { Gender } from "../../interfaces/types";

interface UsersContextProps {
  children: React.ReactNode;
}

interface IUsersData {
  updateUserData: (changeData: IUpdateUser) => void;
  followUser: (followerId: string) => void;
  unFollowUser: (followerId: string) => void;
}

interface IUpdateUser {
  id: string | null;
  name: string | null;
  thumbUrl: string | null;
  gender: Gender | null;
  statusMessage: string | null;
}

const UserContext = createContext({} as IUsersData);

export const UsersContextProvider: React.FC<UsersContextProps> = ({
  children,
}) => {
  const [userData] = useSessionStorage("userData", "");

  const updateUserData = (changeData: IUpdateUser) => {
    const { name, thumbUrl, gender, statusMessage } = changeData;
    const userUpdate = {
      id: userData.id,
      name,
      thumbUrl,
      gender,
      statusMessage,
    };
    axios
      .put(`http://localhost:3000/users/${userData.id}`, userUpdate)
      .then((res) => {
        toast.success("User updated", {
          position: "top-center",
          duration: 4000,
        });
      })
      .catch((err) => {
        toast.error("Error updating user", {
          position: "top-center",
          duration: 4000,
        });
      });
  };

  const followUser = (followerId: string) => {
    const data = {
      userId: userData.id,
      followerId,
      isFollower: true,
    };
    axios
      .post("http://localhost:3000/users/follow", data)
      .then((res) => {
        toast.success(`you started follow `, {
          position: "top-center",
          duration: 4000,
        });
      })
      .catch((err) => {
        toast.error(`failed ${err}`, {
          position: "top-center",
          duration: 4000,
        });
      });
  };

  const unFollowUser = (followerId: string) => {
    axios
      .delete(`http://localhost:3000/users/follow/${followerId}`)
      .then((res) => {
        toast.success(`unfollow user `, {
          position: "top-center",
          duration: 4000,
        });
      })
      .catch((err) => {
        toast.error(`failed ${err}`, {
          position: "top-center",
          duration: 4000,
        });
      });
  };

  return (
    <UserContext.Provider value={{ followUser, unFollowUser, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default function useUsers() {
  return useContext(UserContext);
}
