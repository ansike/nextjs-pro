#!/bin/bash

# 生产环境运行 Docker 容器的脚本
# 用法: ./shell/run.sh [端口号]

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   Next.js Docker 容器运行脚本${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 配置参数
PROJECT_NAME="nextjs-pro"
IMAGE_NAME="${PROJECT_NAME}:latest"
CONTAINER_NAME="${PROJECT_NAME}-container"

# 设置端口
if [ -z "$1" ]; then
    HOST_PORT=3000
else
    HOST_PORT=$1
fi

CONTAINER_PORT=3000

echo -e "${YELLOW}镜像名称:${NC} ${IMAGE_NAME}"
echo -e "${YELLOW}容器名称:${NC} ${CONTAINER_NAME}"
echo -e "${YELLOW}端口映射:${NC} ${HOST_PORT}:${CONTAINER_PORT}"
echo ""

# 检查镜像是否存在
if ! docker images | grep -q "${PROJECT_NAME}"; then
    echo -e "${RED}错误: 镜像 ${IMAGE_NAME} 不存在${NC}"
    echo -e "${YELLOW}请先运行: ./shell/build.sh${NC}"
    exit 1
fi

# 停止并删除已存在的容器
if docker ps -a | grep -q "${CONTAINER_NAME}"; then
    echo -e "${YELLOW}停止并删除已存在的容器...${NC}"
    docker stop "${CONTAINER_NAME}" >/dev/null 2>&1 || true
    docker rm "${CONTAINER_NAME}" >/dev/null 2>&1 || true
    echo ""
fi

# 运行容器
echo -e "${GREEN}启动 Docker 容器...${NC}"
echo ""

docker run -d \
    --name "${CONTAINER_NAME}" \
    -p ${HOST_PORT}:${CONTAINER_PORT} \
    --restart unless-stopped \
    -e NODE_ENV=production \
    ${IMAGE_NAME}

# 检查容器是否运行
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}   容器启动成功！${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "${YELLOW}容器信息:${NC}"
    docker ps | grep "${CONTAINER_NAME}"
    echo ""
    echo -e "${YELLOW}访问地址:${NC}"
    echo -e "  http://localhost:${HOST_PORT}"
    echo ""
    echo -e "${YELLOW}查看日志:${NC}"
    echo -e "  docker logs -f ${CONTAINER_NAME}"
    echo ""
    echo -e "${YELLOW}停止容器:${NC}"
    echo -e "  docker stop ${CONTAINER_NAME}"
    echo ""
    echo -e "${YELLOW}删除容器:${NC}"
    echo -e "  docker rm ${CONTAINER_NAME}"
    echo ""
else
    echo ""
    echo -e "${RED}========================================${NC}"
    echo -e "${RED}   容器启动失败！${NC}"
    echo -e "${RED}========================================${NC}"
    exit 1
fi

