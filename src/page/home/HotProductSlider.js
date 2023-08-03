import Slider from "react-slick";
import { useRequest } from "ahooks";
import { productApi } from 'page/api';
import { useMemo } from "react";
import ProductSliderCard from "./ProductSliderCard";
import getSysFileUrl from "utils/apiSysFiles";
import { Typography, Row, Col } from "antd";
import { styled } from "styled-components";

const { Title } = Typography;

export default function HotProductSlider() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const { data: hotProductData, loading: loadingNew } = useRequest(() => productApi.list({
        isHot: true
    }));

    const hotProductList = useMemo(() => hotProductData?.rows || [], [hotProductData]);
    // console.log(hotProductList);

    return (
        <Container>
            <Row justify={'center'}>
                <Col>
                    <Title level={2}>
                        熱門商品
                    </Title>
                </Col>
            </Row>
            <Row style={{width: '100%'}}>
                <Col span={24}>
                    <Slider {...settings}>
                        {hotProductList.map(item => {
                            item.image = getSysFileUrl(item.mainImages[0].imageSysFileId)
                            return <ProductSliderCard productData={item} />
                        })}
                    </Slider>
                </Col>
            </Row>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    padding: 20px;
`