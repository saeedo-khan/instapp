import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { ITag } from "../../interfaces/types";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface PostContextProps {
  children: React.ReactNode;
}

interface IAddRemoveLike {
  type: string;
  message: string;
  data: {
    isLiked: boolean;
  };
}

export interface PostContext {
  addPost: (caption: String, images: String) => void;
  removePost: (id: String) => void;
  addRemoveLike: (postId: String) => void;
  addTagUser: (tagData: ITag) => void;
}

const PostContext = createContext({} as PostContext);

export const PostContextProvider: React.FC<PostContextProps> = ({
  children,
}) => {
  const [userData] = useLocalStorage("userData", "");

  const router = useRouter();

  const addPost = (content: String, mediaFile: String) => {
    const postData = {
      content,
      mediaFile,
      email: userData.email,
    };
    axios
      .post("http://localhost:3000/api/posts", postData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        toast.error("Failed Upload Image");
      });
  };

  const removePost = (id: String) => {
    axios
      .delete(`http://localhost:3000/api/posts/${id}`)
      .then((res) => {
        router.push(`/user/${userData.name}`);
      })
      .catch((err) => console.log(err));
  };

  const addRemoveLike = (postId: String) => {
    const like = {
      postId,
      userId: userData.id,
    };
    axios
      .patch<IAddRemoveLike>(
        `http://localhost:3000/api/posts/${postId}/add_remove_like`,
        like,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  };

  const addTagUser = (tagData: ITag) => {
    axios
      .post(`http://localhost:3000/api/posts/add_tag`, tagData, {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <PostContext.Provider
      value={{ addPost, removePost, addRemoveLike, addTagUser }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default function usePost() {
  return useContext(PostContext);
}
