import React from "react";
import Image from "next/image";
import {
  Box,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Theme, IconButton } from "@mui/material";
import { RiSettings3Line } from "react-icons/ri";

import image1 from "../../assets/6f03eb85463c.jpg";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import MiniProfileImage from "../../components/miniProfileImage/MiniProfileImage";
import useUsers from "../../context/users/UsersContext";
import { useSessionStorage } from "../../hooks/useSessionStorage";

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
      [theme.breakpoints.down("sm")]: {
        maxWidth: "100%",
        alignItems: "center",
      },
    },
    top_profile: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        width: "90%",
      },
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
      // color: "rgba(255,255,255,0.7)",
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
      color: "white",
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
      // color: "rgba(255,255,255,0.7)",
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
  })
);

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get("http://localhost:3000/users");

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
  const classes = useStyles();

  const { followUser } = useUsers();

  const [userData, setUserData] = useSessionStorage("userData", "");

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    followUser(instaUser.id);
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

          <Box display="flex">
            <Box display="flex" alignItems="center" justifyContent="center">
              <Typography className={classes.profile_username}>
                {instaUser.name}
              </Typography>
              <IconButton size="large">
                <RiSettings3Line />
              </IconButton>
            </Box>

            <Box>
              {userData.name !== instaUser.name && (
                <Button
                  variant="contained"
                  className={classes.edit_btn}
                  fullWidth
                  onClick={handleFollow}
                >
                  Follow
                </Button>
              )}
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
              {instaUser.writtenPosts ? instaUser.writtenPosts.length : "0"}
            </Box>
            <Typography className={classes.stats_text}>post</Typography>
          </Grid>
          <Grid item xs={4}>
            <Box className={classes.wrap_stats}>
              <Box className={classes.stats}>{instaUser.followers.length}</Box>
              <Typography className={classes.stats_text}>followers</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box className={classes.wrap_stats}>
              <Box className={classes.stats}>{instaUser.following.length}</Box>
              <Typography className={classes.stats_text}>follwing</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.line}></Box>

      {/* posts */}
      <Box className={classes.posts_contain}>
        <Grid container>
          {instaUser.writtenPosts ? (
            instaUser.writtenPosts.map((post: any) => (
              <MiniProfileImage post={post} key={post.id} />
            ))
          ) : (
            <p
              style={{
                textAlign: "center",
                width: "100%",
                marginTop: "1.5rem",
              }}
            >
              No post Added yet
            </p>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
