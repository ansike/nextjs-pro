import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用严格模式
  reactStrictMode: true,
  
  // 图片优化配置
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
  },
  
  // 压缩配置
  compress: true,
};

export default nextConfig;

