import { gql } from 'urql';

export interface ITorrentClientsResponse {
  torrentClients: ITorrentClient[];
}

export interface ITorrentClient {
  id: string;
  updatedAt: string;
  clientUrl: string;
  clientUsername: string;
  client: "DELUGE" | "RTORRENT" | "QBITTORRENT" | "UTORRENT";
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
