import { useMemo } from 'react';
// import styled from 'styled-components';
import { Card, Row, Col, Divider } from 'antd';
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

export default function UserInfo() {

  const auth = useAuthUser();
  const user = useMemo(() => auth() || {}, [auth]);
  console.log(user)

  return (
    <Section.Container>
      <Section>
        <Row gutter={20}>
          <Col>
            <Card title={user?.displayName} bordered={false} style={{ width: 300 }}>
              <p>Email: {user?.email}</p>
              <p>建立時間: {dayjs(user?.createdAt).format('YYYY-MM-DD')}</p>
              <Divider />
              客戶資訊
              {
                user?.customer ? <>
                <p>客戶名稱: {user?.customer?.customerName}</p>
                <p>客戶等級: {user?.customer?.customerGradeNo}</p>
                <p>Email: {user?.customer?.email}</p>
                <p>電話: {user?.customer?.phone}</p>
                <p>統一編號: {user?.customer?.vatNumber}</p>
                <p>啟用狀態: {user?.customer?.enable ? '啟用' : '未啟用'}</p>
                </> : <></>
              }
            </Card>
          </Col>
        </Row>
      </Section>
    </Section.Container>
  );
}
