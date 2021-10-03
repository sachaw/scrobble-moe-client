import React from 'react';

import { CardLoading } from 'components/Card';
import { IconButton } from 'components/IconButton';
import { TabLayout } from 'components/TabLayout';
import {
  ISeriesSubscriptionsResponse,
  ISeriesSubscriptionsVariables,
  SERIES_SUBSCRIPTIONS,
} from 'graphql/queries/seriesSubscriptions';
import Link from 'next/link';
import { FiPlus, FiRefreshCw } from 'react-icons/fi';
import { useQuery } from 'urql';

import { Button } from '../Button';
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
          <Link passHref href="/addCredential">
            <Button nested rightIcon={<FiPlus />}>
              Add Subscription
            </Button>
          </Link>
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
    </TabLayout>
  );
};
