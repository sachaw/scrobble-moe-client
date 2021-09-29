import React from 'react';

import { Box, Flex } from '@chakra-ui/react';

import { Footer } from './Footer';
import { Header } from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <Box h="100vh">
      <Flex direction="column" h="full">
        <Header />
        <Box as="main" flexGrow={1}>
          {children}
        </Box>
        <Footer />
      </Flex>
    </Box>
    // <Box margin="0 auto" maxWidth={800} transition="0.5s ease-out" h="100vh">
    //   {/* <Flex> */}

    //   {/* </Flex> */}
    // </Box>
  );
};
