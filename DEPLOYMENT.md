# 部署指南

本项目已配置为 standalone 模式，可以轻松部署到各种环境。

## Standalone 模式部署

### 1. 构建项目

```bash
npm run build
```

构建完成后，会在 `.next/standalone` 目录生成独立的应用程序。

### 2. 准备部署文件

standalone 构建不包含 public 和 static 文件，需要手动复制：

```bash
# 复制 public 文件夹
cp -r public .next/standalone/

# 复制静态资源
cp -r .next/static .next/standalone/.next/
```

### 3. 部署到服务器

将 `.next/standalone` 目录的所有内容上传到服务器，然后运行：

```bash
cd .next/standalone
node server.js
```

默认端口为 3000，可以通过环境变量修改：

```bash
PORT=8080 node server.js
```

### 4. 使用 Docker 部署

创建 `Dockerfile`:

```dockerfile
FROM node:20-alpine AS base

# 依赖阶段
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# 构建阶段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# 运行阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制必要文件
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

构建和运行 Docker 镜像：

```bash
# 构建镜像
docker build -t nextjs-pro .

# 运行容器
docker run -p 3000:3000 nextjs-pro
```

### 5. 使用 PM2 部署

安装 PM2：

```bash
npm install -g pm2
```

创建 `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'nextjs-pro',
    script: '.next/standalone/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

启动应用：

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Vercel 部署

如果使用 Vercel 部署，无需特殊配置：

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

## 环境变量

在生产环境中设置环境变量：

```bash
# 示例
export NODE_ENV=production
export PORT=3000
export DATABASE_URL=your_database_url
export API_URL=your_api_url
```

或使用 `.env.production` 文件：

```
NODE_ENV=production
PORT=3000
DATABASE_URL=your_database_url
API_URL=your_api_url
```

## Nginx 反向代理

如果使用 Nginx 作为反向代理：

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 性能优化建议

1. **启用 Gzip 压缩**（如果使用 Nginx）
2. **配置 CDN** 用于静态资源
3. **使用缓存策略** 优化 API 请求
4. **监控应用性能** 使用 PM2 或其他工具

## 健康检查

应用启动后，可以访问以下端点进行健康检查：

```bash
curl http://localhost:3000
```

## 故障排查

### 端口被占用

```bash
# 查找占用端口的进程
lsof -i :3000

# 杀死进程
kill -9 <PID>
```

### 内存不足

增加 Node.js 内存限制：

```bash
NODE_OPTIONS="--max-old-space-size=4096" node server.js
```

### 日志查看

使用 PM2 查看日志：

```bash
pm2 logs nextjs-pro
```

## 扩展和监控

- 使用负载均衡器（如 Nginx）分发流量
- 配置自动扩展（根据 CPU/内存使用情况）
- 集成监控工具（如 New Relic, DataDog）
- 设置错误追踪（如 Sentry）

