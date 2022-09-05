import React from "react";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Box } from "@mui/material";
import Post from "../components/posts/Post";
import axios from "axios";

import { IPost } from "../interfaces/types";

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get("http://localhost:3000/posts");

  return {
    props: {
      instaPosts: res.data,
    },
  };
};

const Home: NextPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const data = props.instaPosts.reverse();

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto" }}>
      {data.map((post: IPost, idx: number) => (
        <Post post={post} key={post.id} idx={idx} />
      ))}
    </Box>
  );
};

export default Home;
