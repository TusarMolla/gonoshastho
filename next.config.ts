import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    domains: ["i.ibb.co"],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // comment those up cuz we are working on server also, bellow code's just for static website.
  // output: "export",
  // basePath: "",
  // assetPrefix: undefined,
  // trailingSlash: true,
};

export default nextConfig;
