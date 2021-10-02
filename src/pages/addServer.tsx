import React from 'react';

import { Button } from 'components/Button';
import { Card } from 'components/Card';
import {
  ILinkServerResponse,
  ILinkServerVariables,
  LINK_SERVER,
} from 'graphql/mutations/linkServer';
import {
  IPlexAccountServersResponse,
  PLEX_ACCOUNT_SERVERS,
} from 'graphql/queries/plexAccountServers';
import { useMutation, useQuery } from 'urql';

const AddServer = (): JSX.Element => {
  const [linkedServer, getLinkedServer] = useMutation<
    ILinkServerResponse,
    ILinkServerVariables
  >(LINK_SERVER);
  const [serversLinking, setServersLinking] = React.useState(false);
  const [error, setError] = React.useState<string>();

  const [plexAccountServers, refetchPlexAccountServers] = useQuery<
    IPlexAccountServersResponse,
    ILinkServerVariables
  >({
    query: PLEX_ACCOUNT_SERVERS,
  });

  const linkServer = (machineIdentifier: string): void => {
    setServersLinking(true);
    void getLinkedServer({
      Input: {
        machineIdentifier,
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
    <Card title="Link Plex Server">
      {plexAccountServers.error && (
        <>
          <div>Error: {plexAccountServers.error.message}</div>
          <div>{error}</div>
        </>
      )}
      {plexAccountServers.fetching ? (
        <div>Loading...</div>
      ) : (
        <div>
          {plexAccountServers.data &&
            plexAccountServers.data.getPlexAccountServers.map((server) => (
              <Card key={server.machineIdentifier} title="link">
                <div className="flex justify-between">
                  <div>{server.name}</div>
                  {serversLinking ? (
                    <Button>Linking...</Button>
                  ) : (
                    <Button
                      onClick={(): void => {
                        linkServer(server.machineIdentifier);
                      }}
                    >
                      Link Server
                    </Button>
                  )}
                </div>
              </Card>
            ))}
        </div>
      )}
    </Card>
  );
};

export default AddServer;
