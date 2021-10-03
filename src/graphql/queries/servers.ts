import { gql } from 'urql';

export interface IServersResponse {
  servers: IServer[];
}

export interface IServer {
  id: string;
  updatedAt: string;
  uuid: string;
  secret: string;
  name: string;
}

export interface IServersVariables {
  Input: {
    take?: number;
  };
}

export const SERVERS = gql`
  query ServersQuery($Input: ServerFindManyInput!) {
    servers(serverFindManyInput: $Input) {
      id
      updatedAt
      uuid
      secret
      name
    }
  }
`;
