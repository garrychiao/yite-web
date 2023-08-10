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

export default function SpecChooser({ product = {}, onSpecConfirmed }) {

  // console.log(`product`)
  // console.log(product)
  const [specOpen, setSpecOpen] = useState(false);
  // const { cart, fetchCart, selectedItems, addSelectedItem, removeSelectedItem } = useCart();

  const [specs, setSpecs] = useState({});


  useEffect(() => {
    if (product.selectedProductSpecs) {
      let tmp = {}
      product.selectedProductSpecs.forEach((item) => {
        console.log(item.productSpecId)
        tmp[item.productSpecId] = {};
        tmp[item.productSpecId].name = item.itemName;
        tmp[item.productSpecId].modelNo = item.modelNo;
      })
      setSpecs(tmp)
    }
  }, [product]);


  const productSpecs = useMemo(() => product?.specs || {}, [product]);

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

  const RenderSpecSelect = () => {

    let tmp = { ...specs };
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
                      return specs[spec.id].name
                    }}
                    items={spec.items.map(item => ({
                      name: item.itemName,
                      value: item.itemName,
                      modelNo: item.modelNo,
                    }))}
                    onChange={(name, modelNo) => {
                      tmp[spec.id].name = name;
                      tmp[spec.id].modelNo = modelNo;
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
              setSpecs(tmp);
              onSpecConfirmed(tmp);
            }}>
              確認
            </Button>
          </Col>
        </Row>
      </>
    )
  }

  return (
    <RenderSpecField>
      <Button
        onClick={() => setSpecOpen(true)} >
        {Object.keys(specs).map(key => specs[key].name).join('、')}
      </Button>
    </RenderSpecField>
  );
}
