import { gql } from 'urql';

export interface IProviderLoginUrlResponse {
  providerLoginUrl: [
    {
      provider: string;
      url: string;
    }
  ];
}

export interface IProviderLoginUrlVariables {
  Input: {
    providers: string[];
  };
}

export const PROVIDER_LOGIN_URLS = gql`
  query ProviderLoginUrlQuery($Input: ProviderLoginUrlInput!) {
    providerLoginUrl(providerLoginUrlInput: $Input) {
      provider
      url
    }
  }
`;
