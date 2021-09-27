import React from 'react';

import { Card } from 'components/Card';
import { useRouter } from 'next/dist/client/router';
import { plexOauth } from 'util/plex';

import { Box, Heading, Text } from '@chakra-ui/react';

import Token from './steps/token';

const Callback = (): JSX.Element => {
  const router = useRouter();

  const [error, setError] = React.useState<string>();
  const [plexToken, setPlexToken] = React.useState<string>();

  React.useEffect(() => {
    const pin = localStorage.getItem("plexPin");
    if (pin) {
      void checkPin(parseInt(pin));
    } else {
      setError("No pin found");
    }
  }, []);

  const checkPin = (pin: number): void => {
    const pollPin = setInterval(() => {
      void plexOauth
        .checkForAuthToken(pin)
        .then((token) => {
          console.log(token);
          if (token) {
            setPlexToken(token);
          } else {
            setError("No token returned");
          }
          clearInterval(pollPin);
        })
        .catch((e: Error) => {
          setError(e.message);
          clearInterval(pollPin);
        });
    }, 1000);
  };

  return (
    <Card>
      <Heading textAlign="center" mb="2rem">
        Sign in with Plex
      </Heading>
      {error && (
        <Box color="red.500" marginTop={2}>
          <Text>{error}</Text>
        </Box>
      )}
      <Card nested>
        {!plexToken && <Heading>Checking plex pin.</Heading>}

        {plexToken && <Token plexToken={plexToken} setError={setError} />}
      </Card>
    </Card>
  );
};

export default Callback;
