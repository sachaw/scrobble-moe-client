import { gql } from 'urql';

export interface ITorrentClientsResponse {
  torrentClients: ITorrentClient[];
}

export enum ClientEnum {
  DELUGE = "DELUGE",
  RTORRENT = "RTORRENT",
  QBITTORRENT = "QBITTORRENT",
  UTORRENT = "UTORRENT",
}

export interface ITorrentClient {
  id: string;
  updatedAt: string;
  clientUrl: string;
  clientUsername: string;
  client: ClientEnum;
}

export interface ItorrentClientsVariables {
  Input: {
    take?: number;
  };
}

export const TORRENT_CLIENTS = gql`
  query TorrentClientsQuery($Input: TorrentClientFindManyInput!) {
    torrentClients(torrentClientFindManyInput: $Input) {
      id
      updatedAt
      clientUrl
      clientUsername
      client
    }
  }
`;
