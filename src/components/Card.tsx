import React from 'react';

import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';

interface CardProps extends BoxProps {
  children: React.ReactNode;
  nested?: boolean;
}

export const Card = ({
  children,
  nested = false,
  ...props
}: CardProps): JSX.Element => {
  return (
    <Box
      {...props}
      bg={useColorModeValue(
        nested ? "gray.50" : "white",
        nested ? "gray.800" : "gray.700"
      )}
      py="8"
      px={{ base: "4", md: "10" }}
      shadow="base"
      rounded="lg"
    >
      {children}
    </Box>
  );
};
