import React from 'react';

import { CTASection } from 'components/CTASection';
import { SomeImage } from 'components/SomeImage';

import { Box, useBreakpointValue, useColorMode } from '@chakra-ui/react';

const Home = (): JSX.Element => {
  const { colorMode } = useColorMode();
  const textSize = useBreakpointValue({
    base: "xs",
    sm: "md",
  });
  return (
    <Box mb={8} w="full">
      <Box
        backgroundColor={colorMode === "light" ? "gray.200" : "gray.500"}
        padding={4}
        borderRadius={4}
      >
        <Box d="flex" alignItems="center" fontSize={textSize}>
          Automatically scrobble plex watches to the providers of your choice
        </Box>
      </Box>
      <SomeImage />
      <CTASection />
    </Box>
  );
};

export default Home;
