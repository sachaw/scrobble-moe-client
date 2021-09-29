import React from 'react';

import { HelperImage } from 'components/HelperImage';

import { Flex, Link, Text } from '@chakra-ui/react';

export const Footer = (): JSX.Element => {
  return (
    <Flex as="footer" width="full" align="center" p="4">
      <Text>
        {new Date().getFullYear()} -{" "}
        <Link href="https://scrobble.moe">scrobble.moe</Link>
      </Text>
      <Flex ml="auto">
        <HelperImage src="/plex.svg" label="Plex" />
        <HelperImage src="/anilist.svg" label="AniList" />
        <HelperImage src="/kitsu.svg" label="Kitsu" />
      </Flex>
    </Flex>
  );
};
