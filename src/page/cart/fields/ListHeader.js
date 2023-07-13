import { Row, Col, Typography, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { useCart } from 'shared/cart';

const {Title} = Typography;

export default function ListHeader() {

  const { cart, selectedItems, onSelectAll, setSelectedItems } = useCart();

  return (
    <Row style={{ paddingLeft: 25, paddingRight: 25 }} gutter={10} align='middle'>
      <Col span={1}>
        <Checkbox checked={cart.length === selectedItems.length && cart.length > 0} onChange={(value) => {
          // console.log(value.target.checked)
          if (value.target.checked) {
            onSelectAll()
          } else {
            setSelectedItems([]);
          }
        }} />
      </Col>
      <Col span={3}>
        <Title level={5} style={{ margin: 0 }}>
          圖片
        </Title>
      </Col>
      <Col span={5}>
        <Title level={5} style={{ margin: 0 }}>
          名稱
        </Title>
      </Col>
      <Col span={3}>
        <Title level={5} style={{ margin: 0 }}>
          規格
        </Title>
      </Col>
      <Col span={3}>
        <Title level={5} style={{ margin: 0 }}>
          單價
        </Title>
      </Col>
      <Col span={3}>
        <Title level={5} style={{ margin: 0 }}>
          數量
        </Title>
      </Col>
      <Col span={3}>
        <Title level={5} style={{ margin: 0 }}>
          總計
        </Title>
      </Col>
      <Col span={3}>
        <Title level={5} style={{ margin: 0 }}>
          操作
        </Title>
      </Col>
    </Row>
  );
}
