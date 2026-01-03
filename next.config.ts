import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // output: 'export', // Commented out for development
  // basePath: '/carbon-max-app', // Commented out for development
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
