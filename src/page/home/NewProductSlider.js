import Slider from "react-slick";
import { useRequest } from "ahooks";
import { productApi } from 'page/api';
import { useMemo } from "react";
import ProductSliderCard from "./ProductSliderCard";
import getSysFileUrl from "utils/apiSysFiles";
import { Typography, Row, Col } from "antd";
import { styled } from "styled-components";

const { Title } = Typography;

export default function NewProductSlider() {

    const settings = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
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

    const { data: newProductData, loading: loadingNew } = useRequest(() => productApi.list({
        isNew: true
    }));

    const newProductList = useMemo(() => newProductData?.rows || [], [newProductData]);
    console.log(newProductList);

    return (
        <Container>
            <Row justify={'center'}>
                <Col>
                    <Title level={2}>
                        新品上架
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
`