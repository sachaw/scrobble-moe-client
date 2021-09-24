import busboy from 'busboy';
import { gql, GraphQLClient } from 'graphql-request';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface IplexWebhookAccount {
  id: number;
  thumb: string;
  title: string;
}

export interface IplexWebhookServer {
  title: string;
  uuid: string;
}

export interface IplexWebhookPlayer {
  local: boolean;
  publicAddress: string;
  title: string;
  uuid: string;
}

export interface IplexWebhookMetadata {
  librarySectionType: string;
  ratingKey: string;
  key: string;
  guid: string;
  studio?: string;
  type: string;
  title: string;
  librarySectionTitle: string;
  librarySectionID: number;
  librarySectionKey: string;
  summary: string;
  rating?: number;
  year?: number;
  thumb: string;
  art?: string;
  originallyAvailableAt?: string;
  addedAt: number;
  updatedAt: number;
  Genre?: IplexWebhookGenre[];
  Director?: IplexWebhookDirector[];
  Country?: IplexWebhookCountry[];
  Role?: IplexWebhookRole[];
  skipParent?: boolean;
  parentRatingKey?: string;
  grandparentRatingKey?: string;
  parentGuid?: string;
  grandparentGuid?: string;
  parentStudio?: string;
  grandparentKey?: string;
  parentKey?: string;
  grandparentTitle?: string;
  parentTitle?: string;
  originalTitle?: string;
  index?: number;
  parentIndex?: number;
  viewOffset?: number;
  viewCount?: number;
  skipCount?: number;
  lastViewedAt?: number;
  parentYear?: number;
  ratingCount?: number;
  parentThumb?: string;
  grandparentThumb?: string;
  grandparentArt?: string;
}

export interface IplexWebhookGenre {
  id: number;
  filter: string;
  tag: string;
  count: number;
}
export interface IplexWebhookDirector {
  id: number;
  filter: string;
  tag: string;
}

export interface IplexWebhookCountry {
  id: number;
  filter: string;
  tag: string;
  count: number;
}

export interface IplexWebhookRole {
  id: number;
  filter: string;
  tag: string;
  count?: number;
  role: string;
  thumb: string;
}

export interface IplexWebhook {
  event:
    | "media.play"
    | "media.pause"
    | "media.rate"
    | "media.resume"
    | "media.scrobble"
    | "media.stop";
  user: boolean;
  owner: boolean;
  Account: IplexWebhookAccount;
  Server: IplexWebhookServer;
  Player: IplexWebhookPlayer;
  Metadata: IplexWebhookMetadata;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function (req: NextApiRequest, res: NextApiResponse): void {
  const { secret } = req.query;

  if (req.method === "POST") {
    const parser = new busboy({
      headers: req.headers,
    });
    parser.on("field", (fieldname, value) => {
      if (fieldname === "payload") {
        const payload = JSON.parse(value) as IplexWebhook;
        const regex = new RegExp(
          /me\.sachaw\.agents\.anilist:\/\/(?<id>.*)\/[0-9]\//
        );
        const providerMediaId = regex.exec(payload.Metadata.guid);

        if (
          payload.event === "media.scrobble" &&
          providerMediaId?.groups &&
          providerMediaId.groups.id
        ) {
          const graphQLClient = new GraphQLClient(
            process.env.FORWARD_URL ?? ""
          );

          const mutation = gql`
            mutation scrobble($scrobbleWebhookInput: WebhookInput!) {
              scrobble(webhookInput: $scrobbleWebhookInput)
            }
          `;
          const variables = {
            scrobbleWebhookInput: {
              secret,
              plexId: payload.Account.id,
              serverUUID: payload.Server.uuid,
              providerMediaId: providerMediaId?.groups.id,
              episode: payload.Metadata.index,
            },
          };
          void graphQLClient.request(mutation, variables);
        }
      }
    });

    req.pipe(parser);
  }

  res.send(null);
}
