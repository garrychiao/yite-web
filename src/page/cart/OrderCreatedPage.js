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

export default function OrderCreatedPage() {

  return (
    <Section.Container>
      <Section>
        <Title level={4}>訂單處理中</Title>
        <Divider />
        
        {/* <Row justify={'space-around'} style={{paddingTop: 50}}>
          <Col>
            <Button size='large'>
              確認送出
            </Button>
          </Col>
        </Row> */}
      </Section>
    </Section.Container>
  );
}

const ProductListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`