// import { Suspense } from 'react';
import styled from 'styled-components';
import { Divider, Row, Col, Typography, Button, Image, Table } from 'antd';
import color from 'shared/style/color';
import i18n from 'i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Section } from 'shared/layout';
import { ProductCard, ListHeader } from './fields';

const { Title } = Typography;

export default function ConfirmOrderPage() {

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
      dataIndex: 'spec',
      key: 'spec',
    },
    {
      title: '單價',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
    },
    {
      title: '數量',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '總計',
      dataIndex: 'total',
      key: 'total',
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
          summary={() => (
            <Table.Summary fixed='bottom'>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={6} />
                <Table.Summary.Cell index={0}>
                  0
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
        <Row justify={'space-around'} style={{ paddingTop: 50 }}>
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