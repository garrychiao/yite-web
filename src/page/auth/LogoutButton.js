import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Col, Dropdown, Space, Button } from 'antd';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import { Link } from 'react-router-dom';

export default function LoginButton() {

  const auth = useAuthUser();
  const user = auth();
  const signOut = useSignOut();

  console.log(user)
  const items = [
    {
      label: <Link to='/user/info'>User Info</Link>,
      key: '1',
    },
    {
      label: <a 
      style={{width: 200}}
      onClick={(e) => {
        e.preventDefault();
        signOut();
      }}>Sign Out</a>,
      key: '0',
    },
    // {
    //   type: 'divider',
    // },
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
          { user?.displayName }
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
    </Col>
  );
}
