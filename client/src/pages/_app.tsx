import React from 'react'
import type { AppProps } from 'next/app'
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../../lib/createEmotionCache';
import '../../styles/globals.css'
import Layout from '../components/Layout';
import { PostContextProvider } from '../context/post/PostContext';


interface MyAppProps extends AppProps{
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache()

const MyApp: React.FC<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps} = props;

  return(
    <CacheProvider value={emotionCache}>
    <PostContextProvider>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </PostContextProvider>
    </CacheProvider>
  )
}

export default MyApp
