#!/bin/bash

# 构建 Docker 镜像的脚本
# 用法: ./shell/build.sh [镜像标签]

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   Next.js Docker 镜像构建脚本${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 获取项目名称和版本
PROJECT_NAME="nextjs-pro"
VERSION=$(node -p "require('./package.json').version")

# 设置镜像标签
if [ -z "$1" ]; then
    IMAGE_TAG="${PROJECT_NAME}:${VERSION}"
    IMAGE_TAG_LATEST="${PROJECT_NAME}:latest"
else
    IMAGE_TAG="$1"
    IMAGE_TAG_LATEST="${PROJECT_NAME}:latest"
fi

echo -e "${YELLOW}镜像名称:${NC} ${IMAGE_TAG}"
echo -e "${YELLOW}镜像名称:${NC} ${IMAGE_TAG_LATEST}"
echo ""

# 检查 Dockerfile 是否存在
if [ ! -f "Dockerfile" ]; then
    echo -e "${RED}错误: Dockerfile 不存在${NC}"
    exit 1
fi

# 开始构建
echo -e "${GREEN}开始构建 Docker 镜像...${NC}"
echo ""

# 构建镜像
docker build \
    --platform linux/amd64 \
    -t "${IMAGE_TAG}" \
    -t "${IMAGE_TAG_LATEST}" \
    -f Dockerfile \
    .

# 检查构建是否成功
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}   镜像构建成功！${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "${YELLOW}镜像标签:${NC}"
    echo -e "  - ${IMAGE_TAG}"
    echo -e "  - ${IMAGE_TAG_LATEST}"
    echo ""
    echo -e "${YELLOW}镜像信息:${NC}"
    docker images | grep "${PROJECT_NAME}"
    echo ""
    echo -e "${YELLOW}运行镜像:${NC}"
    echo -e "  ./shell/run.sh"
    echo ""
else
    echo ""
    echo -e "${RED}========================================${NC}"
    echo -e "${RED}   镜像构建失败！${NC}"
    echo -e "${RED}========================================${NC}"
    exit 1
fi

