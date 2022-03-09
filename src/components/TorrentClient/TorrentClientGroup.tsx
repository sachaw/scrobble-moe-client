import React from 'react';

import { CardLoading, CardNoInfo } from 'components/Card';
import { IconButton } from 'components/IconButton';
import { SelectableCard } from 'components/SelectableCard';
import { TabLayout } from 'components/TabLayout';
import {
  ITorrentClientResponse,
  TORRENT_CLIENT,
  TorrentState,
} from 'graphql/queries/torrentClient';
import { FiPlus, FiRefreshCw, FiTrash } from 'react-icons/fi';
import { useQuery } from 'urql';

import { LinkButton } from '../Button';

export const TorrentClientGroup = (): JSX.Element => {
  const [torrentClient, refetchTorrentClient] =
    useQuery<ITorrentClientResponse>({
      query: TORRENT_CLIENT,
    });

  return (
    <TabLayout
      actions={
        <>
          {torrentClient.data?.torrentClient ? (
            <LinkButton
              href="/torrentClient/new"
              nested
              rightIcon={<FiTrash />}
            >
              Remove Client
            </LinkButton>
          ) : (
            <LinkButton href="/torrentClient/new" nested rightIcon={<FiPlus />}>
              Add Client
            </LinkButton>
          )}
          <IconButton
            onClick={(): void => {
              refetchTorrentClient({
                requestPolicy: "network-only",
              });
            }}
            icon={
              <FiRefreshCw
                className={torrentClient.fetching ? "animate-spin" : ""}
              />
            }
          />
        </>
      }
    >
      <div className="flex flex-col h-full">
        {torrentClient.fetching && <CardLoading />}
        {torrentClient.data && !torrentClient.fetching && (
          <div className="space-y-2">
            <div>{torrentClient.data.torrentClient.id}</div>
            {torrentClient.data.torrentClient.torrents.map((torrent) => (
              <SelectableCard
                key={torrent.hash}
                updatedAt={new Date(torrent.added_on).toDateString()}
                actions={
                  <IconButton
                    confirmAction={(): void => console.log("deleted")}
                    icon={<FiTrash />}
                  />
                }
                status={
                  [
                    TorrentState.ForcedUP,
                    TorrentState.Uploading,
                    TorrentState.StalledUP,
                  ].includes(torrent.state)
                    ? "success"
                    : [
                        TorrentState.Downloading,
                        TorrentState.ForcedDL,
                      ].includes(torrent.state)
                    ? "running"
                    : [
                        TorrentState.QueuedUP,
                        TorrentState.QueuedDL,
                        TorrentState.Moving,
                        TorrentState.MetaDL,
                        TorrentState.CheckingUP,
                        TorrentState.CheckingDL,
                        TorrentState.Allocating,
                        TorrentState.QueuedForChecking,
                        TorrentState.CheckingResumeData,
                      ].includes(torrent.state)
                    ? "pening"
                    : [TorrentState.PausedUP, TorrentState.PausedDL].includes(
                        torrent.state
                      )
                    ? "warn"
                    : "fail"
                }
              >
                <div className="flex justify-between w-full">
                  <div className="my-auto text-sm font-semibold">
                    {torrent.name}
                  </div>
                  {torrent.state}
                </div>
              </SelectableCard>
            ))}
          </div>
        )}
        {!torrentClient.fetching && !torrentClient.data?.torrentClient && (
          <CardNoInfo message="No Torrent Client" />
        )}
      </div>
    </TabLayout>
  );
};
