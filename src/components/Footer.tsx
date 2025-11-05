'use client';

import { GithubOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';
import { Layout, Space, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="bg-gray-50 text-center mt-auto">
      <div className="container mx-auto py-4">
        <Space direction="vertical" size="middle" className="w-full">
          <Space size="large">
            <Link href="https://github.com" target="_blank">
              <GithubOutlined style={{ fontSize: '24px' }} />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <TwitterOutlined style={{ fontSize: '24px' }} />
            </Link>
            <Link href="https://linkedin.com" target="_blank">
              <LinkedinOutlined style={{ fontSize: '24px' }} />
            </Link>
          </Space>
          <Text type="secondary">
            © {currentYear} Next.js Pro. 使用 Next.js 15 + Ant Design 5 构建
          </Text>
        </Space>
      </div>
    </AntFooter>
  );
}

