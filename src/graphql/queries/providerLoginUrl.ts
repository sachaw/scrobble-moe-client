import { gql } from "urql";

export interface IProviderLoginUrlResponse {
  providerLoginUrl: IProviderLoginUrl[];
}

export type Provider = "KITSU" | "ANILIST";

export interface IProviderLoginUrl {
  provider: Provider;
  url: string;
}

export interface IProviderLoginUrlVariables {
  Input: {
    providers: Provider[];
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
