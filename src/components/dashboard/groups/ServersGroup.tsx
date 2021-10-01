import React from 'react';

import {
  IServersResponse,
  IServersVariables,
  SERVERS,
} from 'graphql/queries/servers';
import Link from 'next/link';
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
    <div>
      <Link passHref href="/addServer">
        <Button text="Add server" />
      </Link>
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
