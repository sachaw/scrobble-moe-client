import React from 'react';

import { IconButton } from 'components/IconButton';
import { SelectableCard } from 'components/SelectableCard';
import { ISeriesSubscription } from 'graphql/queries/seriesSubscriptions';
import { useRouter } from 'next/router';
import { FiTrash } from 'react-icons/fi';

export interface SeriesSubscriptionsCardrops {
  seriesSubscription: ISeriesSubscription;
}

export const SeriesSubscriptionCard = ({
  seriesSubscription,
}: SeriesSubscriptionsCardrops): JSX.Element => {
  const router = useRouter();
  return (
    <SelectableCard
      onClick={(): void => {
        void router.push(`/subscriptions/${seriesSubscription.id}`);
      }}
      className="cursor-pointer select-none"
      updatedAt={seriesSubscription.updatedAt}
      actions={
        <IconButton
          confirmAction={(): void => console.log("deleted")}
          icon={<FiTrash />}
        />
      }
    >
      <div className="flex justify-between w-full">
        <div className="my-auto text-sm font-semibold">
          {seriesSubscription.anilist.title}
        </div>
      </div>
    </SelectableCard>
  );
};
