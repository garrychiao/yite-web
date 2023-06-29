import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Layout, Menu, Image } from 'antd';
import color from 'shared/style/color';
import { useLocation, useNavigate } from 'react-router-dom';
import i18n from 'i18next';

export default function MainHeader() {
  // const responsive = useResponsive();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname)
  
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
    </StyledHeader>
  );
}

// web styles
const StyledHeader = styled(Layout.Header)`
  background-color: #fff;
`;
