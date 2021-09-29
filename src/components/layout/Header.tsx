import React from 'react';

import Link from 'next/link';

import { Box, Flex, Heading } from '@chakra-ui/react';

import { LoginButton } from './LoginButton';
import { ThemeToggle } from './ThemeToggle';

export const Header = (): JSX.Element => {
  return (
    <Flex as="header" width="full" align="center" px="8" py="6">
      <Heading as="h1" size="md">
        <Link href="/">scrobble.moe</Link>
      </Heading>

      <Box marginLeft="auto" experimental_spaceX="2">
        <LoginButton />
        <ThemeToggle />
      </Box>
    </Flex>
  );
};
