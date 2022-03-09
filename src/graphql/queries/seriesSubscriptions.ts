import { gql } from 'urql';

import { IAniListData } from './latestScrobbles.js';

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
  anilist: IAniListData;
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
      anilist {
        id
        title
        type
        status
        description
        coverImage
        bannerImage
        episodes
      }
    }
  }
`;
