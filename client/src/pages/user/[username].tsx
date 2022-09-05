import React, { useState } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Theme, IconButton, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { RiSettings3Line } from "react-icons/ri";
import Modal from "react-modal";

import image1 from "../../assets/6f03eb85463c.jpg";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import ProfilePost from "../../components/profilePost/ProfilePost";

interface profileProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profile: {
      width: "100%",
    },
    container_profile: {
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "column",
      justifyContent: "center",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
      maxWidth: "60%",
      margin: "0 auto",
    },
    top_profile: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(1),
    },
    profile_img_wrap: {
      width: 200,
      height: 200,
      position: "relative",
      [theme.breakpoints.down("md")]: {
        width: 150,
        height: 150,
      },
    },
    thumb_profile: {
      borderRadius: "50%",
    },
    profile_setting: {
      display: "flex",
      justifyContent: "center",
      marginBottom: theme.spacing(1),
    },
    profile_username: {
      marginRight: theme.spacing(1),
      fontSize: 25,
      fontFamily: "Roboto",
      [theme.breakpoints.down("xs")]: {
        fontSize: 20,
      },
    },
    edit_profile: {
      width: "100%",
      display: "block",
    },
    edit_btn: {
      width: 260,
      backgroundColor: "transparent",
      fontSize: 14,
      textTransform: "capitalize",
      fontFamily: "Roboto, sans-serif",
      [theme.breakpoints.down("xs")]: {
        width: 140,
      },
    },
    bio: {
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(2),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "50%",
      [theme.breakpoints.down("xs")]: {
        width: "90%",
      },
    },
    bio_text: {
      fontSize: 14,
    },
    line: {
      width: "100%",
      height: 1,
      backgroundColor: "rgba(1,1,1,0.2)",
      display: "block",
    },
    stats: {
      maxWidth: "900px",
      margin: "0 auto",
    },
    stats_profile: {
      textAlign: "center",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    count_stats: {
      fontSize: 16,
    },
    wrap_stats: {
      cursor: "pointer",
      display: "inline-block",
    },
    stats_text: {
      color: "rgba(1,1,1,0.7)",
      fontSize: 14,
      marginTop: theme.spacing(1),
    },
    posts: {
      flexGrow: 1,
    },
    posts_contain: {
      maxWidth: "1000px",
      margin: "0 auto",
      marginTop: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        maxWidth: "780px",
      },
    },
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

Modal.setAppElement("#__next");

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios("http://localhost:3000/users");

  const paths = res.data.map((user: any) => {
    return {
      params: {
        username: user.name.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3000/users/${params?.username}`);
  const data = await res.json();

  return {
    props: {
      instaUser: data,
    },
  };
};

const Profile: React.FC<profileProps> = ({
  instaUser,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const isMid = useMediaQuery("sm");
  const router = useRouter();

  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(!open);
    router.push(`/user/${instaUser.name}`);
  };

  return (
    <Box className={classes.profile}>
      <Box className={classes.container_profile}>
        <Box className={classes.top_profile}>
          <Box className={classes.profile_img_wrap}>
            <Image
              src={image1}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className={classes.thumb_profile}
            />
          </Box>

          <Box display="flex" flexDirection="column">
            <Box display="flex">
              <Typography className={classes.profile_username}>
                {instaUser.name}
              </Typography>
              <IconButton size="large">
                <RiSettings3Line />
              </IconButton>
            </Box>

            <Box flex={1}>
              <Button
                variant="contained"
                className={classes.edit_btn}
                fullWidth
              >
                Edit Profile
              </Button>
            </Box>
          </Box>
        </Box>

        <Box className={classes.bio}>
          <Typography className={classes.bio_text}>
            {!instaUser.statusMessage && null}
          </Typography>
        </Box>
      </Box>

      <Box className={classes.line}></Box>

      {/* profile stats */}
      <Box className={classes.stats}>
        <Grid container className={classes.stats_profile}>
          <Grid item xs={4}>
            <Box className={classes.count_stats}>
              {instaUser.writtenPosts.length}
            </Box>
            <Typography className={classes.stats_text}>post</Typography>
          </Grid>
          <Grid item xs={4}>
            <Box className={classes.wrap_stats}>
              <Box className={classes.stats}>89</Box>
              <Typography className={classes.stats_text}>followers</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box className={classes.wrap_stats}>
              <Box className={classes.stats}>159</Box>
              <Typography className={classes.stats_text}>follwing</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.line}></Box>

      {/* posts */}
      <Box className={classes.posts_contain}>
        <Grid container>
          {instaUser.writtenPosts.map((post: any) => (
            <Link href={`/p/[postId]?postId=${post.id}`} as={`/p/${post.id}`}>
              <Grid item xs={4}>
                <Box className={classes.post_content}>
                  <Box className={classes.overlayEffect}></Box>
                  <Image
                    src={`https://res.cloudinary.com/dgpppa0f1/image/upload/v1661726614/${post.images[0]}`}
                    alt={post.caption}
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
              </Grid>
            </Link>
          ))}
        </Grid>
      </Box>

      <Modal
        isOpen={!!router.query.postId}
        onRequestClose={() => router.push("/")}
      >
        <ProfilePost
          id={router.query.postId}
          post={undefined}
          pathname={router.pathname}
        />
      </Modal>
    </Box>
  );
};

export default Profile;
