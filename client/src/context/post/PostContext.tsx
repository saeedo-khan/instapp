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
  dislike: (likeId: number) => void;
  // followUser: (followerId: string, userId: string) => void;
  addComment: (postId: String, reply: String) => void;
}

const PostContext = createContext({} as PostContext);

export const PostContextProvider: React.FC<PostContextProps> = ({
  children,
}) => {
  const [userData] = useSessionStorage("userData", "");

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
    axios
      .delete(`http://localhost:3000/posts/${id}`)
      .then((res) => {
        router.push(`/user/${userData.name}`);
      })
      .catch((err) => console.log(err));
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
    });
  };

  const dislike = (likeId: number) => {
    axios
      .delete(`http://localhost:3000/posts/like/${likeId}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
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
      value={{ addPost, removePost, likePost, dislike, addComment }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default function usePost() {
  return useContext(PostContext);
}
