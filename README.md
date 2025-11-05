# Next.js Pro

使用最新技术栈构建的现代化 Web 应用。

## 技术栈

- **Next.js 15** - React 框架，支持 SSR 和 SSG
- **React 19** - 最新版本的 React
- **TypeScript** - 类型安全的 JavaScript
- **Ant Design 5** - 企业级 UI 组件库
- **Tailwind CSS 4** - 实用优先的 CSS 框架

## 功能特性

- ✅ 服务端渲染（SSR）
- ✅ 静态站点生成（SSG）
- ✅ 响应式设计
- ✅ TypeScript 全覆盖
- ✅ Ant Design 组件集成
- ✅ Standalone 模式部署支持
- ✅ 页面路由导航

## 项目结构

```
nextjs-pro/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 根布局
│   │   ├── page.tsx            # 首页
│   │   ├── about/
│   │   │   └── page.tsx        # 关于我们页面
│   │   └── globals.css         # 全局样式
│   └── components/
│       ├── AntdRegistry.tsx    # Ant Design 配置
│       ├── Header.tsx          # 导航栏组件
│       └── Footer.tsx          # 页脚组件
├── public/                     # 静态资源
├── next.config.ts              # Next.js 配置
├── tailwind.config.ts          # Tailwind CSS 配置
├── tsconfig.json               # TypeScript 配置
└── package.json                # 项目依赖
```

## 开始使用

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 生产构建

```bash
npm run build
```

构建完成后，会在 `.next/standalone` 目录生成可部署的应用。

### 启动生产服务器

```bash
npm run start
```

### 代码检查

```bash
npm run lint
```

## Standalone 部署

项目已配置为 standalone 模式，构建后可以独立部署：

```bash
# 构建项目
npm run build

# 复制静态资源和服务器文件
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

# 在服务器上运行
cd .next/standalone
node server.js
```

## 页面说明

### 首页 (`/`)

- Hero 区域展示
- 核心特性介绍
- CTA 行动号召

### 关于我们 (`/about`)

- 公司信息展示
- 团队成员介绍
- 发展历程时间线
- 核心价值观

## 环境要求

- Node.js 18.17 或更高版本
- npm 或 yarn 或 pnpm

## 部署

本项目可以部署到以下平台：

- Vercel
- Docker
- 自建服务器（使用 standalone 模式）

## 许可证

MIT
