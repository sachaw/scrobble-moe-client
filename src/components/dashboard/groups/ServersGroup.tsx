import React from 'react';

import { CardLoading, CardNoInfo } from 'components/Card';
import { IconButton } from 'components/IconButton';
import { TabLayout } from 'components/TabLayout';
import {
  IServersResponse,
  IServersVariables,
  SERVERS,
} from 'graphql/queries/servers';
import { FiPlus, FiRefreshCw } from 'react-icons/fi';
import { useQuery } from 'urql';

import { LinkButton } from '../../Button';
import { ServerCard } from '../ServerCard';

export const ServersGroup = (): JSX.Element => {
  const [servers, refetchServers] = useQuery<
    IServersResponse,
    IServersVariables
  >({
    query: SERVERS,
    variables: {
      Input: {
        take: 5,
      },
    },
  });

  return (
    <TabLayout
      actions={
        <>
          <LinkButton href="/addServer" nested rightIcon={<FiPlus />}>
            Add server
          </LinkButton>
          <IconButton
            onClick={(): void => {
              refetchServers({
                requestPolicy: "network-only",
              });
            }}
            icon={
              <FiRefreshCw className={servers.fetching ? "animate-spin" : ""} />
            }
          />
        </>
      }
    >
      <div className="flex flex-col h-full">
        {servers.fetching && <CardLoading />}
        {servers.data && !servers.fetching && (
          <div className="space-y-2">
            {servers.data.servers.map((server) => (
              <ServerCard key={server.id} server={server} />
            ))}
          </div>
        )}
        {servers.data?.servers.length === 0 && (
          <CardNoInfo message="No Servers" />
        )}
      </div>
    </TabLayout>
  );
};
