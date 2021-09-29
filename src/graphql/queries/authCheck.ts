import { gql } from 'urql';

export interface IAuthCheckResponse {
  authCheck: {
    authenticated: boolean;
  };
}

export const AUTH_CHECK = gql`
  query AuthCheckQuery {
    authCheck {
      authenticated
    }
  }
`;
