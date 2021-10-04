import { ClientEnum } from 'graphql/queries/torrentClients.js';
import { gql } from 'urql';

export interface IAddTorrentClientVariables {
  Input: IAddTorrentClientInput;
}

export interface IAddTorrentClientInput {
  clientUrl: string;
  clientUsername: string;
  clientPassword: string;
  client: ClientEnum;
}

export const ADD_TORRENT_CLIENT = gql`
  mutation AddTorrentClientMutation($Input: AddTorrentClientInput!) {
    addTorrentClient(addTorrentClientInput: $Input) {
      id
      updatedAt
      clientUrl
      clientUsername
      client
    }
  }
`;
