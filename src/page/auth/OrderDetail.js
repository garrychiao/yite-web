import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
// import styled from 'styled-components';
import { Card, Button, Space, Popconfirm, List, Image, Row, Col, Divider, Typography, notification, Spin, Tag } from 'antd';
import dayjs from 'dayjs';
import { useAuthUser } from 'react-auth-kit';
import { Section } from 'shared/layout';
import { orderApi, cartApi } from 'page/api';
import { useRequest } from 'ahooks';
import getSysFileUrl from 'utils/apiSysFiles';
import CurrencyFormat from 'react-currency-format';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useCart } from 'shared/cart';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getOrderStatus } from 'utils/OrderStatus';

const { Title, Text, Paragraph } = Typography;

export default function OrderDetail() {

  // const user = useMemo(() => auth() || {}, [auth]);
  const navigate = useNavigate();

  const { id } = useParams();
  // console.log(id)

  const { data: orderData, loading: loadingList, run: runGetOrder } = useRequest(() => orderApi.get(id));
  console.log(orderData)
  const order = useMemo(() => orderData || {}, [orderData]);
  const orderItems = useMemo(() => order?.orderItems || [], [order]);
  const orderStatus = useMemo(() => {
    return getOrderStatus(order?.status);
  }, [order])

  const { run: runCancelOrder, loading: loadingCancel } = useRequest(() => orderApi.cancel(id), {
    manual: true,
    onSuccess: (res) => {
      console.log(res)
      notification.success({
        message: '成功取消訂單'
      })
      runGetOrder();
    },
    onError: (error) => {
      console.error(error)
    },
  });

  return (
    <Section.Container>
      <Section>
        <Spin spinning={loadingList || loadingCancel}>
          <Row>
            <Col>
              <Link to='/order/history'>
                <ArrowLeftOutlined /> 返回
              </Link>
            </Col>
          </Row>
          <Row gutter={[20, 20]} style={{ paddingTop: 20 }}>
            <Col xs={24} sm={8} md={8}>
              <Card hoverable style={{ backgroundColor: 'white' }}>
                <Row justify={'space-between'} align={'middle'}>
                  <Col>
                    <Title level={4} style={{ color: orderStatus?.color, margin: 0 }}>狀態：{orderStatus.value}</Title>
                  </Col>
                  {order.isMonthClose && <Col>
                    <Tag color='blue'>月結訂單</Tag>
                  </Col>}
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
                <Row>
                  <Col>
                    <Title level={5}>訂單編號：{order.orderNo}</Title>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Title level={5}>付款編號：{order.payment?.paymentNo}</Title>
                  </Col>
                </Row>
                {
                  orderStatus?.cancelable && <Row>
                    <Col style={{ marginTop: 20 }}>
                      <Popconfirm
                        title="取消訂單"
                        description="確定要取消訂單嗎？"
                        onConfirm={() => {
                          runCancelOrder();
                        }}
                        okText="確認取消"
                        cancelText="返回"
                      >
                        <Button danger>取消訂單</Button>
                      </Popconfirm>
                    </Col>
                  </Row>
                }
              </Card>
            </Col>
            <Col sm={8} xs={24}>
              <Card hoverable style={{ backgroundColor: 'white' }}>
                <Title style={{ margin: 0 }} level={4}>訂購人</Title>
                <Divider />
                <Space direction='vertical'>
                  <Text style={{ fontSize: 'large' }}>姓名：{order.orderName}</Text>
                  <Text style={{ fontSize: 'large' }}>Email：{order.orderEmail}</Text>
                  <Text style={{ fontSize: 'large' }}>聯絡電話：{order.orderPhone}</Text>
                  <Text style={{ fontSize: 'large' }}>地址：{order.orderAddress}</Text>
                  <Text style={{ fontSize: 'large' }}>郵遞區號：{order.orderZipcode}</Text>
                </Space>
              </Card>
            </Col>
            <Col sm={8} xs={24}>
              <Card hoverable style={{ backgroundColor: 'white' }}>
                <Row align='middle' gutter={20}>
                  <Col>
                    <Title style={{ margin: 0 }} level={4}>收件人</Title>
                  </Col>
                  <Col>
                    {order.sameAsOrderer && <Tag style={{ margin: 0 }} color='green'>同訂購人</Tag>}
                  </Col>
                </Row>
                <Divider />
                <Space direction='vertical'>
                  <Text style={{ fontSize: 'large' }}>姓名：{order.receiverName}</Text>
                  <Text style={{ fontSize: 'large' }}>Email：{order.receiverEmail}</Text>
                  <Text style={{ fontSize: 'large' }}>聯絡電話：{order.receiverPhone}</Text>
                  <Text style={{ fontSize: 'large' }}>地址：{order.receiverAddress}</Text>
                  <Text style={{ fontSize: 'large' }}>郵遞區號：{order.receiverZipcode}</Text>
                </Space>
              </Card>
            </Col>
          </Row>
          {/* <Title level={4}>訂單明細</Title> */}
          <Divider />
          <Row gutter={[20, 20]}>
            <Col xs={24} sm={24}>
              <Card hoverable style={{ backgroundColor: 'white' }} bodyStyle={{ padding: '20px 0' }}>
                <Title style={{ paddingLeft: 20 }} level={4}>訂單明細</Title>
                <Divider />
                <Row>
                  <Col span={24}>
                    <List
                      grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                      }}
                      dataSource={orderItems}
                      renderItem={(item, index) => (
                        <List.Item key={index}>
                          <Card bodyStyle={{ padding: 10 }}>
                            <Card.Meta
                              avatar={
                                <Image width={100} preview={false} src={getSysFileUrl(item.images[0].imageSysFileId)} />
                              }
                              title={
                                <Row style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    navigate(`/category/productDetail/${item.product.id}`)
                                  }}>
                                  <Col span={24}>
                                    <Text style={{ fontSize: 'larger', whiteSpace: 'break-spaces' }}>{item.product.productName}</Text>
                                  </Col>
                                  <Col span={24}>
                                    <Text style={{ fontSize: 'larger', whiteSpace: 'break-spaces' }}>{item.product.productNo}</Text>
                                  </Col>
                                </Row>
                              }
                              description={<Space direction='vertical'>
                                <Text style={{ fontSize: 'larger' }}>規格：{item.selectedProductSpecs.length ? item.selectedProductSpecs.map(item => item.itemName).join('、') : <>無</>}</Text>
                                <Text style={{ fontSize: 'larger' }}>單價：
                                  <CurrencyFormat
                                    value={item.price}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    displayType='text'
                                  />
                                </Text>
                                <Text style={{ fontSize: 'larger' }}>數量：
                                  <CurrencyFormat
                                    value={item.qty}
                                    thousandSeparator={true}
                                    displayType='text'
                                  />
                                </Text>
                                <Text style={{ fontSize: 'larger' }}>合計：
                                  <CurrencyFormat
                                    value={item.price * item.qty}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    displayType='text'
                                  />
                                </Text>
                              </Space>}
                            />
                          </Card>
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>

              </Card>
            </Col>

          </Row>

        </Spin>
      </Section>
    </Section.Container>
  );
}
