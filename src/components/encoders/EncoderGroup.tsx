import React from 'react';

import { LinkButton } from 'components/Button';
import { CardLoading, CardNoInfo } from 'components/Card';
import { IconButton } from 'components/IconButton';
import { TabLayout } from 'components/TabLayout';
import {
  ENCODER_FEED,
  IEncoderFeed,
  IEncoderFeedResponse,
  IEncoderFeedVariables,
} from 'graphql/queries/encoderFeed';
import {
  ENCODERS,
  IEncodersResponse,
  IEncodersVariables,
} from 'graphql/queries/encoders';
import {
  ISeriesSubscriptionsResponse,
  ISeriesSubscriptionsVariables,
  SERIES_SUBSCRIPTIONS,
} from 'graphql/queries/seriesSubscriptions';
import { FiCornerDownLeft, FiRefreshCw } from 'react-icons/fi';
import { useQuery } from 'urql';

import { ISeriesSubscription } from '../../graphql/queries/seriesSubscriptions.js';
import { FeedItemCard } from './FeedItemCard';

export interface IEncoderGroupProps {
  id: string;
}

export const EncoderGroup = ({ id }: IEncoderGroupProps): JSX.Element => {
  const [feed, setFeed] = React.useState<
    (IEncoderFeed & { subscription?: ISeriesSubscription })[]
  >([]);

  const [seriesSubscriptions, refetchSeriesSubscriptions] = useQuery<
    ISeriesSubscriptionsResponse,
    ISeriesSubscriptionsVariables
  >({
    query: SERIES_SUBSCRIPTIONS,
    variables: {
      Input: {},
    },
  });

  const [encoders, refetchEncoders] = useQuery<
    IEncodersResponse,
    IEncodersVariables
  >({
    query: ENCODERS,
    variables: {
      Input: {
        where: {
          id: {
            equals: id,
          },
        },
      },
    },
  });

  const [encoderFeed, refetchEncoderFeed] = useQuery<
    IEncoderFeedResponse,
    IEncoderFeedVariables
  >({
    query: ENCODER_FEED,
    variables: {
      Input: {
        id: encoders.data?.encoders[0].id ?? "",
      },
    },
    pause: !encoders.data,
  });

  React.useEffect(() => {
    if (
      encoderFeed.data?.encoderFeed.length &&
      seriesSubscriptions.data?.seriesSubscriptions.length
    ) {
      const tmp: (IEncoderFeed & { subscription?: ISeriesSubscription })[] = [];
      encoderFeed.data?.encoderFeed.forEach((feedItem) => {
        //   const tmp = seriesSubscriptions.data?.seriesSubscriptions.find((subscription) => subscription. === feedItem.seriesId);
        const match = seriesSubscriptions.data?.seriesSubscriptions.find(
          (subscription) => feedItem.title.includes(subscription.nameIncludes)
        );
        const matched: IEncoderFeed & { subscription?: ISeriesSubscription } =
          feedItem;
        if (match) {
          matched.subscription = match;
        }
        tmp.push(matched);
      });

      setFeed(tmp);
    }
  }, [encoderFeed.data, seriesSubscriptions.data]);

  return (
    <TabLayout
      actions={
        <>
          <LinkButton nested href="/encoders" rightIcon={<FiCornerDownLeft />}>
            Back
          </LinkButton>
          <IconButton
            onClick={(): void => {
              refetchEncoders({
                requestPolicy: "network-only",
              });
              refetchEncoderFeed({
                requestPolicy: "network-only",
              });
            }}
            icon={
              <FiRefreshCw
                className={
                  encoders.fetching && encoderFeed.fetching
                    ? "animate-spin"
                    : ""
                }
              />
            }
          />
        </>
      }
    >
      <div className="flex flex-col h-full">
        {encoders.fetching && encoderFeed.fetching && <CardLoading />}
        {encoders.data &&
          encoderFeed.data &&
          !encoders.fetching &&
          !encoderFeed.fetching && (
            <div className="space-y-2 overflow-y-auto">
              {feed.map((feedItem) => (
                <FeedItemCard key={feedItem.guid} feedItem={feedItem} />
              ))}
            </div>
          )}
        {encoders.data?.encoders.length === 0 && (
          <CardNoInfo message="No Encoders" />
        )}
      </div>
    </TabLayout>
  );
};
