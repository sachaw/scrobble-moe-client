import React from 'react';

import { LinkButton } from 'components/Button';
import { Card, CardLoading, CardNoInfo } from 'components/Card';
import { IconButton } from 'components/IconButton';
import { TabLayout } from 'components/TabLayout';
import {
  ILinkServerResponse,
  ILinkServerVariables,
  LINK_SERVER,
} from 'graphql/mutations/linkServer';
import {
  IPlexAccountServersResponse,
  PLEX_ACCOUNT_SERVERS,
} from 'graphql/queries/plexAccountServers';
import {
  IServersResponse,
  IServersVariables,
  SERVERS,
} from 'graphql/queries/servers';
import { FiCornerDownLeft, FiRefreshCw } from 'react-icons/fi';
import { useMutation, useQuery } from 'urql';

const AddSubscription = (): JSX.Element => {
  const [linkedServer, getLinkedServer] = useMutation<
    ILinkServerResponse,
    ILinkServerVariables
  >(LINK_SERVER);

  const [plexAccountServers, refetchPlexAccountServers] = useQuery<
    IPlexAccountServersResponse,
    ILinkServerVariables
  >({
    query: PLEX_ACCOUNT_SERVERS,
  });
  const [servers, refetchServers] = useQuery<
    IServersResponse,
    IServersVariables
  >({
    query: SERVERS,
    variables: {
      Input: {},
    },
  });

  const fetching =
    linkedServer.fetching || plexAccountServers.fetching || servers.fetching;
  const data = linkedServer.data || plexAccountServers.data || servers.data;

  const linkServer = (machineIdentifier: string): void => {
    void getLinkedServer({
      Input: {
        machineIdentifier,
      },
    });
  };
  return (
    <Card title="Link Plex Server">
      <TabLayout
        actions={
          <>
            <LinkButton
              href="/dashboard"
              nested
              rightIcon={<FiCornerDownLeft />}
            >
              Back
            </LinkButton>
            <IconButton
              onClick={(): void => {
                refetchPlexAccountServers({
                  requestPolicy: "network-only",
                });
                refetchServers({
                  requestPolicy: "network-only",
                });
              }}
              icon={<FiRefreshCw className={fetching ? "animate-spin" : ""} />}
            />
          </>
        }
      >
        {fetching && <CardLoading />}
        {data && !fetching && <div className="space-y-2"></div>}
        {plexAccountServers.data?.getPlexAccountServers.length === 0 && (
          <CardNoInfo message="No Servers" />
        )}
      </TabLayout>
    </Card>
  );
};

export default AddSubscription;
