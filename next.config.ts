import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "smpinhwa.edu.my",
      },
    ],
  },
};

export default nextConfig;