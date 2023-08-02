import { useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Divider, Form, Breadcrumb, Card, Row, Col, Typography, Carousel, Image, notification } from 'antd';
import color from 'shared/style/color';
import i18n from 'i18next';
import { ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Section } from 'shared/layout';
import { useRequest } from 'ahooks';
import { cartApi, productApi } from 'page/api';
import getSysFileUrl from 'utils/apiSysFiles';
import { TabList } from './fields';
import ButtonGroup from 'shared/buttonGroup';
import CartCountOperator from 'shared/cartCountOperator';
import CurrencyFormat from 'react-currency-format';
import FullSpin from 'shared/FullSpin';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { useCart } from 'shared/cart';
import { QuestionCircleOutlined, } from '@ant-design/icons';


const { Title, Text } = Typography;

// const defaultLight = '#5F8D4E';
// const inventorySetup = [
//   {
//     count: 0,
//     color: '#a0a0a0',
//   },
//   {
//     count: 10,
//     color: '#FF1E00',
//   },
//   {
//     count: 100,
//     color: '#EF5B0C',
//   },
//   {
//     count: 200,
//     color: '#F57328',
//   },

// ]

export default function ProductPage({ preview = false }) {


  // console.log('is preivew', preview);
  const { fetchCart } = useCart();

  const navigate = useNavigate();
  // console.log(cart)
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated()
  const [form] = Form.useForm();
  // tmp section
  // const inventoryCountList = [1000, 500, 199, 95, 5, 0];
  // const [inventoryCount, setInventoryCount] = useState(0);
  const permissionValid = useMemo(() => (isAuthenticated() && !preview), [preview, isAuthenticated]);
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
  //
  const [modelNo, setModelNo] = useState(false);
  // const [inventoryColor, setInventoryColor] = useState('grey');
  const [inventoryData, setInventoryData] = useState({});
  console.log(`inventoryData`)
  console.log(inventoryData)
  // const productOrderable = useMemo(() => !!inventoryData.inventoryQty ,[inventoryData]);
  const productOrderable = true
  // storing spec data
  const [specDict, setSpecDict] = useState({});
  // console.log(`specDict`)
  // console.log(specDict)
  // add to cart
  const { run: addToCart, loading: loadingAddToCart } = useRequest(({ payload }) => cartApi.add({ payload }), {
    manual: true,
    onSuccess: (data) => {
      // console.log(data)
      fetchCart();
      notification.success({
        message: '成功加入購物車'
      })
    }, onError: (err) => {
      console.error(err);
      notification.error({
        message: '發生錯誤'
      })
    }
  });

  // add to cart
  const { run: runDirectBuy, loading: loadingDirectBuy } = useRequest(({ payload }) => cartApi.add({ payload }), {
    manual: true,
    onSuccess: (data) => {
      fetchCart();
      const { id } = data;
      navigate(`/order/confirm/${id}`)

    }, onError: (err) => {
      console.error(err);
      notification.error({
        message: '發生錯誤'
      })
    }
  });

  // console.log(`productFeatures`)
  // console.log(productFeatures)
  const { loading: loadingProductDetailData } = useRequest(() => productApi.get({ id }), {
    onSuccess: (data) => {
      // console.log(data)
      setProductData(data);
      if (data?.modelNo) {
        setModelNo(data.modelNo)
      }
      const dict = {};
      const specs = data?.specs || [];
      if (specs.length > 0) {
        specs.forEach((spec, index) => {
          if (index === 0) {
            setModelNo(spec.items[0].modelNo)
          }
          dict[spec.id] = spec.items[0].itemName
        })
      }
      setSpecDict(dict);
    }
  });

  const { loading: loadingProductInventory } = useRequest(() => productApi.getInventory({ productId: productData.id, modelNo: modelNo }), {
    refreshDeps: [modelNo],
    ready: !!modelNo,
    onSuccess: (data) => {
      setInventoryData(data);
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

  const onAddToCart = async (isDirectBuy) => {

    const user = auth();
    if (!user) {
      notification.warning({
        message: '請先登入'
      })
      return navigate('/login')
    }

    try {
      await form.validateFields();
      // console.log(form.getFieldsValue());
      const { qty } = form.getFieldsValue();

      const payload = {
        userId: auth().id,
        productId: productData.id,
        qty,
        selectedProductSpecs: Object.keys(specDict).map(key => ({
          productSpecId: key,
          itemName: specDict[key],
        }))
      }
      // console.log(`payload`);
      // console.log(payload);

      if (isDirectBuy) {
        runDirectBuy({ payload });
      } else {
        addToCart({ payload });
      }


    } catch (err) {
      console.error('error:onAddToCart');
      console.error(err);
    } finally {

    }
  }


  // console.log(productData)
  // const { data, loading } = useRequest(() => categoryApi.list());
  const loading = loadingProductDetailData ||
    loadingProductFeaturesData ||
    loadingProductFilesData ||
    loadingProductImagesData ||
    loadingAddToCart ||
    loadingDirectBuy ||
    loadingProductInventory;

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
              產品編號：{modelNo}
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
                  <Title style={{ margin: 0 }} level={4}>庫存狀態</Title>
                </Col>
                <Col>
                  {(inventoryData?.color && inventoryData?.color === 'unknown') ?
                    <QuestionCircleOutlined style={{ fontSize: 20 }} /> :
                    <InventoryIndicator $type={inventoryData?.color} />}
                </Col>
              </Row>
              <Divider />
              {
                (productData?.specs && productData.specs.length > 0) &&
                <>
                  <Title level={4} style={{ margin: 0 }}>選擇規格</Title>
                  <Row style={{ paddingBottom: 20 }}>
                    <Col>
                      {productData.specs.map((spec, index) => (
                        <Row key={index} gutter={50} style={{ paddingTop: 20 }} align='middle'>
                          <Col>
                            <Title level={4} style={{ margin: 0 }}>{spec.specName}</Title>
                          </Col>
                          <Col>
                            <ButtonGroup
                              selectedIndex={spec?.items[0]?.itemName}
                              items={spec.items.map(item => ({
                                name: item.itemName,
                                value: item.itemName,
                                modelNo: item.modelNo,
                              }))}
                              onChange={(value, modelNo) => {
                                setModelNo(modelNo)
                                setSpecDict({
                                  ...specDict,
                                  [spec.id]: value,
                                })
                              }}
                            />
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
                <Col style={{ alignSelf: 'center' }}>
                  <Form form={form} initialValues={{ qty: 1 }}>
                    <Form.Item name='qty' style={{ margin: 0 }}>
                      <CartCountOperator />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
              <Row style={{ paddingTop: 30 }} align='middle' gutter={50}>
                <Col>
                  <Button
                    disabled={!permissionValid || !productOrderable}
                    size='large'
                    onClick={() => onAddToCart(false)}>
                    <ShoppingCartOutlined />
                    加入購物車
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled={!permissionValid || !productOrderable}
                    size='large'
                    onClick={() => onAddToCart(true)}>
                    <ShoppingOutlined />
                    直接購買
                  </Button>
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

const InventoryIndicator = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => {
    switch (props.$type) {
      case 'green':
        return '#66cc00'
      case 'yellow':
        return '#F4D160'
      case 'red':
        return '#ff0000'
      case 'grey':
        return '#BDCDD6'
      default:
        return '#66cc00'
    }
  }};
  box-shadow: 0px 0px 2px 2px ${props => {
    switch (props.$type) {
      case 'green':
        return '#66cc00'
      case 'yellow':
        return '#F4D160'
      case 'red':
        return '#ff0000'
      case 'grey':
        return '#BDCDD6'
      default:
        return '#66cc00'
    }
  }};;

`