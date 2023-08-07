import { useMemo } from 'react';
// import styled from 'styled-components';
import { Typography, Card, Row, Col, Divider } from 'antd';
import dayjs from 'dayjs';
// import color from 'shared/style/color';
// import i18n from 'i18next';
// import { ArrowRightOutlined } from '@ant-design/icons';
// import { Link, useParams, useLocation } from 'react-router-dom';
// import { Section } from 'shared/layout';
// import { useRequest } from 'ahooks';
// import { categoryApi, productApi } from 'page/api';
// import getSysFileUrl from 'utils/apiSysFiles';
// import FullSpin from 'shared/FullSpin';
import { useAuthUser } from 'react-auth-kit';
import { Section } from 'shared/layout';

const { Title } = Typography;

export default function UserInfo() {

  const auth = useAuthUser();
  const user = useMemo(() => auth() || {}, [auth]);
  console.log(user)

  return (
    <Section.Container>
      <Section>
        <Row gutter={20}>
          <Col xs={24} sm={24} md={8}>
            <Card title={<Title level={3}>{user?.displayName}</Title>} hoverable style={{ width: '100%', backgroundColor: '#fff' }}>
              <Title level={5}>Email: {user?.email}</Title>
              <Title level={5}>建立時間: {dayjs(user?.createdAt).format('YYYY-MM-DD')}</Title>
              <Divider />
              <Title level={4}>客戶資訊</Title>
              {
                user?.customer ? <>
                  <Title level={5}>客戶名稱: {user?.customer?.customerName}</Title>
                  <Title level={5}>客戶等級: {user?.customer?.customerGradeNo}</Title>
                  <Title level={5}>Email: {user?.customer?.email}</Title>
                  <Title level={5}>電話: {user?.customer?.phone}</Title>
                  <Title level={5}>統一編號: {user?.customer?.vatNumber}</Title>
                  <Title level={5}>啟用狀態: {user?.customer?.enable ? '啟用' : '未啟用'}</Title>
                </> : <></>
              }
            </Card>
          </Col>
        </Row>
      </Section>
    </Section.Container>
  );
}
