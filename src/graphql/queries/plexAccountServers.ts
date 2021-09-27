import { gql } from 'urql';

export interface IPlexAccountServersResponse {
  getPlexAccountServers: [
    {
      name: string;
      address: string;
      port: number;
      version: string;
      scheme: string;
      host: string;
      localAddresses: string;
      machineIdentifier: string;
    }
  ];
}

export const PLEX_ACCOUNT_SERVERS = gql`
  query PlexAccountServersQuery {
    getPlexAccountServers {
      name
      address
      port
      version
      scheme
      host
      localAddresses
      machineIdentifier
    }
  }
`;
