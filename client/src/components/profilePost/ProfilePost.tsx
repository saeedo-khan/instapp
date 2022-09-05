import React, { useState } from "react";
import {
  Avatar,
  Box,
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Theme,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { red } from "@mui/material/colors";

// icons
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ReplyIcon from "@mui/icons-material/Reply";
import { createStyles, makeStyles } from "@material-ui/core";

interface ProfilePostProps {
  post: any;
  id: any;
  pathname: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profilePost: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      lineHeight: 5,
      width: "100%",
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
  })
);

const ProfilePost: React.FC<ProfilePostProps> = ({ post, id, pathname }) => {
  const classes = useStyles();

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [expandComment, setExpandComment] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpandComment(!expandComment);
  };

  return (
    <Box className={classes.profilePost}>
      <Box className={classes.container}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box ml={1}>
            <Link href={`/user/${post.author.name}`} passHref>
              <Avatar sx={{ cursor: "pointer" }}>S</Avatar>
            </Link>
          </Box>
          <Box>
            <Link href={`/user/${post.author.name}`} passHref>
              {post.author.name}
            </Link>
          </Box>
        </Stack>
        <Box className={classes.imgWrap}>
          <Image
            src={`https://res.cloudinary.com/dgpppa0f1/image/upload/v1661726614/${post.images[0]}`}
            alt={post.caption}
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
          <IconButton aria-label="add to favorites" onClick={handleExpandClick}>
            <CommentIcon />
          </IconButton>
        </Stack>

        {expandComment && (
          <Box display="flex" width="100%">
            <Box flex={2} alignItems="center" display="flex">
              <TextField
                variant="standard"
                type="text"
                placeholder="Write comment..."
                fullWidth
              />
            </Box>
            <Box>
              <IconButton>
                <ReplyIcon onClick={handleExpandClick} />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePost;
