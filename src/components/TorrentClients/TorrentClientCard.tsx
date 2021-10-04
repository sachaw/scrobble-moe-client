import React from 'react';

import { IconButton } from 'components/IconButton';
import { SelectableCard } from 'components/SelectableCard';
import { ITorrentClient } from 'graphql/queries/torrentClients';
import { FiTrash } from 'react-icons/fi';

export interface TorrentClientCardProps {
  torrentClient: ITorrentClient;
}

export const TorrentClientCard = ({
  torrentClient,
}: TorrentClientCardProps): JSX.Element => {
  return (
    <SelectableCard
      updatedAt={torrentClient.updatedAt}
      actions={
        <IconButton
          confirmAction={() => console.log("deleted")}
          icon={<FiTrash />}
        />
      }
    >
      <div className="flex justify-between w-full">
        <div className="my-auto text-sm font-semibold">
          {torrentClient.client}
        </div>
      </div>
    </SelectableCard>
  );
};
