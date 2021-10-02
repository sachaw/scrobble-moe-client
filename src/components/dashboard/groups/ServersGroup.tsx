import React from 'react';

import { IconButton } from 'components/IconButton';
import {
  IServersResponse,
  IServersVariables,
  SERVERS,
} from 'graphql/queries/servers';
import Link from 'next/link';
import { FiPlus, FiRefreshCw } from 'react-icons/fi';
import { useQuery } from 'urql';

import { Button } from '../../Button';
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
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-2 ml-auto mr-4 md:mr-auto">
        <Link passHref href="/addServer">
          <Button nested rightIcon={<FiPlus />}>
            Add server
          </Button>
        </Link>
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
      </div>
      {servers.data && (
        <div>
          {servers.data.servers.map((server) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
      )}
    </div>
  );
};
