import React from "react";

import { Button } from "components/Button";
import { Card, CardLoading } from "components/Card";
import { IconButton } from "components/IconButton";
import { TabLayout } from "components/TabLayout";
import {
  ILinkServerResponse,
  ILinkServerVariables,
  LINK_SERVER,
} from "graphql/mutations/linkServer";
import {
  IPlexAccountServersResponse,
  PLEX_ACCOUNT_SERVERS,
} from "graphql/queries/plexAccountServers";
import { FiRefreshCw } from "react-icons/fi";
import { useMutation, useQuery } from "urql";

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
      <TabLayout
        actions={
          <IconButton
            onClick={(): void => {
              refetchPlexAccountServers({
                requestPolicy: "network-only",
              });
            }}
            icon={
              <FiRefreshCw
                className={plexAccountServers.fetching ? "animate-spin" : ""}
              />
            }
          />
        }
      >
        {plexAccountServers.fetching && <CardLoading />}
        {plexAccountServers.data && !plexAccountServers.fetching && (
          <div>
            {plexAccountServers.data.getPlexAccountServers.map((server) => (
              <div key={server.machineIdentifier}>
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
              </div>
            ))}
          </div>
        )}
      </TabLayout>
    </Card>
  );
};

export default AddServer;
