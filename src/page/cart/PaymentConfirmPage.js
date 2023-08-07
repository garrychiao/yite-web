import { useState, useEffect } from 'react';
import { Card, Row, Col, Divider } from 'antd';
import { Section } from 'shared/layout';
import dayjs from 'dayjs';
import { orderApi } from 'page/api';
import { Link, useParams, useNavigate } from 'react-router-dom';
import * as R from 'ramda'
import { Button } from 'antd';

const getStatusName = (status) => {
  switch (status) {
    case 'DRAFT': {
      return '草稿'
    }
    case 'INIT': {
      return '訂單建立，待付款'
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

export default function PaymentConfirmPage() {
  const [orderData, setOrderData] = useState({})
  const [paymentData, setPaymentData] = useState({})
  const { id } = useParams();
  const navigate = useNavigate();

  // call api
  const getOrderData = async (orderId) => {
    try {
      const response = await orderApi.get(orderId)
      console.log(`response`);
      console.log(response);
      setOrderData(response)
      setPaymentData(R.find(R.where({
        paymentLog: R.where({
          returnCode: R.equals('1'),
        }),
      }), response?.payments || []))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!!id) {
      getOrderData(id)
    }
  }, [id])

  return (
    <Section.Container>
      <Section>
        <Row gutter={20}>
          <Col>
            <Card title='訂單付款成功' bordered={false} style={{ width: 300 }}>
              <p>訂單編號: {orderData?.orderNo}</p>
              <p>訂單狀態: {getStatusName(orderData?.status)}</p>
              <p>付款完成時間: {dayjs(orderData?.paidAt).format('YYYY-MM-DD HH:mm:ss')}</p>
              <Divider />
              <p>付款編號: {paymentData?.paymentNo}</p>
              <p>付款訊息: {paymentData?.paymentLog?.returnMessage}</p>
              <p>付款金額: {paymentData?.paymentLog?.tradeAmount}</p>
              <Divider />
              <Button
                size='large'
                onClick={() => {
                  navigate('/order/history')
                }}>
                確認ok，回到訂單記錄
              </Button>
            </Card>
          </Col>
        </Row>
      </Section>
    </Section.Container>
  )
}