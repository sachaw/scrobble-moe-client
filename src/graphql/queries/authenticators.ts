import { gql } from "urql";

export interface IAuthenticatorsResponse {
  authenticators: IAuthenticator[];
}

export type Transport = "USB" | "BLE" | "NFC" | "INTERNAL";

export interface IAuthenticator {
  id: string;
  updatedAt: string;
  AAGUID: string;
  credentialID: string;
  credentialPublicKey: string;
  revoked: boolean;
  transports: Transport[];
}

export interface IAuthenticatorsVariables {
  Input: {
    take?: number;
  };
}

export const AUTHENTICATORS = gql`
  query AuthenticatorsQuery($Input: AuthenticatorFindManyInput!) {
    authenticators(authenticatorFindManyInput: $Input) {
      id
      updatedAt
      AAGUID
      credentialID
      credentialPublicKey
      revoked
      transports
    }
  }
`;
