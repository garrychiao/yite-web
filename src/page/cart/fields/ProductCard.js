import { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Checkbox, Popconfirm, notification, Button, Space, Card, Spin, Row, Col, Typography, Popover, Image } from 'antd';
import CurrencyFormat from 'react-currency-format';
import CartCountOperator from 'shared/cartCountOperator';
import getSysFileUrl from 'utils/apiSysFiles';
import ButtonGroup from 'shared/buttonGroup/ButtonGroup';
import { useRequest } from 'ahooks';
import { cartApi } from 'page/api';
import { useCart } from 'shared/cart';
import { Link } from 'react-router-dom';

const { Title } = Typography;

export default function ProductCard({ product = {} }) {

  const [specOpen, setSpecOpen] = useState(false);
  const { fetchCart, selectedItems, addSelectedItem, removeSelectedItem } = useCart();

  const [qty, setQty] = useState(1);
  const [specs, setSpecs] = useState({});
  

  useEffect(() => {
    setQty(product.qty);
    if (product.selectedProductSpecs) {
      let tmp = {}
      product.selectedProductSpecs.forEach((item) => {
        tmp[item.productSpecId] = item.itemName
      })
      setSpecs(tmp)
    }

  }, [product]);


  const isSelected = useMemo(() => selectedItems.map(item => item.id).includes(product.id), [product, selectedItems]);
  // console.log(`isSelected`)
  // console.log(isSelected)
  const productData = useMemo(() => product?.product || {}, [product]);
  // console.log(`productData`)
  // console.log(productData)
  const productSpecs = useMemo(() => product?.specs || {}, [product]);
  const mainImage = useMemo(() => getSysFileUrl(product?.product?.mainImages[0].imageSysFileId), [product]);
  // console.log(mainImage)
  const total = useMemo(() => qty * product.unitPrice, [qty, product]);

  const { run: updateToCart, loading: loadingUpdateToCart } = useRequest(({ payload }) => cartApi.update({ payload }), {
    manual: true,
    debounceInterval: 500,
    throttleInterval: 500,
    onSuccess: (data) => {
      console.log(data)
      fetchCart();
    }, onError: (err) => {
      console.error(err);
      notification.error({
        message: '發生錯誤'
      })
    }
  });

  const { run: deleteToCart, loading: loadingDeleteToCart } = useRequest(() => cartApi.delete({ id: product.id }), {
    manual: true,
    onSuccess: (data) => {
      // console.log(data)
      fetchCart();
      notification.success({
        message: `成功刪除 ${productData.productName}`
      })
    }, onError: (err) => {
      console.error(err);
      notification.error({
        message: '發生錯誤'
      })
    }
  });

  const onCartCounterChange = (value) => {
    console.log(value);
    triggerUpdate(value, specs);
    setQty(value);
  }

  const RenderSpecField = ({ children }) => (
    <Popover
      content={<RenderSpecSelect />}
      title="選擇規格"
      trigger="click"
      open={specOpen}
    >
      {children}
    </Popover>
  )

  const triggerUpdate = (qty, specs) => {

    const payload = {
      id: product.id,
      qty,
      selectedProductSpecs: Object.keys(specs).map(key => ({
        productSpecId: key,
        itemName: specs[key],
      }))
    }
    console.log(`payload`);
    console.log(payload);
    updateToCart({payload});
  }

  // useEffect(() => {
  //   triggerUpdate(qty, specs);
  // }, [qty, specs, triggerUpdate])

  const RenderSpecSelect = () => {

    let tmp = {...specs};
    return (
      <>
        <Row style={{ paddingBottom: 20 }}>
          <Col>
            {productSpecs.map((spec, index) => {
              return (<Row key={index} gutter={50} style={{ paddingTop: 20 }} align='middle'>
                <Col>
                  <Title level={5} style={{ margin: 0 }}>{spec.specName}</Title>
                </Col>
                <Col>
                  <ButtonGroup
                    size='middle'
                    selectedIndex={() => {
                      return specs[spec.id]
                    }}
                    items={spec.items.map(item => ({
                      name: item.itemName,
                      value: item.itemName
                    }))}
                    onChange={(value) => {
                      tmp[spec.id] = value;
                    }}
                  />
                </Col>
              </Row>)
            })}
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col>
            <Button onClick={() => {
              setSpecOpen(false);

            }}>
              關閉
            </Button>
          </Col>
          <Col>
            <Button onClick={() => {
              setSpecOpen(false);
              triggerUpdate(qty, tmp);
              setSpecs(tmp);
            }}>
              確認
            </Button>
          </Col>
        </Row>
      </>
    )
  }

  const loading = loadingUpdateToCart || loadingDeleteToCart;

  return (
    <StyledCard>
      <Spin spinning={loading}>
        <Row gutter={10} align='middle'>
          <Col span={1}>
            <Checkbox checked={isSelected} onChange={(value) => {
              if (value.target.checked) {
                addSelectedItem(product.id)
              } else {
                removeSelectedItem(product.id)
              }
            }} />
          </Col>
          <Col span={3}>
            <Image width='100%' src={mainImage} preview={false} />
          </Col>
          <Col span={5}>
            <Title level={5} style={{ margin: 0 }}>
              <Link to={`/category/productDetail/${productData.id}`}>
              {productData.productName}
              </Link>
            </Title>
          </Col>
          <Col span={3}>
            <Title level={5} style={{ margin: 0 }}>
              {(product?.selectedProductSpecs && product?.selectedProductSpecs.length > 0) ? <RenderSpecField>
                <Button
                  onClick={() => setSpecOpen(true)} >
                  {Object.keys(specs).map(key => specs[key]).join('、')}
                </Button>
              </RenderSpecField> : '無'}
            </Title>
          </Col>
          <Col span={3}>
            <Space direction='vertical'>
              {
                product.unitPrice !== product.defaultPrice ? <>
                  <CurrencyFormat
                    value={productData.defaultPrice}
                    thousandSeparator={true}
                    prefix={'$'}
                    displayType='text'
                    renderText={value => <StyledDefaultPrice>{value}</StyledDefaultPrice>}
                  />
                  <CurrencyFormat
                    value={productData.unitPrice}
                    thousandSeparator={true}
                    prefix={'$'}
                    displayType='text'
                    renderText={value => <StyledUnitPrice>{value}</StyledUnitPrice>}
                  />
                </> :
                  <CurrencyFormat
                    value={productData.defaultPrice}
                    thousandSeparator={true}
                    prefix={'$'}
                    displayType='text'
                    renderText={value => <StyledUnitPrice>{value}</StyledUnitPrice>}
                  />
              }

            </Space>
          </Col>
          <Col span={3}>
            <CartCountOperator initvalue={qty} onChange={(value) => onCartCounterChange(value)} />
          </Col>
          <Col span={3}>
            <CurrencyFormat
              value={total}
              thousandSeparator={true}
              prefix={'$'}
              displayType='text'
              renderText={value => <StyledUnitPrice>{value}</StyledUnitPrice>}
            />
          </Col>
          <Col span={3}>
            <Popconfirm
              title={`刪除 ${productData.productName} ?`}
              description={`確定從購物車移除 ${productData.productName} 嗎？`}
              onConfirm={() => {
                deleteToCart();
              }}
              // onCancel={() => {}}
              okText="確認"
              cancelText="取消"
            >
              <Button danger>刪除</Button>
            </Popconfirm>
          </Col>
        </Row>
      </Spin>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  width: 100%;
`

const StyledDefaultPrice = styled.div`
  text-decoration: line-through;
  color: #a0a0a0;
`

const StyledUnitPrice = styled.div`
  font-size: large;
`