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

export default function NewProductSlider({listItems = {}}) {

    console.log(`listItems`)
    
    if (listItems.products.length <= 4) {
        while(listItems.products.length < 4) {
            listItems.products = listItems.products.concat(listItems.products)
        }
    }
    console.log(listItems.products)

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

    // const { data: newProductData, loading: loadingNew } = useRequest(() => productApi.list({
    //     isNew: true
    // }));

    // const newProductList = useMemo(() => newProductData?.rows || [], [newProductData]);
    // console.log(newProductList);
    // const showSlider = useMemo(() => listItems.products.length >=, [])

    return (
        <Container>
            <Row justify={'center'}>
                <Col>
                    <Title level={2}>
                        {listItems.name}
                    </Title>
                </Col>
            </Row>
            <Row style={{ width: '100%' }}>
                <Col span={24}>
                   <Slider {...settings}>
                        {listItems?.products && listItems.products.map((item, index) => {
                            const pData = item.product
                            pData.image = getSysFileUrl(item.product.mainImages[0].imageSysFileId)
                            // console.log(getSysFileUrl(item.product.mainImages[0].imageSysFileId))
                            return <ProductSliderCard key={index} productData={item.product} />
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