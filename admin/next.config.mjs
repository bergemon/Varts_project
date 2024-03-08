/** @type {import('next').NextConfig} */
import * as dotenv from "dotenv";

dotenv.config({ path: '../.env' })

const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL_SERVICE: process.env.BASE_URL_SERVICE,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: 'localhost',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },

      use: ['@svgr/webpack'],
    });

    return config;
  },
}

export default nextConfig;
