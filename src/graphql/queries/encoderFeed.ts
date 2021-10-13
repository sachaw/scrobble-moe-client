import { gql } from 'urql';

export interface IEncoderFeedResponse {
  encoderFeed: IEncoderFeed[];
}

export interface IEncoderFeed {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  guid: string;
  isoDate: string;
}

export interface IEncoderFeedVariables {
  Input: {
    id: string;
  };
}

export const ENCODER_FEED = gql`
  query EncoderFeedQuery($Input: EncoderFeedInput!) {
    encoderFeed(encoderFeedInput: $Input) {
      title
      link
      pubDate
      content
      contentSnippet
      guid
      isoDate
    }
  }
`;
