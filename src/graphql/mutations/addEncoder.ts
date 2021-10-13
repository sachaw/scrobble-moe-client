import { gql } from 'urql';

export interface IAddEncoderVariables {
  Input: IAddEncoderInput;
}

export interface IAddEncoderInput {
  name: string;
  rssURL: string;
}

export const ADD_ENCODER = gql`
  mutation AddEncoderMutation($Input: AddEncoderInput!) {
    addEncoder(addEncoderInput: $Input) {
      id
      updatedAt
      name
      rssURL
    }
  }
`;
