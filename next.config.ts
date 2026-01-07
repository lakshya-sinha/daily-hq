import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc', // Replace with your hostname
        port: '', // Can be left empty if default port is used
        pathname: '/**', // Use '/**' to allow all paths
      },
    ]
  },
  /* config options here */
};

export default nextConfig;
