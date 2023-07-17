import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Menu, Col, Dropdown, Space, Typography, Button } from 'antd';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useResponsive } from 'ahooks';

const { Text } = Typography;


export default function UserInfoNav() {

  const responsive = useResponsive();
  const auth = useAuthUser();
  const user = auth();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(user)
  // const items = [
  //   {
  //     label: i18n.t('用戶資訊'),
  //     key: '/user/info',
  //     path: 'user/info'
  //   },
  //   {
  //     label: i18n.t('訂單記錄'),
  //     key: '/order/history',
  //     path: '/order/history'
  //   },
  // ]

  const items = [
    {
      label: <Link to='/user/info'>
        <Space>
          <UserOutlined />
          <Text>
            用戶資訊
          </Text>
        </Space>
      </Link>,
      key: '2',
    },
    {
      label: <Link to='/order/history'>
        <Space>
          <UserOutlined />
          <Text>
            訂單記錄
          </Text>
        </Space>
      </Link>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <a
        style={{ padding: 20 }}
        onClick={(e) => {
          e.preventDefault();
          localStorage.setItem('token', '')
          signOut();
          navigate(0);
        }}>

        <Space>
          <LogoutOutlined />
          <Text>
            登出
          </Text>
        </Space>
      </a>,
      key: '0',
    },
  ];

  return (
    <Col>
      {responsive.md ? <Dropdown
        menu={{
          items,
        }}
        trigger={['click']}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {user?.displayName}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown> : <>
        <Menu
          defaultSelectedKeys='/'
          selectedKeys={[location.pathname]}
          onClick={(item) => {
            navigate(`${item.key}`);
            // closeDrawer();
          }}
          mode="vertical"
          items={items}
        />
      </>}
    </Col>
  );
}
