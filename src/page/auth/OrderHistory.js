import { useMemo, useState } from 'react';
import _ from 'lodash';
// import styled from 'styled-components';
import { Button, Space, Table, List, Image, Row, Col, Divider, Typography, notification } from 'antd';
import dayjs from 'dayjs';
import { useAuthUser } from 'react-auth-kit';
import { Section } from 'shared/layout';
import { orderApi, cartApi } from 'page/api';
import { useRequest } from 'ahooks';
import getSysFileUrl from 'utils/apiSysFiles';
import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'shared/cart';
import { getOrderStatus } from 'utils/OrderStatus';

const { Title, Text, Paragraph } = Typography;

// const getStatusName = (status) => {
//   switch (status) {
//     case 'DRAFT': {
//       return '草稿'
//     }
//     case 'INIT': {
//       return '訂單建立，待付款'
//     }
//     case 'WAITING': {
//       return '付款完成，等待確認'
//     }
//     case 'CONFIRM': {
//       return '訂單已確認，出貨中'
//     }
//     case 'SHIP': {
//       return ' 已出貨'
//     }
//     case 'FINISH': {
//       return '訂單已完成'
//     }
//     case 'CANCEL': {
//       return '訂單取消'
//     }
//     case 'OVERDUE': {
//       return '訂單過期'
//     }
//     default: {
//       return '不明'
//     }
//   }
// }

export default function OrderHistory() {

  const auth = useAuthUser();
  // const user = useMemo(() => auth() || {}, [auth]);
  const navigate = useNavigate();
  const { fetchCart } = useCart();
  const [loadingBuyAgain, setLoadingBuyAgain] = useState(false);

  const { data, loading: loadingList } = useRequest(() => orderApi.list());
  const tableData = useMemo(() => {
    const list = data?.rows || [];
    return _.chain(list).orderBy('createdAt', 'asc')
      .orderBy('createdAt', 'desc')
      .value()
  }, [data])
  console.log(tableData);
  const columns = [
    {
      title: '訂單編號',
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 100,
    },
    {
      title: '日期',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '訂單狀態',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      // render: (value) => value === 'WAITING' ? '訂單處理中' : '訂單完成'
      render: (value) => {
        const orderStatus = getOrderStatus(value);
        return <Text style={{ fontSize: 'large', color: orderStatus?.color }}>{orderStatus?.value}</Text>
      }
    },
    {
      title: '品項',
      dataIndex: 'orderItems',
      key: 'orderItems',
      width: 400,
      render: (targetItems) => (<List
        dataSource={targetItems}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Image width={100} preview={false} src={getSysFileUrl(item.images[0].imageSysFileId)} />
              }
              title={<Space direction='vertical' size={'small'}>
                <Text style={{ fontSize: 'larger' }}>{item.product.productName}</Text>
                <Text style={{ fontSize: 'larger' }}>{item.product.productNo}</Text>
              </Space>}
              description={
                <>
                  <Row>
                    <Col span={12}>
                      <Text style={{ fontSize: 'larger' }}>規格：{item.selectedProductSpecs.length ? item.selectedProductSpecs.map(item => item.itemName).join('、') : <>無</>}</Text>
                    </Col>
                    <Col span={12}>
                      <Text style={{ fontSize: 'larger' }}>單價：
                        <CurrencyFormat
                          value={item.price}
                          thousandSeparator={true}
                          prefix={'$'}
                          displayType='text'
                        />
                      </Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Text style={{ fontSize: 'larger' }}>數量：
                        <CurrencyFormat
                          value={item.qty}
                          thousandSeparator={true}
                          displayType='text'
                        />
                      </Text>
                    </Col>
                    <Col span={12}>
                      <Text style={{ fontSize: 'larger' }}>合計：
                        <CurrencyFormat
                          value={item.price * item.qty}
                          thousandSeparator={true}
                          prefix={'$'}
                          displayType='text'
                        />
                      </Text>
                    </Col>
                  </Row>
                </>}
            />
          </List.Item>
        )}
      />)
    },
    {
      title: '金額',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: 100,
      render: (value) => (<CurrencyFormat
        value={value}
        thousandSeparator={true}
        prefix={'$'}
        displayType='text'
      />)
    },
    {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      width: 150,
      render: (_, order) => (
        <Row gutter={[20, 20]}>
          <Col>
            <Button onClick={() => {
              navigate(`./${order.id}`)
            }}>
              查看明細
            </Button>
          </Col>
          <Col>
            <Button onClick={() => { onBuyAgain(order) }}>
              再買一次
            </Button>
          </Col>
        </Row>
      )
    },
  ];

  const onBuyAgain = async (order) => {
    const { orderItems } = order;
    console.log(orderItems);
    setLoadingBuyAgain(true);
    try {
      await Promise.all(orderItems.map(item => {
        const payload = {
          userId: auth().id,
          productId: item.productId,
          qty: item.qty,
          selectedProductSpecs: item.selectedProductSpecs.map(item => ({
            itemName: item.itemName,
            productSpecId: item.productSpecId,
            modelNo: item.modelNo,
          }))
        }
        return cartApi.add({ payload })
      }))
      fetchCart();
      notification.success({
        message: '成功加入購物車'
      })
      navigate('/cart')

    } catch (err) {
      notification.error({
        message: '發生錯誤'
      })
      console.error(err)
    } finally {
      setLoadingBuyAgain(false);
    }
  }

  const loading = loadingBuyAgain || loadingList;

  return (
    <Section.Container>
      <Section>
        <Title level={4}>訂單記錄</Title>
        <Divider />
        <Table
          loading={loading}
          rowKey='id'
          dataSource={tableData}
          columns={columns}
          scroll={{
            x: 'calc(700px + 50%)',
            // y: 'calc(100vh - 50px)',
          }} />
      </Section>
    </Section.Container>
  );
}
