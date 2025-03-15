import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
    typedEnv: true,
  },
};

export default nextConfig;
