import React from "react";

import { Flex, useColorMode } from "@chakra-ui/react";

import HelperImage from "./HelperImage";

const SomeImage = (): JSX.Element => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Flex marginY={4} justifyContent="center" alignItems="center">
        <HelperImage src="/plex.svg" label="Plex" />
        <HelperImage src="/anilist.svg" label="AniList" />
        <HelperImage src="/kitsu.svg" label="Kitsu" />
      </Flex>
    </>
  );
};

export default SomeImage;
