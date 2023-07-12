// import { Suspense } from 'react';
import styled from 'styled-components';
import { Divider, Row, Col, Typography, Button, Image } from 'antd';
import color from 'shared/style/color';
import i18n from 'i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Section } from 'shared/layout';
import { ProductCard, ListHeader } from './fields';

const { Title } = Typography;

export default function CartPage() {

  const cartData = [
    {
      id: "ff3d1b61-deaf-47b3-9dc3-6793a9ce830a",
      productName: "12倍200萬網路快速球",
      productNo: "DJS-4SIL212B",
      quantity: 2,
      unitPrice: 24000,
      defaultPrice: 30000,
      image: 'https://fakeimg.pl/300/',
    },
    {
      id: "ff3d1b61-deaf-47b3-9dc3-6793a9ce830a",
      productName: "12倍200萬網路快速球",
      productNo: "DJS-4SIL212B",
      quantity: 2,
      unitPrice: 24000,
      defaultPrice: 30000,
      image: 'https://fakeimg.pl/300/',
    }
  ]

  return (
    <Section.Container>
      <Section>
        <Title level={4}>購物車</Title>
        <Divider />
        <ProductListContainer>
          <ListHeader />
          {
            cartData.map((item, index) => (
              <ProductCard product={item} key={index} />
            ))
          }
        </ProductListContainer>
        <Row justify={'space-around'} style={{paddingTop: 50}}>
          <Col>
            <Link to='/order/confirm'>
              <Button size='large'>
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