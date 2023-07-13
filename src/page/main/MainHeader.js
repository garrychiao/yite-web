import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Badge, Layout, Menu, Button, Space, Row, Col } from 'antd';
import color from 'shared/style/color';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import i18n from 'i18next';
import { useAuth } from 'shared/auth';
import { LoginButton, UserInfoNav } from 'page/auth';
import { useAuthUser } from 'react-auth-kit'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from 'shared/cart';

export default function MainHeader() {
  // const responsive = useResponsive();
  const auth = useAuthUser()
  const user = auth();
  const { hasProduct } = useCart();

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

      <RightNavContainer>
        {user?.displayName ? <Row align="middle" gutter={15}>
          <Col style={{display: 'flex'}}>
            <Badge dot={hasProduct} >
              <Link to='/cart'  style={{ fontSize: 24 }}>
                <ShoppingCartOutlined />
              </Link>
            </Badge>
          </Col>
          <Col>
            <UserInfoNav />
          </Col>
        </Row> : <Link to='/login'>
          <Button>
            Login
          </Button>
        </Link>}
      </RightNavContainer>
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

const RightNavContainer = styled.div`
  font-size: 20px;
`