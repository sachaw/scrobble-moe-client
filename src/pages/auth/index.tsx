import React from 'react';

import Link from 'next/link';
import { PlexOauth } from 'plex-oauth';

import { Box, Button, Heading, useColorModeValue } from '@chakra-ui/react';

const Auth = (): JSX.Element => {
  const [plexUrl, setPlexUrl] = React.useState<string>();

  const plexOauth = new PlexOauth({
    clientIdentifier: "7f9de3ba-e12b-11ea-87d0-0242ac130003",
    product: "scrobble.moe",
    device: "Internet",
    version: "1",
    forwardUrl: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
  });

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
        bg={useColorModeValue("white", "gray.700")}
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
