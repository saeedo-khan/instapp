import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext } from "react";
import toast from "react-hot-toast";
import { IPost } from "../../interfaces/types";
import { useSessionStorage } from "../../hooks/useSessionStorage";

interface PostContextProps {
  children: React.ReactNode;
}

interface IPosts {
  Post: IPost[];
}

export interface PostContext {
  addPost: (caption: String, images: String) => void;
  removePost: (id: String) => void;
  likePost: (postId: String) => void;
  followUser: (followerId: string, userId: string) => void;
  addComment: (postId: String, reply: String) => void;
}

const PostContext = createContext({} as PostContext);

export const PostContextProvider: React.FC<PostContextProps> = ({
  children,
}) => {
  const [userData, setUserData] = useSessionStorage("userData", "");

  const router = useRouter();

  const addPost = (caption: String, images: String) => {
    const postData = {
      caption,
      images,
      authorEmail: userData.email,
    };

    axios
      .post("http://localhost:3000/posts", postData)
      .then((res) => {
        console.log(res.data);
        router.replace("/");
      })
      .catch((err) => {
        toast.error("Failed Upload Image");
        router.reload();
      });
  };

  const removePost = (id: String) => {
    axios.delete(`http://localhost:3000/posts/${id}`).then((res) => {
      router.push("/");
    });
  };

  const followUser = (followerId: string) => {
    const follow = {
      userId: userData.id,
      followerId,
    };
    axios.post(`http://localhost:3000/users/follow`, follow).then((res) => {
      console.log(res.data);
    });
  };

  const likePost = (postId: String) => {
    const like = {
      postId,
      userId: userData.id,
      isLiked: true,
    };
    axios.post(`http://localhost:3000/posts/like`, like).then((res) => {
      toast.success(`Like post  successfully`, {
        position: "top-center",
      });
      console.log(res.data);
    });
  };

  const addComment = (postId: String, reply: String) => {
    const commentData = {
      postId,
      reply,
    };
    axios
      .post(`http://localhost:3000/posts/comment`, commentData)
      .then((res) => {
        toast.success(`Comment added successfully, refresh page`),
          {
            position: "top-center",
            duration: 4000,
          };
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PostContext.Provider
      value={{ addPost, removePost, likePost, followUser, addComment }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default function usePost() {
  return useContext(PostContext);
}
