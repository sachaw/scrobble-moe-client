import React from 'react';

import { CardLoading } from 'components/Card';
import { IconButton } from 'components/IconButton';
import { TabLayout } from 'components/TabLayout';
import {
  ITorrentClientsResponse,
  ItorrentClientsVariables,
  TORRENT_CLIENTS,
} from 'graphql/queries/torrentClients';
import { FiPlus, FiRefreshCw } from 'react-icons/fi';
import { useQuery } from 'urql';

import { LinkButton } from '../Button';
import { TorrentClientCard } from './TorrentClientCard';

export const TorrentClientsGroup = (): JSX.Element => {
  const [torrentClients, refetchTorrentClients] = useQuery<
    ITorrentClientsResponse,
    ItorrentClientsVariables
  >({
    query: TORRENT_CLIENTS,
    variables: {
      Input: {},
    },
  });

  return (
    <TabLayout
      actions={
        <>
          <LinkButton href="/addTorrentClient" nested rightIcon={<FiPlus />}>
            Add Torrent Client
          </LinkButton>
          <IconButton
            onClick={(): void => {
              refetchTorrentClients({
                requestPolicy: "network-only",
              });
            }}
            icon={
              <FiRefreshCw
                className={torrentClients.fetching ? "animate-spin" : ""}
              />
            }
          />
        </>
      }
    >
      <div className="flex flex-col h-full">
        {torrentClients.fetching && <CardLoading />}
        {torrentClients.data && !torrentClients.fetching && (
          <div className="space-y-2">
            {torrentClients.data.torrentClients.map((torrentClient) => (
              <TorrentClientCard
                key={torrentClient.id}
                torrentClient={torrentClient}
              />
            ))}
          </div>
        )}
      </div>
    </TabLayout>
  );
};
