import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Layout, Menu, Button } from 'antd';
import color from 'shared/style/color';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import i18n from 'i18next';
import { useAuth } from 'shared/auth';
import { LoginButton, LogoutButton } from 'page/auth';
import {useAuthUser} from 'react-auth-kit'


export default function MainHeader() {
  // const responsive = useResponsive();
  const auth = useAuthUser()
  const user = auth();

  const navigate = useNavigate();
  const location = useLocation();
  // console.log(window.location.origin)

  
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
  ]

  return (
    <StyledHeader>
      <Menu 
        defaultSelectedKeys='/'
        selectedKeys={[location.pathname]}
        onClick={(item) => {
          navigate(`${item.key}`);
        }} 
        mode="horizontal" 
        items={items} 
      />
      
      { user?.displayName ? <LogoutButton /> : <Link to='/login'>
        <Button>
          Login
        </Button>
      </Link> }
      

      
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
