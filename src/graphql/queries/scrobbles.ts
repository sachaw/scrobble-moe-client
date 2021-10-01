import { gql } from 'urql';

import { IAniListData } from './latestScrobbles';

export interface IScrobblesResponse {
  scrobbles: IScrobble[];
}

export interface IScrobble {
  id: string;
  updatedAt: string;
  providerMediaId: string;
  episode: number;
  accounts: {
    provider: "ANILIST" | "KISTU";
  }[];
  status: {
    id: string;
    updatedAt: string;
    status: "IGNORED" | "TRACKED" | "ERRORED";
  }[];
  anilistData?: IAniListData;
}

export interface IScrobblesVariables {
  Input: {
    take: number;
  };
}

export const SCROBBLES = gql`
  query ScrobblesQuery($Input: ScrobbleFindManyInput!) {
    scrobbles(scrobbleFindManyInput: $Input) {
      id
      updatedAt
      providerMediaId
      episode
      accounts {
        provider
      }
      status {
        id
        updatedAt
        status
      }
      anilistData {
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
