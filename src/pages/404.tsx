import React from 'react';

import Link from 'next/link';

import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  useColorMode,
} from '@chakra-ui/react';

const Page404 = (): JSX.Element => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Image src="/404.png" alt="Error 404 not found Illustration" />
      <Text textAlign="center" fontSize="xs"></Text>

      <Box marginY={4}>
        <Heading textAlign="center">Page not Found.</Heading>

        <Box textAlign="center" marginTop={4}>
          <Link href="/dashboard" passHref>
            <Button
              backgroundColor={colorMode === "light" ? "gray.300" : "teal.500"}
            >
              Dashboard
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Page404;
