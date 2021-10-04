import React from 'react';

import { SelectableCard } from 'components/SelectableCard';
import { ISeriesSubscription } from 'graphql/queries/seriesSubscriptions';

export interface SeriesSubscriptionsCardProps {
  seriesSubscription: ISeriesSubscription;
}

export const SeriesSubscriptionsCard = ({
  seriesSubscription,
}: SeriesSubscriptionsCardProps): JSX.Element => {
  return (
    <SelectableCard updatedAt={seriesSubscription.updatedAt}>
      <div className="flex justify-between w-full">
        <div>
          <div className="text-sm">{seriesSubscription.id}</div>
        </div>
      </div>
    </SelectableCard>
  );
};
