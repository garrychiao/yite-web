import { useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Divider, List, Breadcrumb, Card, Row, Col, Typography, Carousel, Image } from 'antd';
import color from 'shared/style/color';
import i18n from 'i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { Section } from 'shared/layout';
import { useRequest } from 'ahooks';
import { categoryApi, productApi } from 'page/api';
import getSysFileUrl from 'utils/apiSysFiles';
import { TabList } from './fields';
import ButtonGroup from 'shared/buttonGroup';
import CartCountOperator from 'shared/cartCountOperator';

const { Title } = Typography;

export default function ProductPage() {

  const { id } = useParams();
  const [productData, setProductData] = useState({});
  console.log(`productData`)
  console.log(productData)
  const [productImages, setProductImages] = useState([]);
  const [selectedProductImageIndex, setSelectedProductImageIndex] = useState(0);
  const [featureImages, setFeatureImages] = useState([]);
  const [introImages, setIntroImages] = useState([]);
  const [productFeatures, setProductFeatures] = useState([]);
  const [downloadFiles, setDownloadFiles] = useState([]);

  // console.log(`productFeatures`)
  // console.log(productFeatures)
  const { loading: loadingProductDetailData } = useRequest(() => productApi.get({ id }), {
    onSuccess: (data) => {
      console.log(data)
      setProductData(data);
    }
  });

  const { loading: loadingProductImagesData } = useRequest(() => productApi.getImages({ id }), {
    onSuccess: (data) => {
      setProductImages(data
        .filter((item) => item.imageType === 'MAIN')
        .map((item) => ({ imageUrl: getSysFileUrl(item.imageSysFileId) }))
      );
      setFeatureImages(data
        .filter((item) => item.imageType === 'FEATURE')
        .map((item) => ({ imageUrl: getSysFileUrl(item.imageSysFileId) }))
      );
      setIntroImages(data
        .filter((item) => item.imageType === 'INTRO')
        .map((item) => ({ imageUrl: getSysFileUrl(item.imageSysFileId) }))
      );
    }
  });

  const { loading: loadingProductFeaturesData } = useRequest(() => productApi.getFeatures({ id }), {
    onSuccess: (data) => {
      setProductFeatures(data
        .filter((item) => item.featureType === 'INSIDE')
        .map((item) => ({ description: item.description }))
      );
    }
  });

  const { loading: loadingProductFilesData } = useRequest(() => productApi.getFiles({ id }), {
    onSuccess: (data) => {
      console.log(data)
      setDownloadFiles(data
        .map((item) => ({ uri: getSysFileUrl(item.sysFileId) }))
      );
    }
  });

  const introTabData = useMemo(() => ({
    introVideoUrls: productData?.introVideoUrls, // array
    introDescription: productData?.introDescription, // string
    introImages: introImages,
  }), [productData, introImages])

  const specTabData = useMemo(() => ({
    tableData: productData?.specCategoryItems, // array
    bulletData: productData?.specDescription, // array
  }), [productData])

  const breadcrumbList = useMemo(() => {
    const initPath = [
      {
        title: <Link to='/'>首頁</Link>,
        name: '首頁'
      },
      {
        title: <Link to='/category'>產品資訊</Link>,
        name: '產品資訊'
      },
    ]
    const list = productData?.categoryPath || [];
    return initPath.concat(list.map((item, index) => ({
      title: <Link to={index === list.length - 1 ? `/category/product/${item.id}` : `/category/${item.id}`}>{item.categoryName}</Link>,
      name: item.categoryName
    })).concat([{
      title: productData?.productName
    }]))

  }, [productData])

  // console.log(productDetailData)



  // const { data, loading } = useRequest(() => categoryApi.list());

  return (
    <Section.Container>
      <Section>
        <Breadcrumb
          separator=">"
          items={breadcrumbList}
        />
        <Divider />
        <Row gutter={40}>
          <Col sm={12} xs={24}>
            <Image preview={false} src={productImages[selectedProductImageIndex]?.imageUrl} />
            <ImageGalleryList>
              {
                productImages.map((item, index) => (
                  <Image
                    key={index}
                    preview={false}
                    src={item?.imageUrl}
                    style={{
                      width: 100,
                      border: index === selectedProductImageIndex && '1px solid red'
                    }}
                    onClick={() => {
                      setSelectedProductImageIndex(index);
                    }} />
                ))
              }
            </ImageGalleryList>
          </Col>
          <Col sm={12} xs={24}>
            <Title level={3}>{productData?.productNo}</Title>
            <Title style={{ marginTop: 0 }} level={2}>{productData?.productName}</Title>
            {
              productFeatures.length > 0 &&
              <ul style={{ paddingLeft: 18 }}>
                {productFeatures.map((item, index) => {
                  return (<li style={{ lineHeight: 2, fontSize: 18 }} key={index}>{item?.description}</li>)
                })}
              </ul>
            }
            {featureImages.length > 0 && <Image preview={false} src={featureImages[0].imageUrl} />}
            <Divider />
            <Title level={4} style={{margin: 0}}>選擇規格</Title>
            {/* product spec section */}
            <Row style={{paddingTop: 30}}>
              <Col>
                {
                  (productData?.specs && productData.specs.length > 0) && 
                    productData.specs.map((spec, index) => (
                      <Row key={index} gutter={50} align='middle'>
                        <Col>
                          <Title level={4} style={{margin: 0}}>{spec.specName}</Title>
                        </Col>
                        <Col>
                          <ButtonGroup items={spec.items.map(item => ({
                            name: item.itemName,
                            value: item.productNo
                          }))} />
                        </Col>
                      </Row>
                    ))
                }
              </Col>
            </Row>

            {/* add product to cart count */}
            <Row style={{paddingTop: 30}} align='middle' gutter={50}>
              <Col>
                <Title style={{margin: 0}} level={4}>數量</Title>
              </Col>
              <Col>
                <CartCountOperator />
              </Col>
            </Row>
            <Row style={{paddingTop: 30}} align='middle' gutter={50}>
              <Col>
                <Button size='large'>加入購物車</Button>
              </Col>
              <Col>
                <Button size='large'>直接購買</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{paddingTop: 80}}>
          <Col span={24}>
            <TabList introTabData={introTabData} specTabData={specTabData} downloadFiles={downloadFiles}  />
          </Col>
        </Row>
      </Section>
    </Section.Container>
  );
}

const ImageGalleryList = styled.div`
  background-color: #fff;
  padding: 10px;
  width: 100%;
  overflow-x: scroll;
  display: flex;
  gap: 20px;
  flex-wrap: nowrap;
  cursor: pointer;
`