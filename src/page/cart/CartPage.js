import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Popconfirm, notification, Table, Divider, Row, Col, Typography, Button, Image, Space } from 'antd';
import _ from 'lodash';
import color from 'shared/style/color';
import i18n from 'i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Section } from 'shared/layout';
import { ProductCard, ListHeader } from './fields';
import { useCart } from 'shared/cart';
import CurrencyFormat from 'react-currency-format';
import getSysFileUrl from 'utils/apiSysFiles';
import { SpecChooser } from './fields'
import CartCountOperator from 'shared/cartCountOperator';
import { cartApi } from 'page/api';
import { useRequest } from 'ahooks';

const { Title } = Typography;

export default function CartPage() {

  const navigate = useNavigate();
  const { cart, fetchCart, hasProduct, selectedItems, setSelectedItems, onSelectAll, addSelectedToLocal } = useCart();

  console.log(`selectedItems`)
  console.log(selectedItems)
  const [initState, setInitState] = useState(true);

  const { run: updateToCart, loading: loadingUpdateToCart } = useRequest(({ payload }) => cartApi.update({ payload }), {
    manual: true,
    debounceInterval: 500,
    throttleInterval: 500,
    onSuccess: (data) => {
      console.log(data)
      fetchCart();
    }, onError: (err) => {
      console.error(err);
      notification.error({
        message: '發生錯誤'
      })
    }
  });

  const { run: deleteToCart, loading: loadingDeleteToCart } = useRequest(({ id }) => cartApi.delete({ id }), {
    manual: true,
    onSuccess: (data) => {
      fetchCart();
      notification.success({
        message: `刪除成功`
      })
    }, onError: (err) => {
      console.error(err);
      notification.error({
        message: '發生錯誤'
      })
    }
  });

  const cartData = useMemo(() => cart.map(item => ({
    ...item,
    productName: item.product.productName,
    productId: item.product.id,
    image: getSysFileUrl(item?.product?.mainImages[0].imageSysFileId),
    total: item.qty * item.unitPrice
  })), [cart])

  useEffect(() => {
    if (cart.length > 0 && initState) {
      onSelectAll()
      setInitState(false);
    }
  }, [cart, initState, onSelectAll])

  const rowSelection = {
    selectedRowKeys: selectedItems,
    onChange: (selectedRowKeys) => {
      console.log(selectedRowKeys);
      setSelectedItems(selectedRowKeys)
    },
  };

  const columns = [
    {
      title: '圖片',
      dataIndex: 'image',
      key: 'image',
      width: 200,
      render: (src) => <Image src={src} preview={false} width='100%' />,
    },
    {
      title: '名稱',
      dataIndex: 'productName',
      key: 'productName',
      render: (value, product) => (<Link to={`/category/productDetail/${product.productId}`}>
        <Title style={{ margin: 0 }} level={5}>{value}</Title>
      </Link>),
    },
    {
      title: '規格',
      dataIndex: 'selectedProductSpecs',
      key: 'selectedProductSpecs',
      render: (_, product) => product.selectedProductSpecs.length > 0 ?
        <SpecChooser product={product} onSpecConfirmed={(specsDict) => updateSpecs(product.id, product.qty, specsDict)} />
        : <Title style={{ margin: 0 }} level={5}>無</Title>,
    },
    {
      title: '單價',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (_, product) => (<Space direction='vertical'>
        {
          product.unitPrice !== product.defaultPrice ? <>
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
          </> :
            <CurrencyFormat
              value={product.defaultPrice}
              thousandSeparator={true}
              prefix={'$'}
              displayType='text'
              renderText={value => <StyledUnitPrice>{value}</StyledUnitPrice>}
            />
        }
      </Space>),
    },
    {
      title: '數量',
      dataIndex: 'qty',
      key: 'qty',
      render: (value, product) => <CartCountOperator initvalue={value} onChange={(value) => updateQty(product.id, value, product.selectedProductSpecs)} />,
    },
    {
      title: '總計',
      dataIndex: 'total',
      key: 'total',
      render: (value) => <CurrencyFormat
        value={value}
        thousandSeparator={true}
        prefix={'$'}
        displayType='text'
        renderText={value => <StyledUnitPrice>{value}</StyledUnitPrice>}
      />,
    },
    {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, product) => <Popconfirm
        title={`刪除 ${product.productName} ?`}
        description={`確定從購物車移除 ${product.productName} 嗎？`}
        onConfirm={() => {
          deleteToCart({ id: product.id });
        }}
        // onCancel={() => {}}
        okText="確認"
        cancelText="取消"
      >
        <Button danger>刪除</Button>
      </Popconfirm>
    },
  ];

  const updateQty = (id, qty, specs) => {

    const payload = {
      id: id,
      qty,
      selectedProductSpecs: specs
    }
    // console.log(`payload`);
    // console.log(payload);
    updateToCart({ payload });
  }

  const updateSpecs = (id, qty, specs) => {

    const payload = {
      id: id,
      qty,
      selectedProductSpecs: Object.keys(specs).map(key => ({
        productSpecId: key,
        itemName: specs[key],
      }))
    }
    // console.log(`payload`);
    // console.log(payload);
    updateToCart({ payload });
  }

  const loading = loadingUpdateToCart || loadingDeleteToCart;

  return (
    <Section.Container>
      <Section>
        <Title level={4}>購物車</Title>
        <Divider />
        <ProductListContainer>
          {/* <ListHeader /> */}
          {
            hasProduct ? (
              <Table
                loading={loading}
                pagination={false}
                rowKey='id'
                columns={columns}
                dataSource={cartData}
                rowSelection={{
                  type: 'checkbox',
                  ...rowSelection,
                }}
              />
            ) : <Row justify={'center'}>
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
            <Button
              size='large'
              disabled={selectedItems.length === 0}
              onClick={() => {
                addSelectedToLocal();
                navigate('/order/confirm')
              }}>
              去買單
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


const StyledDefaultPrice = styled.div`
  text-decoration: line-through;
  color: #a0a0a0;
`

const StyledUnitPrice = styled.div`
  font-size: large;
`