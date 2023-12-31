import Slider from "react-slick";
import { useRequest } from "ahooks";
import { productApi } from 'page/api';
import { useMemo } from "react";
import ProductSliderCard from "./ProductSliderCard";
import getSysFileUrl from "utils/apiSysFiles";
import { Typography, Row, Col } from "antd";
import { styled } from "styled-components";
import { RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

export default function HotProductSlider() {


    const settings = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
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

    const { data: newProductData, loading: loadingNew } = useRequest(() => productApi.list({
        isHot: true
    }));

    const newProductList = useMemo(() => newProductData?.rows || [], [newProductData]);
    console.log(newProductList);

    return (
        <Container>
            <Row justify={'center'}>
                <Col>
                    <Title level={2}>
                        熱門商品
                    </Title>
                </Col>
            </Row>
            <Row style={{ width: '100%' }}>
                <Col span={24}>
                    <Slider {...settings}>
                        {newProductList.map((item, index) => {
                            item.image = getSysFileUrl(item.mainImages[0].imageSysFileId)
                            return <ProductSliderCard key={index} productData={item} />
                        })}
                    </Slider>
                </Col>
            </Row>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    .slick-prev:before, .slick-next:before {
        color: #000;
    }
`