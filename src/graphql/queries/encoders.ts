import { gql } from 'urql';

export interface IEncodersResponse {
  encoders: IEncoder[];
}

export interface IEncoder {
  id: string;
  updatedAt: string;
  name: string;
  rssURL: string;
}

export interface IEncodersVariables {
  Input: {
    where?: {
      id?: {
        equals?: string;
      };
    };
  };
  take?: number;
}

export const ENCODERS = gql`
  query EncodersQuery($Input: EncoderFindManyInput!) {
    encoders(encoderFindManyInput: $Input) {
      id
      updatedAt
      name
      rssURL
    }
  }
`;
