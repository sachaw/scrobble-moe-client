import React from 'react';

import { Card } from 'components/Card';

import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Flex } from '@chakra-ui/react';

export interface IPlexAccountServersResponse {
  getPlexAccountServers: [
    {
      name: string;
      address: string;
      port: number;
      version: string;
      scheme: string;
      host: string;
      localAddresses: string;
      machineIdentifier: string;
    }
  ];
}

const PLEX_ACCOUNT_SERVERS = gql`
  query PlexAccountServersQuery {
    getPlexAccountServers {
      name
      address
      port
      version
      scheme
      host
      localAddresses
      machineIdentifier
    }
  }
`;

const LINK_SERVER = gql`
  mutation LinkServerMutation($Input: LinkServerInput!) {
    linkServer(linkServerInput: $Input) {
      id
    }
  }
`;

const AddServer = (): JSX.Element => {
  const [getLinkedServer, linkedServer] = useMutation(LINK_SERVER);
  const [serversLinking, setServersLinking] = React.useState(false);
  const [error, setError] = React.useState<string>();

  const { ...plexAccountServers } =
    useQuery<IPlexAccountServersResponse>(PLEX_ACCOUNT_SERVERS);

  const linkServer = (machineIdentifier: string): void => {
    setServersLinking(true);
    void getLinkedServer({
      variables: {
        Input: {
          machineIdentifier,
        },
      },
    })
      .then(() => {
        setServersLinking(false);
      })
      .catch(() => {
        setServersLinking(false);
        setError(`Error linking server: ${machineIdentifier}`);
      });
  };
  return (
    <Card>
      {plexAccountServers.error && (
        <>
          <div>Error: {plexAccountServers.error.message}</div>
          <div>{error}</div>
        </>
      )}
      {plexAccountServers.loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {plexAccountServers.data &&
            plexAccountServers.data.getPlexAccountServers.map((server) => (
              <Card nested key={server.machineIdentifier}>
                <Flex justify="space-between">
                  <div>{server.name}</div>
                  {serversLinking ? (
                    <Button disabled my="auto" px="10" as="a" size="sm">
                      Linking...
                    </Button>
                  ) : (
                    <Button
                      cursor="pointer"
                      my="auto"
                      px="10"
                      as="a"
                      size="sm"
                      onClick={(): void => {
                        linkServer(server.machineIdentifier);
                      }}
                    >
                      Link Server
                    </Button>
                  )}
                </Flex>
              </Card>
            ))}
        </div>
      )}
    </Card>
  );
};

export default AddServer;
