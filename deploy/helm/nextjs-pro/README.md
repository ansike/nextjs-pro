# Next.js Pro Helm Chart

这是一个用于部署 Next.js Pro 应用的 Helm Chart。

## 前置要求

- Kubernetes 1.19+
- Helm 3.2.0+
- Ingress Controller (如果启用 Ingress)

## 安装

### 基本安装

```bash
helm install nextjs-pro ./deploy/helm/nextjs-pro
```

### 指定命名空间

```bash
helm install nextjs-pro ./deploy/helm/nextjs-pro -n production --create-namespace
```

### 自定义配置

```bash
helm install nextjs-pro ./deploy/helm/nextjs-pro \
  --set image.tag=0.2.0 \
  --set replicaCount=3 \
  --set ingress.hosts[0].host=your-domain.com
```

### 使用自定义 values 文件

```bash
helm install nextjs-pro ./deploy/helm/nextjs-pro -f custom-values.yaml
```

## 升级

```bash
helm upgrade nextjs-pro ./deploy/helm/nextjs-pro
```

## 卸载

```bash
helm uninstall nextjs-pro
```

## 配置参数

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `replicaCount` | Pod 副本数 | `1` |
| `image.repository` | 镜像仓库 | `docker.io/ansike/nextjs-pro` |
| `image.tag` | 镜像标签 | `0.1.0` |
| `image.pullPolicy` | 镜像拉取策略 | `IfNotPresent` |
| `service.type` | Service 类型 | `ClusterIP` |
| `service.port` | Service 端口 | `3000` |
| `ingress.enabled` | 是否启用 Ingress | `true` |
| `ingress.className` | Ingress Class 名称 | `nginx` |
| `ingress.hosts[0].host` | Ingress 主机名 | `nextjs-pro.local` |
| `resources.limits.cpu` | CPU 限制 | `500m` |
| `resources.limits.memory` | 内存限制 | `512Mi` |
| `resources.requests.cpu` | CPU 请求 | `250m` |
| `resources.requests.memory` | 内存请求 | `256Mi` |
| `livenessProbe.enabled` | 是否启用存活探针 | `true` |
| `readinessProbe.enabled` | 是否启用就绪探针 | `true` |
| `env` | 环境变量列表 | `[{name: NODE_ENV, value: production}]` |

## 示例配置

### 生产环境配置

创建 `values-prod.yaml`:

```yaml
replicaCount: 3

image:
  tag: "0.1.0"
  pullPolicy: Always

ingress:
  enabled: true
  className: nginx
  hosts:
    - host: nextjs-pro.example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: nextjs-pro-tls
      hosts:
        - nextjs-pro.example.com

resources:
  limits:
    cpu: 1000m
    memory: 1Gi
  requests:
    cpu: 500m
    memory: 512Mi

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
```

安装：

```bash
helm install nextjs-pro ./deploy/helm/nextjs-pro -f values-prod.yaml -n production
```

### 开发环境配置

```bash
helm install nextjs-pro ./deploy/helm/nextjs-pro \
  --set replicaCount=1 \
  --set ingress.hosts[0].host=nextjs-pro.dev.local \
  --set resources.limits.cpu=250m \
  --set resources.limits.memory=256Mi \
  -n development --create-namespace
```

## 验证部署

```bash
# 查看 release 状态
helm status nextjs-pro

# 查看部署的 Pod
kubectl get pods -l app.kubernetes.io/name=nextjs-pro

# 查看 Service
kubectl get svc -l app.kubernetes.io/name=nextjs-pro

# 查看 Ingress
kubectl get ingress -l app.kubernetes.io/name=nextjs-pro
```

## 调试

```bash
# 渲染模板但不安装
helm template nextjs-pro ./deploy/helm/nextjs-pro

# 调试安装
helm install nextjs-pro ./deploy/helm/nextjs-pro --dry-run --debug

# 查看生成的 Kubernetes 清单
helm get manifest nextjs-pro
```

## 健康检查

Chart 默认启用健康检查：

- **Liveness Probe**: 40 秒后开始检查，每 30 秒检查一次
- **Readiness Probe**: 10 秒后开始检查，每 10 秒检查一次

可以通过 values 文件禁用或调整：

```yaml
livenessProbe:
  enabled: false

readinessProbe:
  enabled: true
  initialDelaySeconds: 15
  periodSeconds: 5
```

## 故障排查

### Pod 无法启动

```bash
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```

### Ingress 无法访问

```bash
kubectl describe ingress <ingress-name>
# 检查 Ingress Controller 是否正常运行
kubectl get pods -n ingress-nginx
```

### 查看 Helm Release 历史

```bash
helm history nextjs-pro
```

### 回滚到上一个版本

```bash
helm rollback nextjs-pro
```

## 许可证

MIT

