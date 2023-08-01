import { useMemo, useState } from 'react';
import _ from 'lodash';
// import styled from 'styled-components';
import { Card, Button, Space, Table, List, Image, Row, Col, Divider, Typography, notification } from 'antd';
import dayjs from 'dayjs';
import { useAuthUser } from 'react-auth-kit';
import { Section } from 'shared/layout';
import { orderApi, cartApi } from 'page/api';
import { useRequest } from 'ahooks';
import getSysFileUrl from 'utils/apiSysFiles';
import CurrencyFormat from 'react-currency-format';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from 'shared/cart';

const { Title, Text, Paragraph } = Typography;

const getStatusName = (status) => {
  switch (status) {
    case 'DRAFT': {
      return '草稿'
    }
    case 'INIT': {
      return '訂單建立，未付款'
    }
    case 'WAITING': {
      return '付款完成，等待確認'
    }
    case 'CONFIRM': {
      return '訂單已確認，出貨中'
    }
    case 'SHIP': {
      return ' 已出貨'
    }
    case 'FINISH': {
      return '訂單已完成'
    }
    case 'CANCEL': {
      return '訂單取消'
    }
    case 'OVERDUE': {
      return '訂單過期'
    }
    default: {
      return '不明'
    }
  }
}

export default function OrderDetail() {

  const auth = useAuthUser();
  // const user = useMemo(() => auth() || {}, [auth]);
  const navigate = useNavigate();
  const { fetchCart } = useCart();
  const [loadingBuyAgain, setLoadingBuyAgain] = useState(false);

  const { id } = useParams();
  console.log(id)

  const { data: orderData, loading: loadingList } = useRequest(() => orderApi.get(id));
  // console.log(orderData)
  const order = useMemo(() => orderData || {}, [orderData]);
  const orderItems = useMemo(() => orderData?.orderItems || [], [order]);


  return (
    <Section.Container>
      <Section>
        <Title level={4}>訂單明細</Title>
        <Divider />
        <Row gutter={20}>
          <Col xs={24} sm={6} md={6}>
            <Card>
              <Row>
                <Col>
                  <Title level={4}>狀態：{getStatusName(order?.status)}</Title>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Title level={5}>日期：{dayjs(order.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Title>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Title level={5}>金額：<CurrencyFormat
                    value={order.totalPrice}
                    thousandSeparator={true}
                    prefix={'$'}
                    displayType='text'
                  /></Title>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} sm={18}>
            <Card>
              <Title level={5}>訂單明細</Title>
              <Divider />
              <List
                dataSource={orderItems}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Image width={100} preview={false} src={getSysFileUrl(item.images[0].imageSysFileId)} />
                      }
                      title={
                        <Title
                          style={{ cursor: 'pointer' }}
                          level={5}
                          onClick={() => {
                            navigate(`/category/productDetail/${item.product.id}`)
                          }}>
                          {item.product.productName}
                        </Title>}
                      description={<Space direction='vertical'>
                        <Text>規格：{item.selectedProductSpecs.length ? item.selectedProductSpecs.map(item => item.itemName).join('、') : <>無</>}</Text>
                        <Text>單價：
                          <CurrencyFormat
                            value={item.price}
                            thousandSeparator={true}
                            prefix={'$'}
                            displayType='text'
                          />
                        </Text>
                        <Text>數量：
                          <CurrencyFormat
                            value={item.qty}
                            thousandSeparator={true}
                            displayType='text'
                          />
                        </Text>
                        <Text>合計：
                          <CurrencyFormat
                            value={item.price * item.qty}
                            thousandSeparator={true}
                            prefix={'$'}
                            displayType='text'
                          />
                        </Text>
                      </Space>}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={20} style={{ paddingTop: 20 }}>
          <Col sm={12} xs={24}>
            <Card>
              <Title level={5}>訂購人</Title>
              <Divider />
              <Space direction='vertical'>
                <Text>姓名：{order.orderName}</Text>
                <Text>Email：{order.orderEmail}</Text>
                <Text>聯絡電話：{order.orderPhone}</Text>
                <Text>地址：{order.orderAddress}</Text>
                <Text>郵遞區號：{order.orderZipcode}</Text>
              </Space>
            </Card>
          </Col>
          <Col sm={12} xs={24}>
            <Card>
              <Title level={5}>收件人</Title>
              <Divider />
              <Space direction='vertical'>
                <Text>姓名：{order.receiverName}</Text>
                <Text>Email：{order.receiverEmail}</Text>
                <Text>聯絡電話：{order.receiverPhone}</Text>
                <Text>地址：{order.receiverAddress}</Text>
                <Text>郵遞區號：{order.receiverZipcode}</Text>
              </Space>
            </Card>
          </Col>
        </Row>
      </Section>
    </Section.Container>
  );
}
