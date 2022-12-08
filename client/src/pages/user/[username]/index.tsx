import React, { useEffect } from "react";
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
import axios from "axios";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import MiniProfileImage from "../../../components/miniProfileImage/MiniProfileImage";
import useUsers from "../../../context/users/UsersContext";
import Meta from "../../../components/Meta";
import { Toaster } from "react-hot-toast";
import { IFollower } from "../../../interfaces/types";
import Link from "next/link";
import WithAuth from "../../../HOCs/WithAuth";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

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
      [theme.breakpoints.down("sm")]: {
        width: 100,
        height: 100,
      },
    },
    thumb_profile: {
      borderRadius: "50%",
    },
    profile_setting: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing(1),
    },
    profile_username: {
      marginRight: theme.spacing(1),
      fontSize: 25,
      fontFamily: "Roboto",
      display: "inline-block",
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
  const res = await axios.get("http://localhost:3000/api/users");

  const paths = res.data.data.users.map((user: any) => {
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
  console.log(params);
  const res = await axios.get(
    `http://localhost:3000/api/users/${params?.username}`
  );

  return {
    props: {
      instaUser: res.data,
    },
  };
};

const Profile: React.FC<profileProps> = ({
  instaUser,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  Meta.defaultProps = {
    title: `instapp | ${instaUser.name}`,
    keywords: "socail media, interactive with people",
    description: "interactive with people from around the world",
  };

  const classes = useStyles();

  const { followUser, unFollowUser } = useUsers();
  const [followed, setFollowed] = React.useState<boolean>(false);

  const [userData] = useLocalStorage("userData", "");

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    followUser(instaUser.id);
    setFollowed(true);
  };

  const handleUnfollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // check if follow the user
    const checkFollower = instaUser.followers.find(
      (follower: IFollower) => follower.followerId
    );

    if (checkFollower) {
      unFollowUser(checkFollower.id);
      setFollowed(false);
    }
  };

  return (
    <>
      <Toaster />
      <Box className={classes.profile}>
        <Box className={classes.container_profile}>
          <Box className={classes.top_profile}>
            <Box className={classes.profile_img_wrap}>
              <Image
                src={`${instaUser.profile_pic_url}`}
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
                {instaUser.id === userData.id ? (
                  <Link href={`/user/${instaUser.name}/settings`}>
                    <IconButton size="large">
                      <RiSettings3Line />
                    </IconButton>
                  </Link>
                ) : null}
              </Box>

              <Box>
                {userData.name !== instaUser.name && (
                  <Button
                    variant="contained"
                    className={classes.edit_btn}
                    fullWidth
                  >
                    {!followed ? (
                      <Typography onClick={handleUnfollow}>unfollow</Typography>
                    ) : (
                      <Typography onClick={handleFollow}>Follow</Typography>
                    )}
                  </Button>
                )}
              </Box>
            </Box>
          </Box>

          <Box className={classes.bio}>
            <Box>{instaUser.biography ? instaUser.biography : ""}</Box>
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
                <Box className={classes.stats}>
                  {instaUser.followers.length}
                </Box>
                <Typography className={classes.stats_text}>
                  followers
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className={classes.wrap_stats}>
                <Box className={classes.stats}>
                  {instaUser.following.length}
                </Box>
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
    </>
  );
};

export default WithAuth(Profile);
