import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box, Typography, Input } from "@mui/material";
import useStyles from "./NewPost.styles";
import { CircularProgress, TextareaAutosize } from "@material-ui/core";
import usePost from "../../context/post/PostContext";

//  Reusable clickoutside hook

interface NewPostProps {
  modelStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IUploadFile {
  file: {
    encoding: string;
    fieldName: string;
    filename: string;
    mimetype: string;
    originalName: string;
    path: string;
    size: number;
  };
}

const NewPost: React.FC<NewPostProps> = ({ modelStatus }) => {
  const classes = useStyles(useStyles);

  const [content, setContent] = useState<string>("");
  // const [fileInputState, setFileInputState] = useState<File | undefined>(
  //   undefined
  // );
  const [selectedFile, setSelectedFile] = useState<string | null>();
  const [previewSource, setPreviewSource] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const { addPost } = usePost();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    previewFile(fileList);
  };

  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = () => {
      setPreviewSource(reader.result);
    };

    const formData = new FormData();
    formData.append("post", file[0]);
    setLoading(true);
    fetch("http://localhost:3000/upload_files", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSelectedFile(data.path);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    if (selectedFile && content) {
      addPost(content, selectedFile);
      modelStatus(false);
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
                selectedFile?.length && content.length !== 0 ? false : true
              )}
            >
              Post
            </Button>
          </Box>
        </Box>

        <Box className={classes.newpost_body}>
          {loading && <CircularProgress color="primary" />}

          <Box className={classes.files_detail}>
            {!selectedFile ? (
              <Box mt={1} mb={1}>
                <Typography className={classes.addFile_text}>
                  Add Photo or Video Here
                </Typography>
              </Box>
            ) : null}

            <Box sx={{ position: "relative", width: 300, height: 400 }}>
              {previewSource ? (
                <img
                  src={previewSource}
                  alt="chosen"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : null}
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
