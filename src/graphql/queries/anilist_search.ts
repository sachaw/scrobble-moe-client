import { gql } from 'urql';

export enum IStatusEnum {
  FINISHED = "FINISHED",
  RELEASING = "RELEASING",
  NOT_YET_RELEASED = "NOT_YET_RELEASED",
  CANCELLED = "CANCELLED",
  HIATUS = "HIATUS",
}

export interface IAniListAnime {
  id: number;
  title: {
    romaji: string;
  };
  startDate: {
    year: number;
  };
  coverImage: {
    extraLarge: string;
  };
  description: string;
  episodes: number;
  status: IStatusEnum;
}

export interface IIAniListSearchResponse {
  anime: {
    pageInfo: {
      total: number;
    };
    results: IAniListAnime[];
  };
}

export interface IAniListSearchVariabled {
  id?: number;
  search?: string;
}

export const ANILIST_SEARCH = gql`
  query AniListSearch($id: Int, $search: String) {
    anime: Page(perPage: 3) {
      pageInfo {
        total
      }
      results: media(type: ANIME, id: $id, search: $search) {
        id
        title {
          romaji
        }
        startDate {
          year
        }
        coverImage {
          extraLarge
        }
        description
        episodes
        status
      }
    }
  }
`;
