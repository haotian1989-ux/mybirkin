/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }
    ]
  },
  async redirects() {
    return [
      { source: "/custom-bespoke-builder", destination: "/builder", permanent: true },
      { source: "/journal", destination: "/blog", permanent: true },
      { source: "/product/:id(\\d+)/?", destination: "/shop", permanent: true },
      { source: "/", has: [{ type: "query", key: "p" }], destination: "/", permanent: true }
    ];
  }
};

export default nextConfig;
