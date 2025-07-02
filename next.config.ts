import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/", // The incoming request path
        destination: "/home", // The path you want to redirect to
        permanent: true, // true for 308 Permanent Redirect, false for 307 Temporary Redirect
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "s3.sellerpintar.com",
      },
    ],
  },
};

export default nextConfig;
