import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Col, Dropdown, Space, Typography, Button } from 'antd';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import { Link } from 'react-router-dom';
import {
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const { Text } = Typography;


export default function UserInfoNav() {

  const auth = useAuthUser();
  const user = auth();
  const signOut = useSignOut();

  // console.log(user)
  const items = [
    {
      label: <Link to='/user/info' style={{ padding: 20 }}>
        <Space>
          <UserOutlined />
          <Text>
            User Info
          </Text>
        </Space>
      </Link>,
      key: '2',
    },
    {
      label: <Link to='/order/history' style={{ padding: 20 }}>
        <Space>
          <UserOutlined />
          <Text>
            Order History
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
        }}>

        <Space>
          <LogoutOutlined />
          <Text>
            Sign Out
          </Text>
        </Space>
      </a>,
      key: '0',
    },
    
    // {
    //   label: '3rd menu item',
    //   key: '3',
    // },
  ];

  return (
    <Col>
      <Dropdown
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
      </Dropdown>
    </Col>
  );
}
