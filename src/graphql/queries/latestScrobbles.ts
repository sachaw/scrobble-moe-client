import { gql } from 'urql';

export interface IAniListData {
  id: number;
  title: string;
  type: "ANIME" | "MANGA";
  status:
    | "FINISHED"
    | "RELEASING"
    | "NOT_YET_RELEASED"
    | "CANCELLED"
    | "HIATUS";
  description: string;
  coverImage: string;
  bannerImage: string;
  episodes: number;
}

export interface ILatestScrobblesResponse {
  latestScrobbles: {
    providerMediaId: string;
    user: {
      username: string;
      thumb: string;
    };
    startEpisode: number;
    endEpisode: number;
    anilistData: IAniListData;
  }[];
}

export const LATEST_SCROBBLES = gql`
  query LatestScrobblesQuery {
    latestScrobbles {
      providerMediaId
      user {
        username
        thumb
      }
      startEpisode
      endEpisode
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
