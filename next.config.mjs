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
      { source: "/product/:id(\\d+)", destination: "/shop", permanent: true },
      { source: "/product/:id(\\d+)/", destination: "/shop", permanent: true },
      { source: "/:path*", has: [{ type: "query", key: "route" }], destination: "https://www.mybirkin.com/shop", permanent: true },
      { source: "/:path*", has: [{ type: "query", key: "add-to-cart" }], destination: "https://www.mybirkin.com/shop", permanent: true }
    ];
  }
};

export default nextConfig;
