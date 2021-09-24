import React from 'react';

import { Box, useColorModeValue } from '@chakra-ui/react';

type CardProps = {
  children: React.ReactNode;
  nested?: boolean;
};

export const Card = ({ children, nested = false }: CardProps): JSX.Element => {
  return (
    <Box
      bg={useColorModeValue("white", nested ? "gray.800" : "gray.700")}
      py="8"
      mb="2rem"
      px={{ base: "4", md: "10" }}
      shadow="base"
      rounded={{ sm: "lg" }}
    >
      {children}
    </Box>
  );
};
