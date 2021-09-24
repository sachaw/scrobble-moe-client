import React from "react";

import { Box, useBreakpointValue, useColorMode } from "@chakra-ui/react";

const SomeText = (): JSX.Element => {
  const { colorMode } = useColorMode();
  const textSize = useBreakpointValue({
    base: "xs",
    sm: "md",
  });

  return (
    <Box
      backgroundColor={colorMode === "light" ? "gray.200" : "gray.500"}
      padding={4}
      borderRadius={4}
    >
      <Box d="flex" alignItems="center" fontSize={textSize}>
        Automatically scrobble plex watches to the providers of your choice
      </Box>
    </Box>
  );
};

export default SomeText;
