import React, { useReducer, useState } from "react";
import Button from "@mui/material/Button";
import { Box, Typography, Input } from "@mui/material";
import useStyles from "./NewPost.styles";
import {
  CircularProgress,
  InputLabel,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import usePost from "../../context/post/PostContext";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

//  Reusable clickoutside hook

interface NewPostProps {}

interface INewPost {
  content: string;
  file: undefined | string;
  fileName: string;
  loading: boolean;
}

const NewPost: React.FC<NewPostProps> = ({}) => {
  const classes = useStyles(useStyles);

  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [filename, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const { addPost } = usePost();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    setFile(fileList[0]);

    const formData = new FormData();
    formData.append("post", fileList[0]);
    setLoading(true);
    fetch("http://localhost:3000/upload_files", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setFileName(data.file);
        setLoading(false);
        setFile(undefined);
      })
      .catch((err) => {
        toast.error("Failed to Upload Image");
      });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    if (filename && content) {
      addPost(content, filename);
    }
  };

  return (
    <Box component={"form"} className={classes.newPost}>
      <Box className={classes.wrap_post}>
        <Box className={classes.top_nav_post}>
          <Box className={classes.text_nav_post}>
            <Typography className={classes.text_nav} component="h2">
              Create New Post
            </Typography>
          </Box>

          <Box sx={{ mr: 1 }}>
            <Button
              variant="contained"
              className={classes.btn_post}
              onClick={handleSubmit}
              disabled={Boolean(
                filename.length && content.length !== 0 ? false : true
              )}
            >
              Post
            </Button>
          </Box>
        </Box>

        <Box className={classes.newpost_body}>
          {loading && <CircularProgress color="primary" />}

          <Box className={classes.files_detail}>
            <Box mt={1} mb={1}>
              <Typography className={classes.addFile_text}>
                Add Photo or Video Here
              </Typography>
            </Box>

            <Input
              type="file"
              placeholder="upload image or video"
              className={classes.file_input}
              onChange={handleChange}
            />
          </Box>

          <Box
            sx={{
              textAlign: "center",
              width: "80%",
              margin: "0 auto",
              marginTop: "1rem",
            }}
          >
            <TextareaAutosize
              placeholder="Write a caption.."
              onChange={(e) => setContent(e.target.value)}
              name="content"
              value={content}
              className={classes.text_caption}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewPost;
