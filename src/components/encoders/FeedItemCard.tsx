import React from 'react';

import { IconButton } from 'components/IconButton';
import { SelectableCard } from 'components/SelectableCard';
import { IEncoderFeed } from 'graphql/queries/encoderFeed.js';
import { ISeriesSubscription } from 'graphql/queries/seriesSubscriptions.js';
import { FiPlus } from 'react-icons/fi';

export interface EncoderFeedCardProps {
  feedItem: IEncoderFeed & {
    subscription?: ISeriesSubscription;
  };
}

export const FeedItemCard = ({
  feedItem,
}: EncoderFeedCardProps): JSX.Element => {
  return (
    <SelectableCard
      updatedAt={feedItem.isoDate}
      actions={<IconButton icon={<FiPlus />} />}
    >
      <div className="flex justify-between w-full">
        <div className="my-auto text-sm font-semibold">
          {feedItem.subscription?.providerMediaId ?? feedItem.title}
        </div>
      </div>
    </SelectableCard>
  );
};
