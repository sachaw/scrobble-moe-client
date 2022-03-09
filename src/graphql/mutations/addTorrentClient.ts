import { gql } from 'urql';

export interface IAddTorrentClientVariables {
  Input: IAddTorrentClientInput;
}

export interface IAddTorrentClientInput {
  clientUrl: string;
  clientUsername: string;
  clientPassword: string;
}

export const ADD_TORRENT_CLIENT = gql`
  mutation AddTorrentClientMutation($Input: AddTorrentClientInput!) {
    addTorrentClient(addTorrentClientInput: $Input) {
      id
      updatedAt
      clientUrl
      clientUsername
    }
  }
`;
