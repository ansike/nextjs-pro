'use client';

import { HomeOutlined, TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const items: MenuProps['items'] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link href="/">首页 V0.2.0</Link>,
    },
    {
      key: '/about',
      icon: <TeamOutlined />,
      label: <Link href="/about">关于我们</Link>,
    },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto">
        <Menu
          mode="horizontal"
          selectedKeys={[pathname]}
          items={items}
          style={{ border: 'none', display: 'flex', justifyContent: 'center' }}
        />
      </div>
    </header>
  );
}

