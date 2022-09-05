import React, { useEffect, useRef, useState } from "react";
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
  CardMedia,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReplyIcon from "@mui/icons-material/Reply";

import Image from "next/image";
import useStyles from "./Post.styles";
import { IPost } from "../../interfaces/types";

import usePost from "../../context/post/PostContext";
import { red } from "@mui/material/colors";
import { Divider } from "@material-ui/core";
import { convertDate } from "../../../utils/convertDate";

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

const Post: React.FC<PostProps> = ({ post, idx }) => {
  const classes = useStyles(useStyles);

  const { removePost } = usePost();

  const [expandComment, setExpandComment] = useState<boolean>(false);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <Box className={classes.wrap_post}>
      <Card sx={{ maxWidth: 700 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title="Mohammed Khalid"
          subheader={`${convertDate(post.createdAt)}`}
        />
        <Box className={classes.image_wrap}>
          <Image
            src={`https://res.cloudinary.com/dgpppa0f1/image/upload/v1661726614/${post.images[0]}`}
            layout="fill"
            objectFit="cover"
          />
        </Box>
        <CardContent>
          <Typography variant="h6" color="black">
            {post.caption}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: red[400] }} />}
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
          <Stack direction="column" justifyContent={"center"} paddingY={2}>
            <Box display={"flex"} alignItems={"center"}>
              <Box
                component={"span"}
                paddingY={1}
                pl={1}
                display="flex"
                alignItems="center"
                flexBasis={"50%"}
              >
                <Avatar sx={{ width: 24, height: 24 }}>R</Avatar>
                <Typography ml={1} fontSize={14}>
                  isaeedx
                </Typography>
              </Box>
              <Box flexBasis={"45%"} display="flex" justifyContent="flex-end">
                <Typography color="rgba(0,0,0,0.5)">1 days ago</Typography>
              </Box>
            </Box>
            <Box maxWidth={"95%"}>
              <Typography ml={5} color={"rgba(0,0,0,0.7)"} fontSize={14}>
                I like how ur image looks like I like how ur image looks like I
                like how ur image looks like I like how ur image looks like I
                like how ur image looks like I like how ur image looks like I
                like how ur image looks like I like how ur image looks like I
                like how ur image looks like I like how ur image looks like
              </Typography>
            </Box>
          </Stack>

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
              />
            </Box>
            <Box>
              <IconButton>
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
