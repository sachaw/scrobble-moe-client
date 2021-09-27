import { gql } from 'urql';

export interface IAuthenticateResponse {
  authenticate: {
    type: "AUTHENTICATION" | "REGISTRATION";
    webauthnOptions: string;
    plexUser: {
      username: string;
      avatar: string;
    };
  };
}

export interface IAuthenticateVariables {
  Input: {
    plexToken: string;
  };
}

export const AUTHENTICATE = gql`
  mutation AuthenticateMutation($Input: AuthenticationInput!) {
    authenticate(authenticationInput: $Input) {
      type
      webauthnOptions
      plexUser {
        username
        avatar
      }
    }
  }
`;
