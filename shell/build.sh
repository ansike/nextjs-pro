#!/bin/bash

# 构建 Docker 镜像的脚本
# 用法: ./shell/build.sh [镜像标签] [--push]

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

printf "${GREEN}========================================${NC}\n"
printf "${GREEN}   Next.js Docker 镜像构建脚本${NC}\n"
printf "${GREEN}   (支持多架构)${NC}\n"
printf "${GREEN}========================================${NC}\n"
echo ""

# 获取项目名称和版本
PROJECT_NAME="nextjs-pro"
VERSION=$(node -p "require('./package.json').version")

# 多架构平台支持
# PLATFORMS="linux/amd64,linux/arm64"
PLATFORMS="linux/amd64"  # 只构建 amd64，避免网络问题

# 检查是否推送到远程仓库
PUSH_FLAG=""
case "$*" in
    *--push*)
        PUSH_FLAG="--push"
        printf "${BLUE}注意: 将推送镜像到远程仓库${NC}\n"
        echo ""
        ;;
esac

# 设置镜像标签
if [ -z "$1" ] || [ "$1" = "--push" ]; then
    IMAGE_TAG="${PROJECT_NAME}:${VERSION}"
    IMAGE_TAG_LATEST="${PROJECT_NAME}:latest"
else
    IMAGE_TAG="$1"
    IMAGE_TAG_LATEST="${PROJECT_NAME}:latest"
fi

printf "${YELLOW}镜像名称:${NC} ${IMAGE_TAG}\n"
printf "${YELLOW}镜像名称:${NC} ${IMAGE_TAG_LATEST}\n"
printf "${YELLOW}支持架构:${NC} ${PLATFORMS}\n"
echo ""

# 检查 Dockerfile 是否存在
if [ ! -f "Dockerfile" ]; then
    printf "${RED}错误: Dockerfile 不存在${NC}\n"
    exit 1
fi

# 检查 docker buildx 是否可用
if ! docker buildx version > /dev/null 2>&1; then
    printf "${RED}错误: docker buildx 不可用${NC}\n"
    printf "${YELLOW}请确保 Docker 版本 >= 19.03 并启用 buildx${NC}\n"
    exit 1
fi

# 创建或使用 buildx builder
BUILDER_NAME="multiarch-builder"
if ! docker buildx ls | grep -q "${BUILDER_NAME}"; then
    printf "${YELLOW}创建新的 buildx builder: ${BUILDER_NAME}${NC}\n"
    docker buildx create --name "${BUILDER_NAME}" --driver docker-container --use
    docker buildx inspect --bootstrap
    echo ""
else
    printf "${YELLOW}使用现有的 buildx builder: ${BUILDER_NAME}${NC}\n"
    docker buildx use "${BUILDER_NAME}"
    echo ""
fi

# 开始构建
printf "${GREEN}开始构建多架构 Docker 镜像...${NC}\n"
printf "${BLUE}这可能需要几分钟时间，请耐心等待...${NC}\n"
echo ""

# 根据是否推送选择不同的构建策略
if [ -n "${PUSH_FLAG}" ]; then
    # 推送到远程仓库（支持多架构）
    docker buildx build \
        --platform "${PLATFORMS}" \
        -t "${IMAGE_TAG}" \
        -t "${IMAGE_TAG_LATEST}" \
        -f Dockerfile \
        --push \
        .
else
    # 本地构建（构建当前架构 + arm64）
    printf "${BLUE}本地多架构构建...${NC}\n"
    docker buildx build \
        --platform "${PLATFORMS}" \
        -t "${IMAGE_TAG}" \
        -t "${IMAGE_TAG_LATEST}" \
        -f Dockerfile \
        .
    
    echo ""
    printf "${YELLOW}加载当前架构镜像到本地...${NC}\n"
    # 单独构建当前架构的镜像并加载到本地
    CURRENT_ARCH=$(uname -m)
    if [ "${CURRENT_ARCH}" = "x86_64" ]; then
        LOAD_PLATFORM="linux/amd64"
    elif [ "${CURRENT_ARCH}" = "arm64" ] || [ "${CURRENT_ARCH}" = "aarch64" ]; then
        LOAD_PLATFORM="linux/arm64"
    else
        LOAD_PLATFORM="linux/amd64"
    fi
    
    docker buildx build \
        --platform "${LOAD_PLATFORM}" \
        -t "${IMAGE_TAG}" \
        -t "${IMAGE_TAG_LATEST}" \
        -f Dockerfile \
        --load \
        .
fi

# 构建成功（由于 set -e，如果构建失败脚本已经退出）
echo ""
printf "${GREEN}========================================${NC}\n"
printf "${GREEN}   镜像构建成功！${NC}\n"
printf "${GREEN}========================================${NC}\n"
echo ""
printf "${YELLOW}镜像标签:${NC}\n"
echo "  - ${IMAGE_TAG}"
echo "  - ${IMAGE_TAG_LATEST}"
echo ""
printf "${YELLOW}支持的架构:${NC} ${PLATFORMS}\n"
echo ""
if [ -z "${PUSH_FLAG}" ]; then
    printf "${YELLOW}本地镜像信息:${NC}\n"
    docker images | grep "${PROJECT_NAME}" || true
    echo ""
fi
printf "${YELLOW}运行镜像:${NC}\n"
echo "  ./shell/run.sh"
echo ""

