import { gql } from 'urql';

import { IAniListData } from './latestScrobbles';

export interface IUserResponse {
  users: IUser[];
}

export interface IUser {
  id: string;
  email: string;
  role: "ADMIN" | "USER";
  username: string;
  thumb: string;
  accounts: {
    id: string;
    accountId: string;
    provider: string;
  }[];
  scrobbles: {
    id: string;
    providerMediaId: string;
    episode: number;
    updatedAt: string;
    accounts: {
      provider: "ANILIST" | "KISTU";
    }[];
    anilistData?: IAniListData;
  }[];

  servers: {
    id: string;
    uuid: string;
    name: string;
    secret: string;
  }[];
}

export interface IUserVariables {
  Input: {
    take: number;
  };
}

export const USER = gql`
  query UserQuery($Input: UserFindManyInput!) {
    users(userFindManyInput: $Input) {
      id
      email
      role
      username
      thumb
      accounts {
        id
        accountId
        provider
      }

      scrobbles {
        id
        providerMediaId
        episode
        updatedAt
        accounts {
          provider
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
      servers {
        id
        uuid
        name
        secret
      }
    }
  }
`;
