import React from 'react';

import { IconButton } from 'components/IconButton';
import { SelectableCard } from 'components/SelectableCard';
import { ISeriesSubscription } from 'graphql/queries/seriesSubscriptions';
import { FiTrash } from 'react-icons/fi';

export interface SeriesSubscriptionsCardProps {
  seriesSubscription: ISeriesSubscription;
}

export const SeriesSubscriptionsCard = ({
  seriesSubscription,
}: SeriesSubscriptionsCardProps): JSX.Element => {
  return (
    <SelectableCard
      updatedAt={seriesSubscription.updatedAt}
      actions={
        <IconButton
          confirmAction={() => console.log("deleted")}
          icon={<FiTrash />}
        />
      }
    >
      <div className="flex justify-between w-full">
        <div className="my-auto text-sm font-semibold">
          {seriesSubscription.providerMediaId}
        </div>
      </div>
    </SelectableCard>
  );
};
