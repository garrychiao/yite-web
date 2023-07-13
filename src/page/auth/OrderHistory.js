import { useMemo } from 'react';
// import styled from 'styled-components';
import { Table, Row, Col, Divider, Typography } from 'antd';
import dayjs from 'dayjs';
import { useAuthUser } from 'react-auth-kit';
import { Section } from 'shared/layout';

const { Title } = Typography;

export default function OrderHistory() {

  const auth = useAuthUser();
  const user = useMemo(() => auth() || {}, [auth]);

  const columns = [
  {
    title: '訂單編號',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '日期',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '訂單狀態',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '訂單狀態',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '品項',
    dataIndex: 'items',
    key: 'items',
  },
  {
    title: '金額',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: '操作',
    dataIndex: 'actions',
    key: 'actions',
  },
];

  return (
    <Section.Container>
      <Section>
        <Title level={4}>訂單記錄</Title>
        <Divider />
        <Table data={[]} columns={columns} />
      </Section>
    </Section.Container>
  );
}
