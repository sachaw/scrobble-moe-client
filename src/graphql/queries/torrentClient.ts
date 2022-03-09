import { gql } from 'urql';

export enum TorrentState {
  // success
  ForcedUP = "forcedUP",
  Uploading = "uploading",
  StalledUP = "stalledUP",

  //running
  Downloading = "downloading",
  ForcedDL = "forcedDL",

  //pend
  QueuedUP = "queuedUP",
  QueuedDL = "queuedDL",
  Moving = "moving",
  MetaDL = "metaDL",
  CheckingUP = "checkingUP",
  CheckingDL = "checkingDL",
  Allocating = "allocating",
  QueuedForChecking = "queuedForChecking",
  CheckingResumeData = "checkingResumeData",

  //warn
  PausedUP = "pausedUP",
  PausedDL = "pausedDL",

  //err
  Error = "error",
  Unknown = "unknown",
  MissingFiles = "missingFiles",
  StalledDL = "stalledDL",
}

export interface ITorrentClientResponse {
  torrentClient: ITorrentClient;
}

export interface ITorrentClient {
  id: string;
  updatedAt: string;
  clientUrl: string;
  clientUsername: string;
  reachable: boolean;
  torrents: ITorrent[];
}

export interface ITorrent {
  name: string;
  hash: string;
  size: number;
  added_on: number;
  state: TorrentState;
}

export const TORRENT_CLIENT = gql`
  query TorrentClientQuery {
    torrentClient {
      id
      updatedAt
      clientUrl
      clientUsername
      reachable
      torrents {
        name
        hash
        size
        added_on
        state
      }
    }
  }
`;
