import React from 'react';

import { Box, BoxProps } from '@chakra-ui/react';

interface CardProps extends BoxProps {
  children: React.ReactNode;
  nested?: boolean;
  defaultPadding?: boolean;
}

export const Card = ({
  children,
  nested = false,
  defaultPadding = true,
  ...props
}: CardProps): JSX.Element => {
  return (
    <Box
      {...props}
      userSelect="none"
      bg={nested ? "gray.800" : "gray.700"}
      py={defaultPadding ? "8" : props.padding}
      px={defaultPadding ? { base: "4", md: "10" } : props.padding}
      shadow="base"
      rounded="lg"
    >
      {children}
    </Box>
  );
};
