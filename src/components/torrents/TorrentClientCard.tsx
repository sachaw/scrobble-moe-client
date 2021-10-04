import React from 'react';

import { SelectableCard } from 'components/SelectableCard';
import { ITorrentClient } from 'graphql/queries/torrentClients';

export interface TorrentClientCardProps {
  torrentClient: ITorrentClient;
}

export const TorrentClientCard = ({
  torrentClient,
}: TorrentClientCardProps): JSX.Element => {
  return (
    <SelectableCard updatedAt={torrentClient.updatedAt}>
      <div className="flex justify-between w-full">
        <div>
          <div className="text-sm">{torrentClient.client}</div>
        </div>
      </div>
    </SelectableCard>
  );
};
