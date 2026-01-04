import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  // Remove trailingSlash or set to false for API routes
  // trailingSlash: true, // REMOVE THIS LINE
};

export default nextConfig;
