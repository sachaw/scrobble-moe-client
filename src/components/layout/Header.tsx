import React from "react";

import Link from "next/link";

import { Box, Flex, Heading } from "@chakra-ui/react";

import ThemeToggle from "./ThemeToggle";

const Header = (): JSX.Element => {
  return (
    <Flex as="header" width="full" align="center">
      <Heading as="h1" size="md">
        <Link href="/">scrobble.moe</Link>
      </Heading>

      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
