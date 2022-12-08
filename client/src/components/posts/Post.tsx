import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Stack,
  TextField,
  Collapse,
  IconButtonProps,
  styled,
  Checkbox,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReplyIcon from "@mui/icons-material/Reply";

import Image from "next/image";
import useStyles from "./Post.styles";
import { IPost } from "../../interfaces/types";

import { red } from "@mui/material/colors";
import { Divider } from "@material-ui/core";
import { convertDate } from "../../../utils/convertDate";
import Link from "next/link";
import usePost from "../../context/post/PostContext";
import { Toaster } from "react-hot-toast";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import useComments from "../../context/comments/CommentsContext";

interface PostProps {
  post: IPost;
  idx: number;
}

interface ValidTarget {
  contains(target: EventTarget | null): any;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Post: React.FC<PostProps> = ({ post }) => {
  const classes = useStyles(useStyles);

  const { addRemoveLike } = usePost();
  const { addComment } = useComments();

  const [expandComment, setExpandComment] = useState<boolean>(false);
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = useState<string>("");

  const [userData] = useLocalStorage("userData", "");

  const handleExpandClick = async () => {
    setExpanded(!expanded);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    addComment(post.id, comment);
    setComment("");
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const check = post.likes.find((like) => like.id === userData.id);

  return (
    <Box className={classes.wrap_post}>
      <Toaster />
      <Card>
        <CardHeader
          avatar={
            <Link href={`/user/${post.author.name}`} passHref>
              <Avatar src={`${post.author.profile_pic_url}`} alt="thumbnails">
                {post.author.name.charAt(0)}
              </Avatar>
            </Link>
          }
          title={post.author.name}
          subheader={
            <Typography className={classes.subColor}>
              {convertDate(post.createdAt)}
            </Typography>
          }
        />
        <Box className={classes.image_wrap}>
          <Image
            src={`${post.media[0].mediaFile}`}
            layout="fill"
            objectFit="cover"
          />
        </Box>
        <CardContent>
          <Typography variant="h6">{post.content}</Typography>
        </CardContent>

        <CardActions disableSpacing>
          <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: red[400] }} />}
            checked={check ? true : false}
            onClick={() => addRemoveLike(post.id)}
          />

          <IconButton
            aria-label="add to favorites"
            onClick={() => setExpandComment(!expandComment)}
          >
            <CommentIcon />
          </IconButton>
          {post.comments?.length !== 0 ? (
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          ) : null}
        </CardActions>

        {/* comments */}

        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
          className={classes.collapse}
        >
          <Divider />
          {post.comments?.map((comment) => (
            <Stack
              direction="column"
              justifyContent={"center"}
              paddingY={2}
              key={comment.id}
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
                  <Avatar
                    src={`${post.author.profile_pic_url}`}
                    alt="thumb"
                    sx={{ width: 24, height: 24 }}
                  >
                    {post.author.name.charAt(0)}
                  </Avatar>
                  <Typography ml={1} fontSize={14}>
                    {userData.name}
                  </Typography>
                </Box>
                <Box flexBasis={"45%"} display="flex" justifyContent="flex-end">
                  <Typography>{convertDate(post.createdAt)}</Typography>
                </Box>
              </Box>
              <Box maxWidth={"95%"}>
                <Typography ml={5} fontSize={14}>
                  {comment.content}
                </Typography>
              </Box>
            </Stack>
          ))}

          <Divider />
        </Collapse>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box flex={3}>
            <TextField
              type="text"
              name="comment"
              placeholder="Write comment .."
              fullWidth
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
          </Box>
          <Box>
            <IconButton onClick={handleSubmit}>
              <ReplyIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Post;