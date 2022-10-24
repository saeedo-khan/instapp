import React from "react";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { IoPersonAdd } from "react-icons/io5";
import { IAuthor } from "../../interfaces/types";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import Link from "next/link";
// IoPersonRemove ---unfollow user
interface UsersListProps {
  data: IAuthor;
}

const UsersList: React.FC<UsersListProps> = ({ data }) => {
  const [userData] = useSessionStorage("userData", "");

  return (
    <>
      <Typography>Add new friends: </Typography>
      <ListItem>
        <Link href={`/user/${data.name}`}>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar alt={data.thumbUrl} />
            </ListItemAvatar>
            <ListItemText id="labelId" primary={data.name} />
          </ListItemButton>
        </Link>
      </ListItem>
    </>
  );
};

export default UsersList;
