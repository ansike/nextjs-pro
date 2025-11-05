'use client';

import { CheckCircleOutlined, RocketOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Descriptions, Row, Space, Tag, Timeline, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function AboutPage() {
  // 公司数据（可以从外部 API 获取）
  const companyData = {
    name: 'Next.js Pro',
    founded: '2024',
    employees: '50+',
    location: '中国',
  };

  const team = [
    {
      name: '张三',
      role: '首席技术官',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang',
      description: '10+ 年全栈开发经验',
    },
    {
      name: '李四',
      role: '产品经理',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Li',
      description: '专注用户体验设计',
    },
    {
      name: '王五',
      role: '前端架构师',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wang',
      description: 'React 和 Next.js 专家',
    },
    {
      name: '赵六',
      role: '后端工程师',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhao',
      description: 'Node.js 和云架构专家',
    },
  ];

  const milestones = [
    {
      dot: <CheckCircleOutlined style={{ fontSize: '16px' }} />,
      color: 'green',
      children: (
        <>
          <Text strong>2024年11月</Text>
          <br />
          <Text type="secondary">项目启动，确定技术栈</Text>
        </>
      ),
    },
    {
      dot: <RocketOutlined style={{ fontSize: '16px' }} />,
      color: 'blue',
      children: (
        <>
          <Text strong>2024年12月</Text>
          <br />
          <Text type="secondary">首个版本发布</Text>
        </>
      ),
    },
    {
      dot: <TeamOutlined style={{ fontSize: '16px' }} />,
      color: 'orange',
      children: (
        <>
          <Text strong>2025年1月</Text>
          <br />
          <Text type="secondary">团队扩展到50+成员</Text>
        </>
      ),
    },
    {
      dot: <TrophyOutlined style={{ fontSize: '16px' }} />,
      color: 'gold',
      children: (
        <>
          <Text strong>2025年Q2</Text>
          <br />
          <Text type="secondary">获得行业认可</Text>
        </>
      ),
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Title level={1} className="!text-white !mb-6">
            关于我们
          </Title>
          <Paragraph className="!text-white !text-xl max-w-3xl mx-auto">
            我们致力于使用最新的 Web 技术为客户提供高质量的解决方案
          </Paragraph>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="mb-8">
          <Title level={2} className="!mb-6">
            公司信息
          </Title>
          <Descriptions bordered column={{ xs: 1, sm: 2, md: 2 }}>
            <Descriptions.Item label="公司名称">{companyData.name}</Descriptions.Item>
            <Descriptions.Item label="成立时间">{companyData.founded}</Descriptions.Item>
            <Descriptions.Item label="员工规模">{companyData.employees}</Descriptions.Item>
            <Descriptions.Item label="所在地区">{companyData.location}</Descriptions.Item>
            <Descriptions.Item label="技术栈" span={2}>
              <Space wrap>
                <Tag color="blue">Next.js 15</Tag>
                <Tag color="cyan">React 19</Tag>
                <Tag color="purple">TypeScript</Tag>
                <Tag color="geekblue">Ant Design 5</Tag>
                <Tag color="green">Tailwind CSS</Tag>
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Mission Section */}
        <Card className="mb-8 bg-gradient-to-br from-blue-50 to-purple-50 border-none">
          <Space direction="vertical" size="large" className="w-full">
            <Title level={3}>我们的使命</Title>
            <Paragraph className="!text-lg">
              通过创新的技术解决方案，帮助企业实现数字化转型。我们相信技术的力量可以改变世界，
              因此我们始终坚持使用最新、最可靠的技术栈，为客户创造最大价值。
            </Paragraph>
            <Paragraph className="!text-lg">
              我们的团队由一群充满激情的开发者组成，他们不仅精通技术，更懂得如何将技术转化为商业价值。
              我们致力于打造高性能、易维护、可扩展的 Web 应用，让每一个项目都成为经典之作。
            </Paragraph>
          </Space>
        </Card>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <Title level={2} className="text-center !mb-12">
          核心团队
        </Title>
        <Row gutter={[32, 32]}>
          {team.map((member, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card hoverable className="text-center h-full">
                <Space direction="vertical" size="middle" className="w-full">
                  <Avatar size={100} src={member.avatar} />
                  <div>
                    <Title level={4} className="!mb-1">
                      {member.name}
                    </Title>
                    <Text type="secondary">{member.role}</Text>
                  </div>
                  <Paragraph type="secondary" className="!mb-0">
                    {member.description}
                  </Paragraph>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Timeline Section */}
      <section className="container mx-auto px-4 py-16">
        <Card>
          <Title level={2} className="text-center !mb-12">
            发展历程
          </Title>
          <div className="max-w-3xl mx-auto">
            <Timeline items={milestones} mode="left" />
          </div>
        </Card>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-16">
        <Title level={2} className="text-center !mb-12">
          核心价值观
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card className="h-full text-center bg-blue-50 border-blue-200">
              <Space direction="vertical" size="middle" className="w-full">
                <Title level={3} className="!text-blue-600">
                  创新
                </Title>
                <Paragraph>
                  持续探索新技术，不断推陈出新，为客户提供最前沿的解决方案
                </Paragraph>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="h-full text-center bg-green-50 border-green-200">
              <Space direction="vertical" size="middle" className="w-full">
                <Title level={3} className="!text-green-600">
                  质量
                </Title>
                <Paragraph>
                  严格的代码审查和测试流程，确保每一行代码都达到最高标准
                </Paragraph>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="h-full text-center bg-purple-50 border-purple-200">
              <Space direction="vertical" size="middle" className="w-full">
                <Title level={3} className="!text-purple-600">
                  协作
                </Title>
                <Paragraph>
                  开放透明的沟通文化，团队协作创造更大价值
                </Paragraph>
              </Space>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
}

