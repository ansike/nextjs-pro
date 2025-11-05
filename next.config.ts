import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用 standalone 模式用于生产部署
  output: 'standalone',
  
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

