import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'export',
  basePath: '/carbon-max-app',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
