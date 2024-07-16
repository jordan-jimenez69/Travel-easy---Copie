/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/categories/:slug',
        destination: '/categories/[slug]',
      },
    ];
  },
};

export default nextConfig;
