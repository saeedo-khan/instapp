import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { red } from "@mui/material/colors";
import Modal from "@mui/material/Modal";
// icons
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ReplyIcon from "@mui/icons-material/Reply";
import { createStyles, makeStyles } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { IPost } from "../../interfaces/types";
import { convertDate } from "../../../utils/convertDate";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import useComments from "../../context/comments/CommentsContext";

interface ProfilePostProps {
  post: IPost | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profile_post: {
      lineHeight: 5,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    container: {
      width: 700,
      margin: "0 auto",
      [theme.breakpoints.down("sm")]: {
        width: 600,
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    imgWrap: {
      position: "relative",
      width: 700,
      height: 700,
      [theme.breakpoints.down("sm")]: {
        width: 600,
        height: 600,
      },
      [theme.breakpoints.down("xs")]: {
        width: "100vw",
        height: "100vw",
      },
    },
    modalContainer: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
    wrapRemovePost: {
      textAlign: "center",
      backgroundColor: "rgba(18,18,18,.9)",
      padding: theme.spacing(5),
      borderRadius: 5,
      display: "block",
      width: "100%",
    },
    comments_section: {
      width: 700,
      backgroundColro: "rgba(0,0,0,0.2)",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
      margin: "0 auto",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
  })
);

const ProfilePost: React.FC<ProfilePostProps> = ({ post }) => {
  const classes = useStyles();

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [userData] = useLocalStorage("userData", "");

  const [expandComment, setExpandComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const handleExpandClick = () => {
    setExpandComment(!expandComment);
  };

  const handleComment = () => {
    addComment({ postId: post?.id, content: comment });
    handleExpandClick();
    setComment("");
  };

  const { addComment } = useComments();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(post);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modalContainer}>
          <Box className={classes.wrapRemovePost}>
            <Typography mb={2}>Are you want remove post ?</Typography>
            <Button variant="contained" color="warning" onClick={handleClose}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>

      <Box className={classes.profile_post}>
        <Box className={classes.container}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box ml={1}>
              <Link href={`/user/${post?.author.name}`} passHref>
                <Avatar
                  src={`${post?.author.profile_pic_url}`}
                  sx={{ cursor: "pointer" }}
                >
                  {post?.author.name.charAt(0)}
                </Avatar>
              </Link>
            </Box>
            <Box>{post?.author.name}</Box>
          </Stack>
          <Box className={classes.imgWrap}>
            <Image
              src={`${post?.media[0].mediaFile}`}
              alt={`${post?.content}`}
              layout="fill"
              objectFit="cover"
            />
          </Box>

          <Stack direction="row" spacing={1}>
            <Checkbox
              {...label}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: red[400] }} />}
            />
            <IconButton
              aria-label="add to favorites"
              onClick={handleExpandClick}
            >
              <CommentIcon />
            </IconButton>

            {userData.id === post?.author.id && (
              <IconButton aria-label="remove post" onClick={handleOpen}>
                <DeleteIcon />
              </IconButton>
            )}
          </Stack>

          {expandComment && (
            <Box display="flex" width="100%">
              <Box flex={2} alignItems="center" display="flex">
                <TextField
                  variant="standard"
                  type="text"
                  placeholder="Write comment..."
                  fullWidth
                  onChange={(e) => setComment(e.target.value)}
                />
              </Box>
              <Box>
                <IconButton onClick={handleComment}>
                  <ReplyIcon />
                </IconButton>
              </Box>
            </Box>
          )}

          <Box className={classes.comments_section}>
            {post?.comments.map((comment) => (
              <Stack
                direction="column"
                justifyContent={"center"}
                paddingY={2}
                key={comment.id}
                boxShadow={1}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <Box
                    component={"span"}
                    paddingY={1}
                    pl={1}
                    display="flex"
                    alignItems="center"
                    flexBasis={"50%"}
                  >
                    <Avatar src={`${comment.User.profile_pic_url}`} alt="thumb">
                      {comment.User.name?.charAt(0)}
                    </Avatar>
                    <Typography ml={1} fontSize={14}>
                      {comment.User.name}
                    </Typography>
                  </Box>
                  <Box
                    flexBasis={"45%"}
                    display="flex"
                    justifyContent="flex-end"
                  >
                    {/* color="rgba(255,255,255,0.8)" */}
                    <Typography>{convertDate(post.createdAt)}</Typography>
                  </Box>
                </Box>
                <Box maxWidth={"95%"}>
                  <Typography ml={5} fontSize={14}>
                    {comment.content}
                  </Typography>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Stack>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfilePost;
