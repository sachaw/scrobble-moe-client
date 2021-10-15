import { gql } from 'urql';

export interface ISeriesSubscriptionsResponse {
  seriesSubscriptions: ISeriesSubscription[];
}

export interface ISeriesSubscription {
  id: string;
  updatedAt: string;
  nameIncludes: string;
  nameExcludes: string;
  episodeOffset: number;
  providerMediaId: string;
}

export interface ISeriesSubscriptionsVariables {
  Input: {
    take?: number;
  };
}

export const SERIES_SUBSCRIPTIONS = gql`
  query seriesSubscriptionsQuery($Input: SeriesSubscriptionFindManyInput!) {
    seriesSubscriptions(seriesSubscriptionFindManyInput: $Input) {
      id
      updatedAt
      nameIncludes
      nameExcludes
      episodeOffset
      providerMediaId
    }
  }
`;
