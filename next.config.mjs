/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ["plex.tv", "devicons.railway.app", "s4.anilist.co"],
  },
  reactStrictMode: true,
  experimental: {
    concurrentFeatures: true,
    serverComponents: true,
    // esmExternals
  },
};

// const withPWA = require("next-pwa");
// const withTM = require("next-transpile-modules")(["@simplewebauthn/browser"]);

//  const nextConfig = withPWA(
//   withTM({
//     pwa: {
//       disable:
//         process.env.NODE_ENV === "development" ||
//         process.env.NODE_ENV === "preview" ||
//         process.env.NODE_ENV === "production",
//       // delete two lines above to enable PWA in production deployment
//       // add your own icons to public/manifest.json
//       // to re-generate manifest.json, you can visit https://tomitm.github.io/appmanifest/
//       dest: "public",
//       register: true,
//     },
//     images: {
//       domains: ["plex.tv", "devicons.railway.app", "s4.anilist.co"],
//     },
//     experimental: { esmExternals: true },
//     esmExternals: true,
//     reactStrictMode: true,
//   })
// );

export default nextConfig;
