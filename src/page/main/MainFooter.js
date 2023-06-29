import { Suspense } from 'react';
import styled from 'styled-components';
import { Layout, Menu, Space, Image } from 'antd';
import color from 'shared/style/color';
import { useLocation, useNavigate } from 'react-router-dom';
import i18n from 'i18next';
import FooterLogoImage from 'asset/image/footer-logo.png'
import FooterListIcon from 'asset/image/footer-list-icon.png'
import { PawButton } from 'shared/button';

const { Footer } = Layout;

export default function MainFooter() {
  // const responsive = useResponsive();
  const location = useLocation();
  const navigation = useNavigate();

  const navigations = [
    {
      label: i18n.t('關於保個毛'),
      key: 'aboutUs',
      path: './about-us'
    },
    {
      label: i18n.t('隱私條款'),
      key: 'privacy',
      path: '/privacy'
    },
    {
      label: i18n.t('聯絡我們'),
      key: 'compare',
      linkTo: 'mailto:pocketmeow.official@gmail.com',
    },
    {
      label: i18n.t('FB'),
      key: 'fb',
      linkTo: 'https://www.facebook.com/pocketmeow',
    },
    {
      label: i18n.t('IG'),
      key: 'ig',
      linkTo: 'https://www.instagram.com/pocketmeow.official/',
    },
  ]

  return (
    <StyledFooter>
      <LogoLayout>
        <Space>
          <Image src={FooterLogoImage} preview={false} width={60} />
          Copyright © 2023 保個毛
        </Space>
      </LogoLayout>
      <StyledMenu
        style={{justifyContent: 'end', marginRight:25, alignItems: 'center'}}
        selectedKeys={[location.pathname]}
        mode="horizontal">
        {navigations.map((nav) => (<StyledMenuItem key={nav.key} onClick={() => { 
          if (nav.path) {
            location.pathname === nav.path ? navigation(0) : navigation(nav.path) 
          } else if (nav.linkTo) {
            window.open(nav.linkTo, '_blank');
          }
          }}>
          <Image src={FooterListIcon} preview={false} width={50} /> {nav.label}
        </StyledMenuItem>))}
      </StyledMenu>
    </StyledFooter>
  );
}

// web styles
const StyledFooter = styled(Footer)`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  height: 100px;
  background: #f8dabf;
  box-shadow: 0 2px 3px ${color.shadow};
  @media(max-width: 991px) {
    display: none;
  }
  .ant-menu-horizontal {
    border-bottom: none;
  }
  .ant-menu {
    background: transparent;
  }
`;


const LogoLayout = styled.div`
  display: flex;
  align-items: center;
  color: #927e62;
  font-size: 18px;
`;

const StyledMenu = styled.div`
  display: flex;
  @media(max-width: 991px) {
    display: none;
  }
`;


const StyledMenuItem = styled.div`
  border: none;
  background: transparent;
  color: #927e62;
  flex: 1 1 auto;
  cursor: pointer;
  :after {
    border-bottom: none !important;
  }
  @media(max-width: 767px) {
    border-radius: 15px;
    margin-left: -15px;
    padding-right: 0px !important;
  }
`;
