import React from "react";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { IUser } from "../../interfaces/types";
import Link from "next/link";
import { suggestionProps } from "../sidebar/Sidebar";
// IoPersonRemove ---unfollow user
interface UsersListProps {
  user: IUser;
}

const UsersList: React.FC<UsersListProps> = ({ user }) => {
  console.log("Hell yaah");
  return <div></div>;
};

export default UsersList;
