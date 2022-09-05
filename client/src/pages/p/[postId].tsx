import { Box } from "@mui/material";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ProfilePost from "../../components/profilePost/ProfilePost";
import Modal from "react-modal";

interface IpProps {}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios(`http://localhost:3000/posts`);
  const paths = res.data.map((post: any) => {
    return {
      params: {
        postId: post.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3000/posts/${params?.postId}`);
  const data = await res.json();
  return {
    props: {
      profilePost: data,
    },
  };
};

const PostId: React.FC<IpProps> = ({
  profilePost,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const { postId } = router.query;

  return (
    <ProfilePost post={profilePost} id={postId} pathname={router.pathname} />
  );
};

export default PostId;
