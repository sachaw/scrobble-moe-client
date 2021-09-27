import React from 'react';

import { RiMoonFill, RiSunLine } from 'react-icons/ri';

import { IconButton, useColorMode } from '@chakra-ui/react';

export const ThemeToggle = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="theme toggle"
      icon={colorMode === "light" ? <RiMoonFill /> : <RiSunLine />}
      onClick={toggleColorMode}
    />
  );
};
