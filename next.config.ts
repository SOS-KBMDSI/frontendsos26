import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "nwjabwosmhybkqaprjrg.supabase.co",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const TerserPlugin = require("terser-webpack-plugin");

      const existingTerserPluginIndex = config.optimization.minimizer.findIndex(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (plugin: any) => plugin instanceof TerserPlugin,
      );

      const terserOptions = {
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      };

      if (existingTerserPluginIndex > -1) {
        config.optimization.minimizer[existingTerserPluginIndex] =
          new TerserPlugin(terserOptions);
      } else {
        config.optimization.minimizer.push(new TerserPlugin(terserOptions));
      }
    }
    return config;
  },
};

export default nextConfig;
