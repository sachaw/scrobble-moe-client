import '@fontsource/lexend/latin.css';

import React from 'react';

import { Layout } from 'components/layout';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import { customTheme } from 'styles/customTheme';
import { createClient, defaultExchanges, Provider } from 'urql';

import { ChakraProvider } from '@chakra-ui/react';
import { devtoolsExchange } from '@urql/devtools';

import defaultSEOConfig from '../../next-seo.config';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const client = createClient({
    url: process.env.NEXT_PUBLIC_GQL_URL ?? "http://localhost:4000",
    fetchOptions: {
      credentials: "include",
    },
    exchanges: [devtoolsExchange, ...defaultExchanges],
  });

  return (
    <Provider value={client}>
      <ChakraProvider theme={customTheme}>
        <DefaultSeo {...defaultSEOConfig} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
