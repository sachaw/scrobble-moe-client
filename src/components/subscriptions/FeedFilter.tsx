import React from 'react';

import {
  ENCODER_FEED,
  IEncoderFeed,
  IEncoderFeedResponse,
  IEncoderFeedVariables,
} from 'graphql/queries/encoderFeed';
import {
  ISeriesSubscriptionsResponse,
  ISeriesSubscriptionsVariables,
  SERIES_SUBSCRIPTIONS,
} from 'graphql/queries/seriesSubscriptions';
import { useQuery } from 'urql';

export interface FeedFilterProps {
  includes: string;
  excludes: string;
  encoderId: string;
  matchRegex: string;
  episodeOffset?: number;
}

interface IEncoderRegex {
  name: string;
  season: string;
  episode: string;
}

export const FeedFilter = ({
  includes,
  excludes,
  encoderId,
  matchRegex,
  episodeOffset,
}: FeedFilterProps): JSX.Element => {
  const [encoderFeed] = useQuery<IEncoderFeedResponse, IEncoderFeedVariables>({
    query: ENCODER_FEED,
    variables: {
      Input: {
        id: encoderId,
      },
    },
    pause: !encoderId,
  });

  const [seriesSubscriptions] = useQuery<
    ISeriesSubscriptionsResponse,
    ISeriesSubscriptionsVariables
  >({
    query: SERIES_SUBSCRIPTIONS,
    variables: {
      Input: {},
    },
  });

  const [filteredFeed, setFilteredFeed] = React.useState<IEncoderFeed[]>([]);

  const regex = new RegExp(matchRegex);

  React.useEffect(() => {
    if (encoderFeed.data?.encoderFeed.length) {
      setFilteredFeed(
        encoderFeed.data.encoderFeed
          .filter((filter) => {
            return excludes && excludes.length
              ? !filter.title.includes(excludes)
              : true;
          })
          .filter((filter) => {
            return includes.length ? filter.title.includes(includes) : true;
          })
        //.filter((filter) => {seriesSubscriptions.data?.seriesSubscriptions.some}) Filter out series that are already subscribed to
      );
    }
  }, [
    includes,
    excludes,
    encoderFeed.data,
    seriesSubscriptions.data?.seriesSubscriptions,
  ]);
  return (
    <div className="h-40 overflow-y-auto border border-gray-200 rounded-md">
      {filteredFeed.map((feedItem) => {
        const details = regex.exec(feedItem.title)?.groups as
          | IEncoderRegex
          | undefined;

        return (
          <div
            className="flex justify-between px-2 py-1 text-sm odd:bg-gray-100"
            key={feedItem.guid}
          >
            <div
              className={`font-light ${seriesSubscriptions.data?.seriesSubscriptions.findIndex(
                (sub) =>
                  details?.name.includes(sub.nameIncludes)
                    ? "text-gray-500"
                    : "text-foreground"
              )}`}
            >
              {details?.name}
            </div>
            <div className="font-semibold text-gray-700 ">
              {details?.season && (
                <>
                  <span className="text-xs font-light">S</span>
                  {details?.season}&nbsp;
                </>
              )}

              <span className="text-xs font-light">E</span>
              {episodeOffset && details?.episode
                ? parseInt(details.episode) - episodeOffset
                : details?.episode}
            </div>
          </div>
        );
      })}
      {filteredFeed.length === 0 && (
        <div className="flex h-full">
          <div className="m-auto text-gray-600">No items found</div>
        </div>
      )}
    </div>
  );
};
