import '@fontsource/lexend/latin.css';

import React from 'react';

import Layout from 'components/layout';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import createEmotionCache from 'styles/createEmotionCache';
import customTheme from 'styles/customTheme';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import defaultSEOConfig from '../../next-seo.config';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps): JSX.Element => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GQL_URL,
    cache: new InMemoryCache(),
    credentials: "include",
  });

  return (
    <ApolloProvider client={client}>
      <CacheProvider value={emotionCache}>
        <ChakraProvider theme={customTheme}>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
            />
          </Head>
          <DefaultSeo {...defaultSEOConfig} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </CacheProvider>
    </ApolloProvider>
  );
};

MyApp.defaultProps = {
  emotionCache: clientSideEmotionCache,
};

export default MyApp;
