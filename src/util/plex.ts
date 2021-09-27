import { PlexOauth } from 'plex-oauth';

export const plexOauth = new PlexOauth({
  clientIdentifier: process.env.NEXT_PUBLIC_PLEX_CLIENT_IDENTIFIER ?? "",
  product: "scrobble.moe",
  device: "Internet",
  version: "1",
  forwardUrl: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
});
