import { createStyles, Grid, makeStyles } from "@material-ui/core";
import { Box, Theme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IPost } from "../../interfaces/types";

interface MiniProfileImageProps {
  post: IPost;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    post_content: {
      position: "relative",
      width: 300,
      height: 300,
      margin: "0 auto",
      cursor: "pointer",
      zIndex: 1,
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        width: 240,
        height: 240,
      },
      [theme.breakpoints.down("xs")]: {
        width: "31vw",
        height: "31vw",
      },
    },
    overlayEffect: {
      zIndex: 10,
      position: "relative",
      display: "block",
      width: "100%",
      height: "100%",
      transition: theme.transitions.create(["background-color"]),
      "&:hover": {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(1,1,1,0.3)",
        zIndex: 100,
      },
    },
  })
);

const MiniProfileImage: React.FC<MiniProfileImageProps> = ({ post }) => {
  const classes = useStyles();
  return (
    <Grid item xs={4} key={post.id}>
      <Link
        href={`/p/[postId]?postId=${post.id}`}
        as={`/p/${post.id}`}
        passHref
      >
        <Box className={classes.post_content}>
          <Box className={classes.overlayEffect}></Box>
          <Image
            src={`https://res.cloudinary.com/dgpppa0f1/image/upload/v1661726614/${post.images[0]}`}
            alt={`${post.caption}`}
            layout="fill"
            objectFit="cover"
          />
        </Box>
      </Link>
    </Grid>
  );
};

export default MiniProfileImage;
