import React from 'react';

import { Card } from 'components/Card';
import Link from 'next/link';
import { plexOauth } from 'util/plex';

import { Button } from '@chakra-ui/react';

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
    <Card title="Sign in with Plex">
      <div>
        {plexUrl ? (
          <Link href={plexUrl} passHref>
            <Button backgroundColor="orange.400">Sign In</Button>
          </Link>
        ) : (
          <Button backgroundColor="orange.500">Loading</Button>
        )}
      </div>
    </Card>
  );
};

export default Auth;
