# 使用多阶段构建优化镜像大小
FROM node:20-alpine AS base

# 安装依赖阶段
FROM base AS deps
WORKDIR /app

# 启用 corepack 并安装 yarn 1.x (classic)
RUN corepack enable && corepack prepare yarn@1 --activate

# 复制依赖配置文件
COPY package.json yarn.lock .yarnrc .npmrc ./

# 安装依赖
RUN yarn install --frozen-lockfile

# 构建阶段
FROM base AS builder
WORKDIR /app

# 启用 corepack 并安装 yarn 1.x (classic)
RUN corepack enable && corepack prepare yarn@1 --activate

# 从依赖阶段复制 node_modules
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 设置环境变量
ENV NEXT_TELEMETRY_DISABLED=1

# 构建应用
RUN yarn build

# 生产运行阶段
FROM base AS runner
WORKDIR /app

# 设置为生产环境
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 复制 public 文件夹
COPY --from=builder /app/public ./public

# 复制 standalone 输出
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 切换到非 root 用户
USER nextjs

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 启动应用
CMD ["node", "server.js"]

