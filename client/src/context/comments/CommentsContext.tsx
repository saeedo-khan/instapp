import axios from "axios";
import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface CommentsContextProps {
  children: React.ReactNode;
}

interface ICommentContext {
  addComment: (postId: String, reply: String) => void;
  deleteComment: (commentId: string) => void;
  fetchComment: (postId: string) => void;
}

const CommentsContext = createContext({} as ICommentContext);

export const CommentsProvider: React.FC<CommentsContextProps> = ({
  children,
}) => {
  const [userData] = useLocalStorage("userData", "");

  const addComment = (postId: String, content: String) => {
    const commentData = {
      content,
      userId: userData.id,
    };

    axios
      .post(`http://localhost:3000/api/comments/${postId}`, commentData, {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteComment = (commentId: string) => {
    axios
      .delete(`http://localhost:3000/api/comments/${commentId}`, {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const fetchComment = (postId: string) => {
    axios.get(`http://localhost:3000/api/comments/${postId}`);
  };

  return (
    <CommentsContext.Provider
      value={{ addComment, deleteComment, fetchComment }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export default function useComments() {
  return useContext(CommentsContext);
}
