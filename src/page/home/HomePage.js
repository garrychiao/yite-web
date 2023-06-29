// import { Suspense } from 'react';
import styled from 'styled-components';
import { Row, Col, Typography, Carousel, Image } from 'antd';
import color from 'shared/style/color';
import i18n from 'i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Section } from 'shared/layout';

const { Title } = Typography;

export default function HomePage() {

  return (
    <Section.Container>
      <Section>
        hello world
      </Section>
    </Section.Container>
  );
}
