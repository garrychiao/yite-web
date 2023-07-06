import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Layout, Menu, Button } from 'antd';
import color from 'shared/style/color';
import { useLocation, useNavigate } from 'react-router-dom';
import i18n from 'i18next';
import { useAuth } from 'shared/auth';

export default function MainHeader() {
  // const responsive = useResponsive();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.pathname)

  const { user, switchUser } = useAuth();
  
  const items = [
    {
      label: i18n.t('首頁'),
      key: '/',
      path: ''
    },
    {
      label: i18n.t('產品資訊'),
      key: '/category',
      path: '/category'
    },
    // {
    //   label: i18n.t('保單比較'),
    //   key: '/compare',
    //   path: '/compare'
    // },
    // {
    //   label: i18n.t('登入／註冊'),
    //   key: '/login',
    //   path: '/login',
    // },
  ]

  return (
    <StyledHeader>
      <Menu 
        defaultSelectedKeys='/'
        selectedKeys={[location.pathname]}
        onClick={(item) => {
          console.log(item)
          navigate(`${item.key}`);
        }} 
        mode="horizontal" 
        items={items} 
      />
      <Button onClick={() => {
        switchUser();
      }}>{user?.name}</Button>
    </StyledHeader>
  );
}

// web styles
const StyledHeader = styled(Layout.Header)`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
