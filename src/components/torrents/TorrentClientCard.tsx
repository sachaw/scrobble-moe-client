import React from 'react';

import { SelectableCard } from 'components/SelectableCard';
import { ITorrentClient } from 'graphql/queries/torrentClients';
import TimeAgo from 'react-timeago';

export interface TorrentClientCardProps {
  torrentClient: ITorrentClient;
}

export const TorrentClientCard = ({
  torrentClient,
}: TorrentClientCardProps): JSX.Element => {
  return (
    <SelectableCard>
      <div className="flex justify-between w-full">
        <div>
          <div className="text-sm">{torrentClient.client}</div>
        </div>
        <div className="flex">
          <small className="my-auto text-xs font-medium text-gray-600">
            <TimeAgo date={torrentClient.updatedAt} />
          </small>
        </div>
      </div>
    </SelectableCard>
  );
};
