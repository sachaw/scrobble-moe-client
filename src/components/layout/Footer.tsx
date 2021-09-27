import React from 'react';

import { Flex, Link, Text } from '@chakra-ui/react';

export const Footer = (): JSX.Element => {
  return (
    <Flex as="footer" width="full" align="center">
      <Text>
        {new Date().getFullYear()} -{" "}
        <Link href="https://scrobble.moe">scrobble.moe</Link>
      </Text>
    </Flex>
  );
};
