import { gql } from 'urql';

export interface ILinkServerResponse {
  linkServer: {
    id: string;
  };
}

export interface ILinkServerVariables {
  Input: {
    machineIdentifier: string;
  };
}

export const LINK_SERVER = gql`
  mutation LinkServerMutation($Input: LinkServerInput!) {
    linkServer(linkServerInput: $Input) {
      id
    }
  }
`;
