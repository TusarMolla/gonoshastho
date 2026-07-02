import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ শেয়ার হোস্টিং-এর জন্য Static Export
  output: "export",
  
  images: {
    domains: ["i.ibb.co"],
    unoptimized: true, // Static export এর জন্য প্রয়োজন
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  
  // ✅ Static export এর জন্য trailing slash
  trailingSlash: true,
  
  // ✅ React Strict Mode
  reactStrictMode: true,
  
  // ✅ SWC Minifier
  swcMinify: true,
  
  // ✅ কম্প্রেশন
  compress: true,
  
  // ✅ পাওয়ার্ড বাই হেডার বন্ধ
  poweredByHeader: false,
  
  // ✅ ফন্ট অপটিমাইজ
  optimizeFonts: true,
};

export default nextConfig;