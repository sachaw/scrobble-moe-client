import React from 'react';

import { CardLoading, CardNoInfo } from 'components/Card';
import { IconButton } from 'components/IconButton';
import { TabLayout } from 'components/TabLayout';
import {
  ISeriesSubscriptionsResponse,
  ISeriesSubscriptionsVariables,
  SERIES_SUBSCRIPTIONS,
} from 'graphql/queries/seriesSubscriptions';
import { FiPlus, FiRefreshCw } from 'react-icons/fi';
import { useQuery } from 'urql';

import { LinkButton } from '../Button';
import { SeriesSubscriptionsCard } from './SeriesSubscriptionCard';

export const SeriesSubscriptionsGroup = (): JSX.Element => {
  const [seriesSubscriptions, refetchSeriesSubscriptions] = useQuery<
    ISeriesSubscriptionsResponse,
    ISeriesSubscriptionsVariables
  >({
    query: SERIES_SUBSCRIPTIONS,
    variables: {
      Input: {},
    },
  });

  return (
    <TabLayout
      actions={
        <>
          <LinkButton href="/addSubscription" nested rightIcon={<FiPlus />}>
            Add Subscription
          </LinkButton>
          <IconButton
            onClick={(): void => {
              refetchSeriesSubscriptions({
                requestPolicy: "network-only",
              });
            }}
            icon={
              <FiRefreshCw
                className={seriesSubscriptions.fetching ? "animate-spin" : ""}
              />
            }
          />
        </>
      }
    >
      <div className="flex flex-col h-full">
        {seriesSubscriptions.fetching && <CardLoading />}
        {seriesSubscriptions.data && !seriesSubscriptions.fetching && (
          <div className="space-y-2">
            {seriesSubscriptions.data.seriesSubscriptions.map(
              (seriesSubscription) => (
                <SeriesSubscriptionsCard
                  key={seriesSubscription.id}
                  seriesSubscription={seriesSubscription}
                />
              )
            )}
          </div>
        )}
      </div>
      {seriesSubscriptions.data?.seriesSubscriptions.length === 0 && (
        <CardNoInfo message="No Subscriptions" />
      )}
    </TabLayout>
  );
};
