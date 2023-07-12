import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button, Space, Card, Divider, Row, Col, Typography, Carousel, Image } from 'antd';
import color from 'shared/style/color';
import i18n from 'i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Section } from 'shared/layout';
import CurrencyFormat from 'react-currency-format';
import CartCountOperator from 'shared/cartCountOperator';

const { Title } = Typography;

export default function ProductCard({ product = {}, form }) {

  const [quantity, setQuantity] = useState(1);
  const onCartCounterChange = (value) => {
    console.log(value);
    setQuantity(value);
  }

  const total = useMemo(() => quantity * product.unitPrice, [quantity]);



  return (
    <StyledCard>
      <Row gutter={10} align='middle'>
        <Col span={3}>
          <Image width='100%' src={product.image} preview={false} />
        </Col>
        <Col span={5}>
          <Title level={5} style={{ margin: 0 }}>
            {product.productName}
          </Title>
        </Col>
        <Col span={4}>
          <Title level={5} style={{ margin: 0 }}>
            無
          </Title>
        </Col>
        <Col span={3}>
          <Space direction='vertical'>
            <CurrencyFormat
              value={product.defaultPrice}
              thousandSeparator={true}
              prefix={'$'}
              displayType='text'
              renderText={value => <StyledDefaultPrice>{value}</StyledDefaultPrice>}
            />
            <CurrencyFormat
              value={product.unitPrice}
              thousandSeparator={true}
              prefix={'$'}
              displayType='text'
              renderText={value => <StyledUnitPrice>{value}</StyledUnitPrice>}
            />
          </Space>
        </Col>
        <Col span={3}>
          <CartCountOperator onChange={(value) => onCartCounterChange(value)} />
        </Col>
        <Col span={3}>
          <CurrencyFormat
            value={total}
            thousandSeparator={true}
            prefix={'$'}
            displayType='text'
            renderText={value => <StyledUnitPrice>{value}</StyledUnitPrice>}
          />
        </Col>
        <Col span={3}>
          <Button danger>刪除</Button>         
        </Col>
      </Row>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  width: 100%;
`

const StyledDefaultPrice = styled.div`
  text-decoration: line-through;
  color: #a0a0a0;
`

const StyledUnitPrice = styled.div`
  font-size: large;
`