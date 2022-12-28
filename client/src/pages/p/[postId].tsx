import React from "react";
import { useRouter } from "next/router";
import ProfilePost from "../../components/profilePost/ProfilePost";
import useSWR from "swr";
import WithAuth from "../../HOCs/WithAuth";
import axios from "axios";
import { IPost } from "../../interfaces/types";

interface IPostDetails {
  type: string;
  message: string;
  data: Data;
}

interface Data {
  post: IPost[];
}

export const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const PostId: React.FC = () => {
  const router = useRouter();
  const { postId } = router.query;

  const baseUrl = "https://instapp.onrender.com/api/posts/" + postId;

  const { data, error } = useSWR<IPostDetails, any>(baseUrl, fetcher);

  return <ProfilePost post={data?.data.post[0]} />;
};

export default WithAuth(PostId);
