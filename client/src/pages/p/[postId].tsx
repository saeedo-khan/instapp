import React from "react";
import { useRouter } from "next/router";
import ProfilePost from "../../components/profilePost/ProfilePost";
import useSWR from "swr";
import WithAuth from "../../HOCs/WithAuth";

interface IpProps {}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PostId: React.FC<IpProps> = () => {
  const router = useRouter();
  const { postId } = router.query;

  const baseUrl = "http://localhost:3000/api/posts/" + postId;

  const { data } = useSWR(baseUrl, fetcher);

  return <ProfilePost post={data} />;
};

export default WithAuth(PostId);
