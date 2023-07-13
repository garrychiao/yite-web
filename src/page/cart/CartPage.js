// import { Suspense } from 'react';
import styled from 'styled-components';
import { Divider, Row, Col, Typography, Button, Image } from 'antd';
import _ from 'lodash';
import color from 'shared/style/color';
import i18n from 'i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Section } from 'shared/layout';
import { ProductCard, ListHeader } from './fields';
import { useCart } from 'shared/cart';
import CurrencyFormat from 'react-currency-format';

const { Title } = Typography;

export default function CartPage() {

  const { cart, fetchCart, hasProduct } = useCart();
  // console.log(`cart`)
  // console.log(cart)

  return (
    <Section.Container>
      <Section>
        <Title level={4}>購物車</Title>
        <Divider />
        <ProductListContainer>
          <ListHeader />
          {
            hasProduct ? cart.map((item, index) => (
              <ProductCard product={item} key={index} />
            )) : <Row justify={'center'}>
              <Col>
                <Title level={5}>
                  尚無商品
                </Title>
              </Col>
            </Row>
          }
        </ProductListContainer>
        {
          hasProduct ? <>
            <Divider />
            <Row justify={'space-around'}>
              <Col />
              <Col>
                <Title level={5}>總計：
                  <CurrencyFormat
                    value={_.sum(cart.map(item => item.unitPrice * item.qty))}
                    thousandSeparator={true}
                    prefix={'$'}
                    displayType='text'
                  />
                </Title>
              </Col>
            </Row>
          </> : <></>
        }
        <Row justify={'space-around'} style={{ paddingTop: 50 }}>
          <Col>
            <Link to='/order/confirm'>
              <Button size='large' disabled={!hasProduct}>
                去買單
              </Button>
            </Link>
          </Col>
        </Row>
      </Section>
    </Section.Container>
  );
}

const ProductListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`