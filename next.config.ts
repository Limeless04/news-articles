import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "images.unsplash.com",
      "source.unsplash.com", // ✅ Add this line
      "picsum.photos",
      "s3.sellerpintar.com",
    ],
  },
};

export default nextConfig;
