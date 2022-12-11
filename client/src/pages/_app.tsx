import React from "react";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache, css } from "@emotion/react";
import createEmotionCache from "../../lib/createEmotionCache";
import "../../styles/globals.css";
import Layout from "../components/Layout";
import { PostContextProvider } from "../context/post/PostContext";
import { AuthContextProvider } from "../context/auth/AuthContext";
import SyncLoader from "react-spinners/SyncLoader";
import { Box, CssBaseline } from "@mui/material";
import { UsersContextProvider } from "../context/users/UsersContext";
import PageProvider from "../PageProvider";
import { ThemeProvider } from "next-themes";
import { GlobalStyles } from "@mui/material";
import { CommentsProvider } from "../context/comments/CommentsContext";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp: React.FC<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [loadng, setLoading] = React.useState<boolean>(false);

  // Show loading spinner while changing pages
  React.useEffect(() => {
    setTimeout(() => setLoading(true), 6000);
  });

  return (
    <ThemeProvider>
      <CacheProvider value={emotionCache}>
        <PageProvider>
          <CssBaseline />
          <GlobalStyles
            styles={css`
              :root {
                body {
                  background-color: #fff;
                  color: #121212;
                }
              }
              [data-theme="dark"] {
                body {
                  background-color: #121212;
                  color: #fff;
                }
              }
            `}
          />

          <AuthContextProvider>
            <PostContextProvider>
              <UsersContextProvider>
                <CommentsProvider>
                  {loadng ? (
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  ) : (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      height="100vh"
                    >
                      <SyncLoader color="#42a1ca" />
                    </Box>
                  )}
                </CommentsProvider>
              </UsersContextProvider>
            </PostContextProvider>
          </AuthContextProvider>
        </PageProvider>
      </CacheProvider>
    </ThemeProvider>
  );
};

export default MyApp;
