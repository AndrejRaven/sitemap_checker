/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/sitemap_checker',
  async rewrites() {
    return [
      {
        source: '/sitemap_checker/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig