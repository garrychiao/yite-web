import { useMemo } from 'react';
// import styled from 'styled-components';
import { Card, Row, Col } from 'antd';
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

  return (
    <Section.Container>
      <Section>
        <Row gutter={20}>
          <Col>
            <Card title={user?.displayName} bordered={false} style={{ width: 300 }}>
              <p>Email: {user?.email}</p>
              <p>Created At: {dayjs(user?.createdAt).format('YYYY-MM-DD')}</p>
            </Card>
          </Col>
        </Row>
      </Section>
    </Section.Container>
  );
}
