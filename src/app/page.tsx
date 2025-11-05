'use client';

import { GlobalOutlined, RocketOutlined, SafetyOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Row, Space, Typography } from 'antd';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export default function Home() {
  const features = [
    {
      icon: <RocketOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
      title: '快速开发',
      description: '基于 Next.js 15 和 React 19，提供最佳的开发体验和构建性能',
    },
    {
      icon: <ThunderboltOutlined style={{ fontSize: '48px', color: '#52c41a' }} />,
      title: '高性能',
      description: '使用服务器端渲染（SSR）和静态生成（SSG），确保最佳的页面加载速度',
    },
    {
      icon: <SafetyOutlined style={{ fontSize: '48px', color: '#faad14' }} />,
      title: '类型安全',
      description: '全面使用 TypeScript，在开发阶段就能发现潜在问题，提高代码质量',
    },
    {
      icon: <GlobalOutlined style={{ fontSize: '48px', color: '#f5222d' }} />,
      title: '国际化',
      description: '内置 Ant Design 5，支持多语言和主题定制，打造现代化的用户界面',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Space direction="vertical" size="large" className="w-full">
          <Title level={1} className="!text-5xl !font-bold">
            欢迎来到 Next.js Pro
          </Title>
          <Paragraph className="!text-xl text-gray-600 max-w-2xl mx-auto">
            使用最新的 Web 技术栈构建现代化应用
            <br />
            <Text type="secondary">Next.js 15 + React 19 + Ant Design 5 + TypeScript</Text>
          </Paragraph>
          <Space size="large">
            <Link href="/about">
              <Button type="primary" size="large" icon={<RocketOutlined />}>
                了解更多
              </Button>
            </Link>
            <Button size="large" href="https://nextjs.org" target="_blank">
              查看文档
            </Button>
          </Space>
        </Space>
      </section>

      <Divider />

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <Title level={2} className="text-center !mb-12">
          核心特性
        </Title>
        <Row gutter={[32, 32]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card
                hoverable
                className="h-full text-center"
                bodyStyle={{ padding: '40px 24px' }}
              >
                <Space direction="vertical" size="middle" className="w-full">
                  <div>{feature.icon}</div>
                  <Title level={4}>{feature.title}</Title>
                  <Paragraph type="secondary">{feature.description}</Paragraph>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 border-none">
          <Space direction="vertical" size="large" className="w-full">
            <Title level={2} className="!text-white">
              准备好开始了吗？
            </Title>
            <Paragraph className="!text-white !text-lg">
              立即开始使用我们的现代化技术栈构建您的下一个项目
            </Paragraph>
            <Link href="/about">
              <Button type="default" size="large">
                联系我们
              </Button>
            </Link>
          </Space>
        </Card>
      </section>
    </div>
  );
}

