import React from 'react';

import { Box, Flex } from '@chakra-ui/react';

import { Footer } from './Footer';
import { Header } from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="h-screen w-screen bg-background">
      <Flex direction="column" h="full">
        <Header />
        <Box as="main" flexGrow={1} minH={0}>
          {children}
        </Box>
        <Footer />
      </Flex>
    </div>
    // <Box margin="0 auto" maxWidth={800} transition="0.5s ease-out" h="100vh">
    //   {/* <Flex> */}

    //   {/* </Flex> */}
    // </Box>
  );
};
