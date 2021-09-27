/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "scrobble.moe",
  titleTemplate: "%s | scrobble.moe",
  defaultTitle: "scrobble.moe",
  description: "Automatic Plex scrobbler",
  canonical: "https://scrobble.moe",
  openGraph: {
    url: "https://scrobble.moe",
    title: "scrobble.moe",
    description: "Automatic Plex scrobbler",
    images: [
      {
        url: "https://i.stack.imgur.com/y9DpT.jpg",
        alt: "scrobble.moe og-image",
      },
    ],
    site_name: "scrobble.moe",
  },
};

export default defaultSEOConfig;
