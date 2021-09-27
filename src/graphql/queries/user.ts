import { gql } from 'urql';

export interface IUserResponse {
  users: [
    {
      id: string;
      email: string;
      role: "ADMIN" | "USER";
      username: string;
      thumb: string;
      accounts: [
        {
          id: string;
          accountId: string;
          provider: string;
        }
      ];
      scrobbles: [
        {
          id: string;
          providerMediaId: string;
          episode: number;
        }
      ];
      servers: [
        {
          id: string;
          uuid: string;
          name: string;
          secret: string;
        }
      ];
    }
  ];
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
