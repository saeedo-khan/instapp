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
import { useSessionStorage } from "../../hooks/useSessionStorage";

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

  const { likePost, addComment } = usePost();
  const [expandComment, setExpandComment] = useState<boolean>(false);
  const [expanded, setExpanded] = React.useState(false);
  const [checkedIcon, setChecked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const [userData, setUserData] = useSessionStorage("userData", "");

  useEffect(() => {
    if (checkedIcon) {
      likePost(post.id);
    }
  }, [checkedIcon]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = () => {
    addComment(post.id, comment);
    setComment("");
  };

  console.log(post.author.isFollower);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <Box className={classes.wrap_post}>
      <Card
        sx={{
          maxWidth: 700,
        }}
      >
        <CardHeader
          avatar={
            <Link href={`/user/${post.author.name}`}>
              <Avatar
                sx={{ bgcolor: red[500], cursor: "pointer" }}
                aria-label="recipe"
              >
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
            src={`https://res.cloudinary.com/dgpppa0f1/image/upload/v1661726614/${post.images[0]}`}
            layout="fill"
            objectFit="cover"
          />
        </Box>
        <CardContent>
          <Typography variant="h6">{post.caption}</Typography>
        </CardContent>

        <CardActions disableSpacing>
          <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: red[400] }} />}
            onChange={() => setChecked(!checkedIcon)}
          />
          <IconButton
            aria-label="add to favorites"
            onClick={() => setExpandComment(!expandComment)}
          >
            <CommentIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        {/* comments */}

        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
          className={classes.collapse}
        >
          <Divider />

          {post.comments.map((comment) => (
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
                  <Avatar sx={{ width: 24, height: 24 }}>
                    {userData.name?.charAt(0)}
                  </Avatar>
                  <Typography ml={1} fontSize={14}>
                    {userData.name}
                  </Typography>
                </Box>
                <Box flexBasis={"45%"} display="flex" justifyContent="flex-end">
                  {/* color="rgba(255,255,255,0.8)" */}
                  <Typography>{convertDate(post.createdAt)}</Typography>
                </Box>
              </Box>
              <Box maxWidth={"95%"}>
                <Typography ml={5} fontSize={14}>
                  {comment.reply}
                </Typography>
              </Box>
            </Stack>
          ))}

          <Divider />
        </Collapse>
        {expandComment && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
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
        )}
      </Card>
    </Box>
  );
};

export default Post;
