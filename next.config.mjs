/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	images: {
		domains: ["plex.tv", "devicons.railway.app", "s4.anilist.co"],
	},
	reactStrictMode: true,
	experimental: {
		runtime: "nodejs",
	},
};

export default nextConfig;
