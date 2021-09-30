import React from 'react';

import Link from 'next/link';
import { plexOauth } from 'util/plex';

import { Box, Button, Heading } from '@chakra-ui/react';

const Auth = (): JSX.Element => {
  const [plexUrl, setPlexUrl] = React.useState<string>();

  const getPlexAuthUrl = async (): Promise<void> => {
    const [url, pin] = await plexOauth.requestHostedLoginURL();
    setPlexUrl(url);
    localStorage.setItem("plexPin", pin.toString());
  };

  React.useEffect(() => {
    void getPlexAuthUrl();
  }, []);

  return (
    <>
      <Box
        bg="gray.700"
        py="8"
        px={{ base: "4", md: "10" }}
        shadow="base"
        rounded={{ sm: "lg" }}
      >
        <Heading textAlign="center">Sign in with Plex</Heading>

        <Box textAlign="center" marginTop={4}>
          {plexUrl ? (
            <Link href={plexUrl} passHref>
              <Button backgroundColor="orange.400">Sign In</Button>
            </Link>
          ) : (
            <Button backgroundColor="orange.500">Loading</Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Auth;
