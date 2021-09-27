import { gql } from 'urql';

export interface IWebauthnResponse {
  webauthn: {
    success: boolean;
  };
}

export interface IWebauthnVariables {
  Input: {
    type: "AUTHENTICATION" | "REGISTRATION";
    verification: string;
    plexToken: string;
  };
}

export const WEBAUTHN = gql`
  mutation WebauthnMutation($Input: WebauthnInput!) {
    webauthn(WebauthnInput: $Input) {
      success
    }
  }
`;
