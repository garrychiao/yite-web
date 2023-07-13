import { useMemo } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Divider, Row, Col, Typography, Button, Image, Table } from 'antd';
import color from 'shared/style/color';
import i18n from 'i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Section } from 'shared/layout';
import { ProductCard, ListHeader } from './fields';
import { useCart } from 'shared/cart';
import getSysFileUrl from 'utils/apiSysFiles';
import CurrencyFormat from 'react-currency-format';

const { Title } = Typography;

export default function ConfirmOrderPage() {

  const { cart, fetchCart, hasProduct } = useCart();

  const cartData = useMemo(() => cart.map(item => ({
    ...item,
    ...item.product,
    image: getSysFileUrl(item?.product?.mainImages[0].imageSysFileId),
  })), [cart])

  console.log(`cartData`)
  console.log(cartData)

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

  return (
    <Section.Container>
      <Section>
        <Title level={4}>確認訂單 | 結帳</Title>
        <Divider />
        <Table
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
                      value={_.sum(cart.map(item => item.qty * item.unitPrice))}
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
            <Link to='/order/created'>
              <Button size='large'>
                確認送出
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