import type { NextConfig } from "next";

//https://lh3.googleusercontent.com/
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.bisame.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.bisame.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "m.bisame.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "bisame.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_AUTH_API_BASE_URL: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL,
    NEXT_PUBLIC_LISTINGS_BASE_URL: process.env.NEXT_PUBLIC_LISTINGS_BASE_URL,
    NEXT_PUBLIC_TRENDING_LISTINGS_URL:
      process.env.NEXT_PUBLIC_TRENDING_LISTINGS_URL,
  },
};

export default nextConfig;
