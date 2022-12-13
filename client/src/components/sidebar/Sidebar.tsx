import {
  List,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { RiUserFill } from "react-icons/ri";
import { TiUserAdd } from "react-icons/ti";
import WithAuth from "../../HOCs/WithAuth";
import useUsers from "../../context/users/UsersContext";
import { useTheme } from "next-themes";

interface suggestionProps {
  type: string;
  message: string;
  data: Suggestion[];
}
interface Suggestion {
  id: string;
  name: string;
  profile_pic_url: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Sidebar = () => {
  const { addRmoveFollow } = useUsers();
  const [userData] = useLocalStorage("userData", "");
  const { data, error } = useSWR<suggestionProps, any>(
    `http://localhost:3000/api/users/suggest_users/${userData.id}`,
    fetcher
  );

  return (
    <>
      <Typography>suggestions users for you : </Typography>
      <List>
        {data?.data?.map((user: Suggestion) => (
          <ListItem
            key={user.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="follow"
                size="medium"
                onClick={() => addRmoveFollow(user.id)}
              >
                <TiUserAdd />
              </IconButton>
            }
          >
            <Link href={`/user/${user.name}`}>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt={user.profile_pic_url} />
                </ListItemAvatar>
                <ListItemText id="labelId" primary={user.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
