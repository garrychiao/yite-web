// import { Suspense } from 'react';
import styled from 'styled-components';
import { Row, Col, Typography, Carousel, Image, Divider } from 'antd';
import color from 'shared/style/color';
import i18n from 'i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Section } from 'shared/layout';
import YITE_Banner_1 from 'asset/img/YITE_Banner_1.jpeg';
import YITE_Banner_2 from 'asset/img/YITE_Banner_2.jpeg';
import YITE_Banner_3 from 'asset/img/YITE_Banner_3.jpeg';
import YITE_Banner_4 from 'asset/img/YITE_Banner_4.jpeg';
import YITE_Banner_5 from 'asset/img/YITE_Banner_5.jpeg';
import YITE_Banner_6 from 'asset/img/YITE_Banner_6.jpeg';
import YITE_Banner_7 from 'asset/img/YITE_Banner_7.jpeg';
import YITE_Banner_8 from 'asset/img/YITE_Banner_8.jpeg';
import YITE_Banner_9 from 'asset/img/YITE_Banner_9.jpeg';
import Slider from "react-slick";
import { useRequest } from 'ahooks';
import { productApi } from 'page/api';
import NewProductSlider from './NewProductSlider';
import HotProductSlider from './HotProductSlider';

const { Title } = Typography;

export default function HomePage() {

  const { data: hotProductData, loading: loadingHot } = useRequest(() => productApi.list({
    isHot: true
  }));
  console.log(hotProductData);


  return (
    <>
      <Carousel autoplay effect='fade' autoplaySpeed={3000}>
        <CarouselSlide>
          <Image src={YITE_Banner_1} preview={false} width={'100%'} />
        </CarouselSlide>
        <CarouselSlide>
          <Image src={YITE_Banner_2} preview={false} width={'100%'} />
        </CarouselSlide>
        <CarouselSlide>
          <Image src={YITE_Banner_3} preview={false} width={'100%'} />
        </CarouselSlide>
        <CarouselSlide>
          <Image src={YITE_Banner_4} preview={false} width={'100%'} />
        </CarouselSlide>
        <CarouselSlide>
          <Image src={YITE_Banner_5} preview={false} width={'100%'} />
        </CarouselSlide>
        <CarouselSlide>
          <Image src={YITE_Banner_6} preview={false} width={'100%'} />
        </CarouselSlide>
        <CarouselSlide>
          <Image src={YITE_Banner_7} preview={false} width={'100%'} />
        </CarouselSlide>
        <CarouselSlide>
          <Image src={YITE_Banner_8} preview={false} width={'100%'} />
        </CarouselSlide>
        <CarouselSlide>
          <Image src={YITE_Banner_9} preview={false} width={'100%'} />
        </CarouselSlide>
      </Carousel>
      <Section.Container>
        <Section>
          <Row>
            <Col span={24}>
              <NewProductSlider />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24}>
              <HotProductSlider />
            </Col>
          </Row>
        </Section>
      </Section.Container>
    </>
  );
}

const CarouselSlide = styled.div`

`