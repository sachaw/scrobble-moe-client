import React from 'react';

import { Flex } from '@chakra-ui/react';

import { HelperImage } from './HelperImage';

export const SomeImage = (): JSX.Element => {
  return (
    <Flex marginY={4} justifyContent="center" alignItems="center">
      <HelperImage src="/plex.svg" label="Plex" />
      <HelperImage src="/anilist.svg" label="AniList" />
      <HelperImage src="/kitsu.svg" label="Kitsu" />
    </Flex>
  );
};
