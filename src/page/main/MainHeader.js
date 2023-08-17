import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Image, Space, Drawer, Badge, Layout, Menu, Button, Divider, Row, Col, Dropdown, Typography } from 'antd';
import color from 'shared/style/color';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import i18n from 'i18next';
import { UserInfoNav } from './fields';
import { useIsAuthenticated, useAuthUser, useSignOut } from 'react-auth-kit'
import { UserOutlined, ShoppingCartOutlined, MenuOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { useCart } from 'shared/cart';
import { useBoolean, useResponsive } from 'ahooks';
import { MainNavItems, UserNavItems } from './fields/NavItems';
import LOGO_IMAGE from 'asset/img/LOGO.png';

const { Text } = Typography;

export default function MainHeader() {
  // const responsive = useResponsive();
  const authed = useIsAuthenticated();
  const auth = useAuthUser()
  const user = auth();
  const responsive = useResponsive();
  const { hasProduct } = useCart();
  const signOut = useSignOut();

  const navigate = useNavigate();
  const location = useLocation();
  // console.log(window.location.origin)
  const [showDrawer, { toggle: toggleDrawer, setFalse: closeDrawer }] = useBoolean(false);
  const MobileNavItems = useMemo(() => {
    if (user?.displayName) {
      return MainNavItems.filter(i => i.key !== 'logo').concat([{ label: <Divider /> }, ...UserNavItems])
    }
    return MainNavItems
  }, [MainNavItems, UserNavItems, user])

  const SignoutButton = () => (<a
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
  </a>)

  const SignInButton = () => (<a
    style={{ padding: 20 }}
    onClick={(e) => {
      e.preventDefault();
      navigate('/login');
      closeDrawer();
    }}>
    <Space>
      <UserOutlined />
      <Text>
        登入
      </Text>
    </Space>
  </a>)


  return (
    <StyledHeader>
      {responsive.md ? <Row justify={'space-between'} style={{ width: '100%' }}>
        <Menu
          // defaultSelectedKeys='/'
          selectedKeys={[location.pathname]}
          onClick={(item) => {
            navigate(`${item.key}`);
          }}
          mode="horizontal"
          items={MainNavItems}
        />
        <RightNavContainer>
          {authed() ? <Row align="middle" gutter={25}>
            <Col style={{ display: 'flex' }}>
              <Badge dot={hasProduct} >
                <Link to='/cart'>
                  <ShoppingCartOutlined style={{ fontSize: 24 }} />
                </Link>
              </Badge>
            </Col>
            <Col>
              <Dropdown
                menu={{
                  items: UserNavItems.map((item, index) => ({
                    label: (<Link to={item.path} style={{ padding: 20 }}>
                      <Space>
                        {item?.icon}
                        <Text>
                          {item?.label}
                        </Text>
                      </Space>
                    </Link>),
                    key: index
                  })).concat([{
                    type: <Divider />
                  },
                  {
                    label: <SignoutButton />,
                    key: 'signout',
                  }]),
                }}
                trigger={['click']}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <span style={{ color: user?.enable ? 'inherit' : 'red' }}>
                      {user?.displayName}
                    </span>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Col>
          </Row> : <SignInButton />}
        </RightNavContainer>
      </Row> : <>
        <Row style={{ width: '100%' }} align='middle' justify='space-between'>
          <Col>
            <Image src={LOGO_IMAGE} width={120} preview={false} onClick={() => {
              navigate('/')
            }} />
          </Col>
          <Col>
            <Button icon={<MenuOutlined />} size='large' onClick={toggleDrawer} />
          </Col>
        </Row>
        <Drawer title="" placement="right" width='60%' onClose={toggleDrawer} open={showDrawer}>
          <Menu
            defaultSelectedKeys='/'
            selectedKeys={[location.pathname]}
            onClick={(item) => {
              navigate(`${item.key}`);
              closeDrawer();
            }}
            mode="vertical"
            items={MobileNavItems}
          />
          <Divider />
          {authed() ? <SignoutButton /> : <SignInButton />}
        </Drawer>
      </>}
    </StyledHeader>
  );
}

// web styles
const StyledHeader = styled(Layout.Header)`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c0c0c0;
  overflow: hidden;
  @media (max-width: 767px) {
    padding: 20px;
    justify-content: right;
  }
`;

const RightNavContainer = styled.div`
  font-size: 20px;
`