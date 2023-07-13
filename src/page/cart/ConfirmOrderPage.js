import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Divider, Row, Col, Typography, Button, Image, Table, notification } from 'antd';
import color from 'shared/style/color';
import i18n from 'i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Section } from 'shared/layout';
import { ProductCard, ListHeader } from './fields';
import { useCart } from 'shared/cart';
import getSysFileUrl from 'utils/apiSysFiles';
import CurrencyFormat from 'react-currency-format';
import { useAuthUser } from 'react-auth-kit';
import { orderApi } from 'page/api';
import { useRequest } from 'ahooks';

const { Title } = Typography;

export default function ConfirmOrderPage() {

  const { cart, fetchCart, selectedItems, setSelectedItems, getSelectedFromLocal } = useCart();
  const auth = useAuthUser()

  const { id } = useParams();
  const navigate = useNavigate();

  const cartData = useMemo(() => cart.filter(item => selectedItems.indexOf(item.id) > -1).map(item => ({
    ...item,
    productName: item?.product.productName,
    productNo: item?.product.productNo,
    image: getSysFileUrl(item?.product?.mainImages[0].imageSysFileId),
  })), [selectedItems, cart])
  console.log(`cartData`)
  console.log(cartData)

  const totalPrice = useMemo(() => _.sum(cartData.map(item => item.qty * item.unitPrice)), [cartData]);

  const { run: createOrder, loading: loadingCreateOrder } = useRequest(({ payload }) => orderApi.create({ payload }), {
    manual: true,
    onSuccess: (data) => {
      console.log(data)
      fetchCart();
      notification.success({
        message: '訂單已送出'
      })
      navigate('/order/history')
    }, onError: (err) => {
      console.error(err);
      notification.error({
        message: '發生錯誤'
      })
    }
  });

  useEffect(() => {
    if (id && cart.length > 0 && selectedItems.length !== 1) {
      setSelectedItems([id]);
    } else if (cartData.length > 0 && selectedItems.length === 0) {
      const selectedItems = getSelectedFromLocal();
      if (selectedItems.length > 0) {
        setSelectedItems(selectedItems);
      }
    }
  }, [cart, id, selectedItems, setSelectedItems, getSelectedFromLocal])

  const columns = [
    {
      title: '圖片',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      render: (src) => <Image src={src} preview={false} width='100%' />,
    },
    {
      title: '名稱',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: '編號',
      dataIndex: 'productNo',
      key: 'productNo',
    },
    {
      title: '規格',
      dataIndex: 'selectedProductSpecs',
      key: 'selectedProductSpecs',
      render: (selectedProductSpecs) => <>{
        selectedProductSpecs.length > 0 ?
          selectedProductSpecs.map(item => item.itemName).join('、') :
          '無'
      }</>,
    },
    {
      title: '單價',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (value) => (<CurrencyFormat
        value={value}
        thousandSeparator={true}
        prefix={'$'}
        displayType='text'
      />)

    },
    {
      title: '數量',
      dataIndex: 'qty',
      key: 'qty',
      render: (value) => (<CurrencyFormat
        value={value}
        thousandSeparator={true}
        displayType='text'
      />)
    },
    {
      title: '總計',
      dataIndex: 'total',
      key: 'total',
      render: (_, record) => (<CurrencyFormat
        value={record.qty * record.unitPrice}
        thousandSeparator={true}
        prefix={'$'}
        displayType='text'
      />)
    },
  ];

  const onConfirmOrder = () => {

    const payload = {
      userId: auth().id,
      totalPrice,
      orderProducts:[],
      cartProducts: cartData.map(item =>({
        cartId: item.id
      }))
    }

    console.log(payload);
    createOrder({payload});
  }

  const loading = loadingCreateOrder;

  return (
    <Section.Container>
      <Section>
        <Title level={4}>確認訂單 | 結帳</Title>
        <Divider />
        <Table
        loading={loading}
          pagination={false}
          columns={columns}
          dataSource={cartData}
          rowKey='id'
          summary={() => (
            <Table.Summary fixed='bottom'>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={5} />
                <Table.Summary.Cell index={1}>
                  <Title level={5}>
                    總計：
                  </Title>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <Title level={5}>
                    <CurrencyFormat
                      value={totalPrice}
                      thousandSeparator={true}
                      prefix={'$'}
                      displayType='text'
                    />
                  </Title>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
        <Row justify={'space-around'} style={{ paddingTop: 50 }}>
          <Col>
            <Link to='/cart'>
              <Button size='large'>
                上一步
              </Button>
            </Link>
          </Col>
          <Col>
            <Button size='large' onClick={() => {
              onConfirmOrder();
            }}>
              確認送出
            </Button>
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