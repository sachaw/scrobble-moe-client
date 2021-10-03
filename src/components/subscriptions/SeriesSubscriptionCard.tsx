import React from 'react';

import { SelectableCard } from 'components/SelectableCard';
import { ISeriesSubscription } from 'graphql/queries/seriesSubscriptions';
import TimeAgo from 'react-timeago';

export interface SeriesSubscriptionsCardProps {
  seriesSubscription: ISeriesSubscription;
}

export const SeriesSubscriptionsCard = ({
  seriesSubscription,
}: SeriesSubscriptionsCardProps): JSX.Element => {
  return (
    <SelectableCard>
      <div className="flex justify-between w-full">
        <div>
          <div className="text-sm">{seriesSubscription.id}</div>
        </div>
        <div className="flex">
          <small className="my-auto text-xs font-medium text-gray-600">
            <TimeAgo date={seriesSubscription.updatedAt} />
          </small>
        </div>
      </div>
    </SelectableCard>
  );
};
