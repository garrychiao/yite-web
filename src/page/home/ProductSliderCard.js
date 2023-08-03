import Slider from "react-slick";
import { useRequest } from "ahooks";
import { productApi } from 'page/api';
import { useMemo } from "react";
import { styled } from "styled-components";
import { Image, Typography, Divider } from "antd";
import getSysFileUrl from "utils/apiSysFiles";
import color from "shared/style/color";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function ProductSliderCard({ productData = {} }) {

    // console.log(`productData`)
    // console.log(productData)
    const navigate = useNavigate();

    return (
        <Container>
            <Card onClick={() => {
                navigate(`/category/productDetail/${productData.id}`);
            }}>
                <Image src={productData.image} width='auto' height={250} preview={false} />
                <Divider />
                <Title level={5} style={{marginTop: 0}}>
                    {productData.productNo}
                </Title>
                <Title level={4} style={{marginTop: 0}}>
                    {productData.productName}
                </Title>
                <ul style={{width: '90%'}}>
                {
                    productData.outsideFeatures.map((item, index) => (
                        <li key={index} style={{fontSize: 16}}>
                            {item.description}
                        </li>
                    ))
                }
                </ul>
            </Card>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    padding: 15px;
`

const Card = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #f0f0f0;
    box-shadow: 0 4px 6px ${color.shadow};
    padding-bottom: 20px;
    cursor: pointer;
`