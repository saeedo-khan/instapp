import axios from "axios";
import React, { createContext, useContext } from "react";
import toast from "react-hot-toast";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface UsersContextProps {
  children: React.ReactNode;
}

interface IUsersData {
  updateUserData: (changeData: IUpdateUsers) => void;
  uploadProfilePic: ({ pic, userId }: { pic: string; userId: string }) => void;
  deleteUser: () => void;
  changePassword: (currentPass: string, newPass: string) => void;
  addRmoveFollow: (followerId: string | undefined) => void;
}

interface IUpdateUsers {
  userId: string;
  username: string;
  email: string;
  gender: string;
  biography?: string;
}

const UserContext = createContext({} as IUsersData);

export const UsersContextProvider: React.FC<UsersContextProps> = ({
  children,
}) => {
  const [userData] = useLocalStorage("userData", "");

  const updateUserData = ({
    username,
    email,
    gender,
    biography,
    userId,
  }: IUpdateUsers) => {
    const userUpdate = {
      id: userId,
      name: username,
      email,
      gender,
      biography,
    };
    axios
      .patch(`https://instapp.onrender.com/api/users/details`, userUpdate, {
        withCredentials: true,
      })
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

  const uploadProfilePic = ({
    pic,
    userId,
  }: {
    pic: string;
    userId: string;
  }) => {
    axios
      .patch(
        `https://instapp.onrender.com/api/users/upload_profile_pic`,
        { profileImage: pic, currentUser: userId },
        {
          withCredentials: true,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const changePassword = (currentPass: string, newPass: string) => {
    const changePass = {
      currentPass,
      newPass,
      currentUser: userData.id,
    };
    axios
      .patch(
        `https://instapp.onrender.com/api/users/changePassword`,
        changePass,
        {
          withCredentials: true,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const deleteUser = () => {
    axios
      .delete(`https://instapp.onrender.com/api/users/${userData.id}`, {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const addRmoveFollow = (followerId: string | undefined) => {
    axios
      .patch(
        `https://instapp.onrender.com/api/users/${followerId}/add_remove_follow`,
        {
          userId: userData.id,
        }
      )
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

  return (
    <UserContext.Provider
      value={{
        addRmoveFollow,
        updateUserData,
        uploadProfilePic,
        deleteUser,
        changePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default function useUsers() {
  return useContext(UserContext);
}
