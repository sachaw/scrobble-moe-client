import { gql } from 'urql';

export interface IAddSeriesSubscriptionVariables {
  Input: IAddSeriesSubscriptionInput;
}

export interface IAddSeriesSubscriptionInput {
  nameIncludes: string;
  nameExcludes: string;
  episodeOffset: number;
  providerMediaId: string;
  encoderId: string;
}

export const ADD_SERIES_SUBSCRIPTION = gql`
  mutation AddSeriesSubscriptionMutation($Input: AddSeriesSubscriptionInput!) {
    addSeriesSubscription(addSeriesSubscriptionInput: $Input) {
      id
      updatedAt
      nameIncludes
      nameExcludes
      episodeOffset
      providerMediaId
    }
  }
`;
