import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider as PreferredThemeProvider } from "next-themes";
import { ReactNode } from "react";
import createEmotionCache from "../../lib/createEmotionCache";
import MUIThemeProvider from "./MUIThemeProvider";
import Head from "next/head";

interface PageProviderProps {
  emotionCache?: EmotionCache;
  children: ReactNode;
}

const clientSideEmotionCache = createEmotionCache();

const PageProvider = ({
  children,
  emotionCache = clientSideEmotionCache,
}: PageProviderProps) => {
  return (
    <PreferredThemeProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <MUIThemeProvider>{children}</MUIThemeProvider>
      </CacheProvider>
    </PreferredThemeProvider>
  );
};

export default PageProvider;
