/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		deviceSizes: [320, 420, 768, 1024, 1200],
		domains: ['epic.gsfc.nasa.gov', 'images-assets.nasa.gov', 'apod.nasa.gov'],
		path: "/_next/image",
		loader: "default"
	},
};


module.exports = nextConfig
