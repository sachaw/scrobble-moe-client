import { gql } from 'urql';

export interface IAddLinkedAccountResponse {
  addLinkedAccount: {
    id: string;
  };
}

export interface IAddLinkedAccountVariables {
  Input: {
    code: string;
  };
}

export const ADD_LINKED_ACCOUNT = gql`
  mutation AddLinkedAccountMutation($Input: AddLinkedAccountInput!) {
    addLinkedAccount(addLinkedAccountInput: $Input) {
      id
    }
  }
`;
