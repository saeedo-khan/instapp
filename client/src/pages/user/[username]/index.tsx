import React, { useEffect, useState } from "react";
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
import MiniProfileImage from "../../../components/miniProfileImage/MiniProfileImage";
import useUsers from "../../../context/users/UsersContext";
import Meta from "../../../components/Meta";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import WithAuth from "../../../HOCs/WithAuth";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { IFollower, IPost, IUser } from "../../../interfaces/types";
import useSWR, { SWRConfig } from "swr";
import { useRouter } from "next/router";

interface profileProps {}

export interface Post {
  type: string;
  message: string;
  data: Data;
}

interface Data {
  user: IUser;
}

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
      marginTop: theme.spacing(1),
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
    btn_following: {
      color: "black",
    },
  })
);

export const fetcher = async <T = any,>(url: string) => {
  const { data } = await axios.get<T>(url);
  return data;
};

export const fetch = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const Profile: React.FC<profileProps> = () => {
  const router = useRouter();

  const { data, error } = useSWR<Post, any[]>(
    `http://localhost:3000/api/users/${router.query.username}`,
    fetcher
  );

  Meta.defaultProps = {
    title: `instapp | ${router.query.username}`,
    keywords: "socail media, interactive with people",
    description: "interactive with people from around the world",
  };

  const classes = useStyles();

  const { addRmoveFollow } = useUsers();

  const [userData] = useLocalStorage("userData", "");

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addRmoveFollow(data?.data.user.id);
  };

  // const getPublic = data?.data.posts.find(
  //   (post) => post.audience == PostAudienceEnum.PUBLIC
  // );
  // console.log("pub", getPublic);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Toaster />
      <Box className={classes.profile}>
        <Box className={classes.container_profile}>
          <Box className={classes.top_profile}>
            <Box className={classes.profile_img_wrap}>
              <Image
                src={`${data?.data.user.profile_pic_url}`}
                layout="responsive"
                objectFit="cover"
                objectPosition="center"
                width={400}
                height={400}
                className={classes.thumb_profile}
              />
            </Box>

            <Box display="flex">
              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography className={classes.profile_username}>
                  {data?.data.user.name}
                </Typography>
                {data?.data.user.id === userData.id ? (
                  <Link href={`/user/${data?.data.user.name}/settings`}>
                    <IconButton size="large">
                      <RiSettings3Line />
                    </IconButton>
                  </Link>
                ) : null}
              </Box>

              <Box>
                {userData.name !== router.query.username && (
                  <>
                    {data?.data.user.followers.some(
                      (user) => user.id === userData.id
                    ) ? (
                      <Button
                        variant="contained"
                        className={classes.edit_btn}
                        fullWidth
                        onClick={handleFollow}
                      >
                        unFollow
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        className={classes.edit_btn}
                        fullWidth
                        onClick={handleFollow}
                      >
                        Follow
                      </Button>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </Box>

          <Box className={classes.bio}>
            <Box>
              {data?.data.user.biography ? data?.data.user.biography : ""}
            </Box>
          </Box>
        </Box>

        <Box className={classes.line}></Box>

        {/* profile stats */}
        <Box className={classes.stats}>
          <Grid container className={classes.stats_profile}>
            <Grid item xs={4}>
              <Box className={classes.count_stats}>
                {data?.data.user._count?.writtenPosts}
              </Box>
              <Typography className={classes.stats_text}>post</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box className={classes.wrap_stats}>
                <Box className={classes.stats}>
                  {data?.data.user._count?.followers}
                </Box>
                <Typography className={classes.stats_text}>
                  followers
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className={classes.wrap_stats}>
                <Box className={classes.stats}>
                  {data?.data.user._count?.following}
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
            {data?.data.user.writtenPosts ? (
              data?.data.user.writtenPosts.map((post) => (
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

export default Profile;
