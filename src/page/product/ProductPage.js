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
import CurrencyFormat from 'react-currency-format';
import FullSpin from 'shared/FullSpin';

const { Title, Text } = Typography;

const defaultLight = '#5F8D4E';
const inventorySetup = [
  {
    count: 0,
    color: '#a0a0a0',
  },
  {
    count: 10,
    color: '#FF1E00',
  },
  {
    count: 100,
    color: '#EF5B0C',
  },
  {
    count: 200,
    color: '#F57328',
  },

]



export default function ProductPage() {

  // tmp section
  const inventoryCountList = [1000, 500, 199, 95, 5, 0];
  const [inventoryCount, setInventoryCount] = useState(0);

  const { id } = useParams();
  const [productData, setProductData] = useState({});
  // console.log(`productData`)
  // console.log(productData)
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
      setDownloadFiles(data
        .map((item) => {
          return { name: item.sysFile.originName, uri: getSysFileUrl(item.sysFileId) }
        })
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
    bulletData: productData?.specItems, // array
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

  const renderInventoryCount = (count) => {
    const target = inventorySetup.find(item => item.count >= count);
    if (target) {
      return <Text style={{ textAlign: 'center', fontSize: 18, color: target.color }}>{count}</Text>
    }
    return <Text style={{ textAlign: 'center', fontSize: 18, color: defaultLight }}>{count}</Text>
  }

  const onChangeInventoryCount = () => {
    const index = inventoryCountList.indexOf(inventoryCount);
    if (index !== inventoryCountList.length - 1) {
      setInventoryCount(inventoryCountList[index + 1]);
    } else {
      setInventoryCount(inventoryCountList[0]);
    }
  }


  console.log(productData)
  // const { data, loading } = useRequest(() => categoryApi.list());
  const loading = loadingProductDetailData || loadingProductFeaturesData || loadingProductFilesData || loadingProductImagesData;

  return (
    <FullSpin spinning={loading}>
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
              {
                productData?.customerPrice ? (
                  <Row gutter={50} align='middle'>
                    <Col>
                      <Title style={{ margin: 0 }} level={4}>會員價格</Title>
                    </Col>
                    <Col style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                      <CurrencyFormat
                        value={productData.defaultPrice}
                        thousandSeparator={true}
                        prefix={'$'}
                        displayType='text'
                        renderText={value => <small style={{ textDecoration: 'line-through' }}>{value}</small>}
                      />
                      <CurrencyFormat
                        value={productData.customerPrice.price}
                        thousandSeparator={true}
                        prefix={'$'}
                        style={{ fontSize: 20 }}
                        displayType='text'
                      />
                    </Col>
                  </Row>
                ) : (
                  <Row gutter={50}>
                    <Col>
                      <Title style={{ margin: 0 }} level={4}>價格</Title>
                    </Col>
                    <Col>
                      <CurrencyFormat
                        value={productData.defaultPrice}
                        thousandSeparator={true}
                        prefix={'$'}
                        style={{ fontSize: 20 }}
                        displayType='text'
                      />
                    </Col>
                  </Row>
                )
              }
              {
                (productData?.sellPrice && productData?.customerPrice) && (<>
                  <Divider />
                  <Row gutter={50}>
                    <Col>
                      <Title style={{ margin: 0 }} level={4}>建議價格</Title>
                    </Col>
                    <Col>
                      <CurrencyFormat
                        value={productData.sellPrice}
                        thousandSeparator={true}
                        prefix={'$'}
                        style={{ fontSize: 20 }}
                        displayType='text'
                      />
                    </Col>
                  </Row>
                </>)
              }
              <Divider />
              <Row gutter={50} align='middle'>
                <Col>
                  <Title style={{ margin: 0 }} level={4}>庫存數量</Title>
                </Col>
                <Col>
                  {renderInventoryCount(inventoryCount)}
                </Col>
                <Col>
                  <Button size='large' onClick={() => { onChangeInventoryCount() }}>切換庫存數量</Button>
                </Col>
              </Row>
              <Divider />
              {
                (productData?.specs && productData.specs.length > 0) &&
                <>
                  <Title level={4} style={{ margin: 0 }}>選擇規格</Title>
                  <Row style={{paddingBottom: 20}}>
                    <Col>
                      {productData.specs.map((spec, index) => (
                        <Row key={index} gutter={50} style={{ paddingTop: 20 }} align='middle'>
                          <Col>
                            <Title level={4} style={{ margin: 0 }}>{spec.specName}</Title>
                          </Col>
                          <Col>
                            <ButtonGroup items={spec.items.map(item => ({
                              name: item.itemName,
                              value: item.productNo
                            }))} />
                          </Col>
                        </Row>
                      ))}
                    </Col>
                  </Row>
                </>
              }
              {/* add product to cart count */}
              <Row align='middle' gutter={50}>
                <Col>
                  <Title style={{ margin: 0 }} level={4}>數量</Title>
                </Col>
                <Col>
                  <CartCountOperator />
                </Col>
              </Row>
              <Row style={{ paddingTop: 30 }} align='middle' gutter={50}>
                <Col>
                  <Button size='large'>加入購物車</Button>
                </Col>
                <Col>
                  <Button size='large'>直接購買</Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ paddingTop: 80 }}>
            <Col span={24}>
              <TabList introTabData={introTabData} specTabData={specTabData} downloadFiles={downloadFiles} />
            </Col>
          </Row>
        </Section>
      </Section.Container>
    </FullSpin>
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