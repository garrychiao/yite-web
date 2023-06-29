import { useMemo } from 'react';
import styled from 'styled-components';
import { Layout, Menu, Image } from 'antd';
import color from 'shared/style/color';
import { useLocation, useNavigate } from 'react-router-dom';
import i18n from 'i18next';
import { Link } from 'react-router-dom';

export default function MainHeader() {
  // const responsive = useResponsive();
  const location = useLocation();

  
  const navigations = [
    {
      label: i18n.t('首頁'),
      key: 'home',
      path: '/'
    },
    {
      label: i18n.t('保單管理'),
      key: 'management',
      path: '/manage'
    },
    {
      label: i18n.t('保單比較'),
      key: 'compare',
      path: '/compare'
    },
    {
      label: i18n.t('登入／註冊'),
      key: 'login',
      path: '/login',
    },
  ]

  return (
    <StyledHeader>
      
    </StyledHeader>
  );
}

// web styles
const StyledHeader = styled(Layout.Header)`
  
`;
