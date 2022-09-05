import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext } from "react";
import { IPost } from "../../interfaces/types";

interface PostContextProps {
  children: React.ReactNode;
}

interface IPosts {
  Post: IPost[];
}

export interface PostContext {
  addPost: (caption: String, images: String) => void;
  removePost: (id: String) => void;
}

const PostContext = createContext({} as PostContext);

export const PostContextProvider: React.FC<PostContextProps> = ({
  children,
}) => {
  const router = useRouter();

  const addPost = (caption: String, images: String) => {
    const authorEmail = "saeedx@hotmail.com";
    const data = {
      caption,
      images,
      authorEmail,
    };

    axios.post("http://localhost:3000/posts", data).then((res) => {
      console.log(res.data);
      router.reload();
    });
  };

  const removePost = (id: String) => {
    axios.delete(`http://localhost:3000/posts/${id}`).then((res) => {
      router.reload();
    });
  };

  return (
    <PostContext.Provider value={{ addPost, removePost }}>
      {children}
    </PostContext.Provider>
  );
};

export default function usePost() {
  return useContext(PostContext);
}
