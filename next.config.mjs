// Set by the GitHub Pages workflow: '' for a *.github.io repo, '/<repo>' otherwise.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  images: {
    // Static export → images are served unoptimized. HD photography is loaded
    // client-side from the Unsplash CDN (free license); everything else is a
    // local SVG. remotePatterns whitelists the CDN host.
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
