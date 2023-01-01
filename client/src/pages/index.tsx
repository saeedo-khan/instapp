import React from "react";
import type { NextPage } from "next";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Post from "../components/posts/Post";
import { IPost } from "../interfaces/types";
import useSWR from "swr";
import WithAuth from "../HOCs/WithAuth";
import Sidebar from "../components/sidebar/Sidebar";

interface IDataPost {
  type: string;
  message: string;
  data: {
    posts: IPost[];
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// export const getStaticProps: GetStaticProps = async () => {
//   const res = await axios("http://localhost:3000/api/posts/all_posts", {
//     withCredentials: true,
//   });

//   return {
//     props: {
//       // SWR will use fallback only if data updated otherwise will use cache data
//       fallback: {
//         "/all_posts": res.data.data,
//       },
//     },
//   };
// };

const getPost = () => {};

const Home: NextPage = () => {
  const { data } = useSWR<IDataPost, any[]>(
    "https://instapp.onrender.com/api/posts/all_posts",
    fetcher
  );

  const theme = useTheme();
  const med = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box display={"flex"} justifyContent="center" width="100%">
      <Box
        flex={4}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        {data?.data.posts.map((post: IPost, idx: number) => (
          <Post post={post} key={post.id} idx={idx} />
        ))}
      </Box>

      {!med ? (
        <Box sx={{ flex: 1, position: "sticky" }}>
          <Sidebar />
        </Box>
      ) : null}
    </Box>
  );

  // return <SWRConfig value={{ fallback }}>{getPost()}</SWRConfig>;
};

export default WithAuth(Home);
