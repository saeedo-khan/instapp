import { List } from "@mui/material";
import axios from "axios";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import UsersList from "../../components/usersList/UsersList";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import { IAuthor } from "../../interfaces/types";

interface ISuggestUsers {}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get("http://localhost:3000/users");

  return {
    props: {
      allUsers: res.data,
    },
  };
};

const SuggestUsers = ({
  allUsers,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [userData] = useSessionStorage("userData", "");
  const filterUsers = allUsers.filter((user: IAuthor) => {
    if (user.id === userData.id) {
      return false;
    }
    return true;
  });

  return (
    <List sx={{ width: "40%", margin: "0 auto" }}>
      {filterUsers.map((user: IAuthor) => (
        <UsersList data={user} key={user.id} />
      ))}
    </List>
  );
};

export default SuggestUsers;
