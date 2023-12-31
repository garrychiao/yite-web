import axios from 'axios';
import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Input, Checkbox, Divider, Row, Col, Typography, Button, Image, Table, notification, Form, Radio, Space } from 'antd';
import color from 'shared/style/color';
import i18n from 'i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Section } from 'shared/layout';
import { ProductCard, ListHeader } from './fields';
import { useCart } from 'shared/cart';
import getSysFileUrl from 'utils/apiSysFiles';
import CurrencyFormat from 'react-currency-format';
import { useAuthUser } from 'react-auth-kit';
import { orderApi } from 'page/api';
import { useRequest } from 'ahooks';
import { basicFormProps, FormRow, FormCol } from 'shared/form';
import FullSpin from 'shared/FullSpin';
import { getUserAuthority } from 'utils/UserAuthority';

const { Title } = Typography;

export default function ConfirmOrderPage() {

  const [initState, setInitState] = useState(true);


  const [paymentData, setPaymentData] = useState({})
  const [paymentUrl, setPaymentUrl] = useState('')

  const ORDERER = 'orderer';
  const RECEIVER = 'receiver'
  const [form] = Form.useForm();
  const formRef = useRef();
  const [sameAsOrderer, setSameAsOrderer] = useState(false);

  const { cart, fetchCart, selectedItems, setSelectedItems, getSelectedFromLocal } = useCart();
  const auth = useAuthUser()
  const user = auth();
  console.log(user)
  const ordererLockState = useMemo(() => !!user?.customer, [user]);
  const userAuthority = useMemo(() => getUserAuthority(user.role), [user]);
  // console.log(`userAuthority`)
  // console.log(userAuthority)
  const { id } = useParams();
  const navigate = useNavigate();

  const cartData = useMemo(() => cart.filter(item => selectedItems.indexOf(item.id) > -1).map(item => ({
    ...item,
    productName: item?.product.productName,
    productNo: item?.product.productNo,
    image: getSysFileUrl(item?.product?.mainImages[0].imageSysFileId),
  })), [selectedItems, cart])
  // console.log(`cartData`)
  // console.log(cartData)

  const totalPrice = useMemo(() => _.sum(cartData.map(item => item.qty * item.unitPrice)), [cartData]);

  const { run: createOrder, loading: loadingCreateOrder } = useRequest(async ({ payload }) => orderApi.create({ payload }), {
    manual: true,
    onSuccess: async (data) => {
      console.log('order.create.data:', data)
      checkDirectToECPay(data.id);

    }, onError: (err) => {
      console.error(err);
      notification.error({
        message: err?.message
      })
    }
  });

  const checkDirectToECPay = useCallback((id) => {
    const { isMonthClose } = form.getFieldsValue();

    if (!isMonthClose) {
      console.log(`${window.location.origin}/order/payment/confirm/${id}`)
      navigate(`/order/initECPay/${id}`);
    } else {
      navigate(`/order/history/${id}`);
    }
  }, [form])

  useEffect(() => {
    if (id && cart.length > 0 && selectedItems.length !== 1) {
      setSelectedItems([id]);
    } else if (cart.length > 0 && selectedItems.length === 0) {
      const selectedItems = getSelectedFromLocal();
      if (selectedItems.length > 0) {
        setSelectedItems(selectedItems);
      }
    }
  }, [cart, id, selectedItems, setSelectedItems, getSelectedFromLocal])

  const columns = [
    {
      title: '圖片',
      dataIndex: 'image',
      key: 'image',
      width: 150,
      render: (src) => <Image src={src} preview={false} width='100%' />,
    },
    {
      title: '名稱',
      dataIndex: 'productName',
      width: 250,
      key: 'productName',
    },
    {
      title: '編號',
      dataIndex: 'productNo',
      width: 150,
      key: 'productNo',
    },
    {
      title: '規格',
      dataIndex: 'selectedProductSpecs',
      key: 'selectedProductSpecs',
      render: (selectedProductSpecs) => <>{
        selectedProductSpecs.length > 0 ?
          selectedProductSpecs.map(item => item.itemName).join('、') :
          '無'
      }</>,
    },
    {
      title: '單價',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (value) => (<CurrencyFormat
        value={value}
        thousandSeparator={true}
        prefix={'$'}
        displayType='text'
      />)

    },
    {
      title: '數量',
      dataIndex: 'qty',
      key: 'qty',
      render: (value) => (<CurrencyFormat
        value={value}
        thousandSeparator={true}
        displayType='text'
      />)
    },
    {
      title: '總計',
      dataIndex: 'total',
      key: 'total',
      render: (_, record) => (<CurrencyFormat
        value={record.qty * record.unitPrice}
        thousandSeparator={true}
        prefix={'$'}
        displayType='text'
      />)
    },
  ];


  const updateReceiver = useCallback((receiverData = {}) => {
    localStorage.setItem('__receiver', JSON.stringify(receiverData));
  }, [])

  const fetchReceiver = useCallback(() => {
    const receiverData = JSON.parse(localStorage.getItem('__receiver'));
    console.log(`receiverData`)
    console.log(receiverData)
    return receiverData
  }, [])


  const onConfirmOrder = async () => {

    try {
      await form.validateFields();
      const { orderer, receiver, isMonthClose } = form.getFieldsValue();

      updateReceiver(receiver);
      const payload = {
        userId: user?.id,
        totalPrice,
        cartProducts: cartData.map(item => ({
          cartId: item.id
        })),
        orderName: orderer.name,
        orderPhone: orderer.phone,
        orderEmail: orderer.email,
        orderAddress: orderer.address,
        orderZipcode: orderer.zipcode,
        receiverName: receiver.name,
        receiverPhone: receiver.phone,
        receiverEmail: receiver.email,
        receiverAddress: receiver.address,
        receiverZipcode: receiver.zipcode,
        sameAsOrderer,
        isMonthClose
      }

      console.log(`payload`);
      console.log(payload);
      createOrder({ payload });
    } catch (err) {
      console.error(err);
    }
  }

  const loading = loadingCreateOrder;

  const onCheckSameAsOrderer = async (value) => {
    console.log(value)
    const checked = value?.target?.checked;

    if (checked) {
      const formValues = form.getFieldsValue();
      const { orderer } = formValues;
      // console.log(Object.keys(orderer).map(key => [ORDERER, key]))
      try {
        await form.validateFields(Object.keys(orderer).map(key => [ORDERER, key]));
        setSameAsOrderer(checked);
        form.setFieldsValue({
          [RECEIVER]: orderer
        })
      } catch (err) {
        console.error(err);
        notification.warning({
          message: '請確實填寫訂購人資料'
        })
      }
    } else {
      setSameAsOrderer(checked);
    }
  }

  useEffect(() => {
    if (formRef?.current && initState) {
      // if (ordererLockState) {

      // } else {
      //   form.setFieldsValue({
      //     [ORDERER]: {
      //       name: auth().displayName,
      //       email: auth().email,
      //     }
      //   })
      // }
      // console.log(`use effect auth()`)
      // console.log(auth())
      // form.setFieldsValue({
      //   [ORDERER]: {
      //     name: auth().displayName,
      //     phone: auth().customer?.phone,
      //     address: auth().customer?.address,
      //     email: auth().email,
      //   }
      // })

      const receiverData = fetchReceiver();
      if (receiverData) {
        form.setFieldsValue({
          [RECEIVER]: {
            ...receiverData
          }
        })
      }
      setInitState(false);
    }
  }, [auth, fetchReceiver, form])

  useEffect(() => {
    if (formRef?.current) {
      form.setFieldsValue({
        [ORDERER]: {
          name: user?.customer?.contactPerson ? user?.customer?.contactPerson : user?.displayName,
          phone: user?.customer?.phone,
          address: user?.customer?.address,
          email: user?.customer?.email ? user?.customer?.email : user?.email,
        }
      })
    }
  }, [user, form])

  return (
    <FullSpin spinning={loading}>
      <Section.Container>
        <Section>
          <Title level={4}>確認訂單 | 結帳</Title>
          <Divider />
          <Table
            scroll={{
              x: 1200,
            }}
            loading={loading}
            pagination={false}
            columns={columns}
            dataSource={cartData}
            rowKey='id'
            summary={() => (
              <Table.Summary fixed='bottom'>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={5} />
                  <Table.Summary.Cell index={1}>
                    <Title level={5}>
                      總計：
                    </Title>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>
                    <Title level={5}>
                      <CurrencyFormat
                        value={totalPrice}
                        thousandSeparator={true}
                        prefix={'$'}
                        displayType='text'
                      />
                    </Title>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />
          <Divider />
          {/* order creator data */}
          <Form
            ref={formRef}
            form={form}
            initialValues={{ ...user }}
            {...basicFormProps}>
            <Row gutter={40}>
              <StyledFormContainer lg={12}>
                <Title level={4} style={{ marginTop: 0, marginBottom: 20 }}>訂購人資料</Title>
                <FormRow>
                  <FormCol>
                    <Form.Item
                      name={[ORDERER, 'name']}
                      label='姓名'
                      rules={[
                        { required: true, message: '姓名為必填' },
                      ]}
                    >
                      <Input disabled={ordererLockState} placeholder='姓名為必填' autoComplete='name' />
                    </Form.Item>
                  </FormCol>
                  <FormCol>
                    <Form.Item
                      name={[ORDERER, 'phone']}
                      label='聯絡電話'
                      rules={[
                        { required: true, message: '聯絡電話為必填' },
                      ]}
                    >
                      <Input disabled={ordererLockState} placeholder='聯絡電話為必填' autoComplete='phone' />
                    </Form.Item>
                  </FormCol>
                </FormRow>
                <FormRow>
                  <FormCol>
                    <Form.Item
                      name={[ORDERER, 'email']}
                      label='Email'
                      rules={[
                        { required: true, message: 'Email為必填' },
                      ]}
                    >
                      <Input disabled={ordererLockState} placeholder='Email為必填' autoComplete='email' />
                    </Form.Item>
                  </FormCol>
                  <FormCol>
                    <Form.Item
                      name={[ORDERER, 'zipcode']}
                      label='郵遞區號'
                    >
                      <Input disabled={ordererLockState} autoComplete='postal-code' />
                    </Form.Item>
                  </FormCol>
                </FormRow>
                <FormRow>
                  <FormCol full>
                    <Form.Item
                      name={[ORDERER, 'address']}
                      label='地址'
                      rules={[
                        { required: true, message: '地址為必填' },
                      ]}
                    >
                      <Input disabled={ordererLockState} placeholder='地址為必填' autoComplete='address' />
                    </Form.Item>
                  </FormCol>
                </FormRow>
              </StyledFormContainer>
              <Col lg={12}>
                <Row gutter={50} align='middle' style={{ marginBottom: 20 }}>
                  <Col>
                    <Title level={4} style={{ margin: 0 }}>收件人資料</Title>
                  </Col>
                  <Col>
                    <Checkbox checked={sameAsOrderer} onChange={onCheckSameAsOrderer}>同訂購人</Checkbox>
                  </Col>
                </Row>
                <FormRow>
                  <FormCol>
                    <Form.Item
                      name={[RECEIVER, 'name']}
                      label='姓名'
                      rules={[
                        { required: true, message: '姓名為必填' },
                      ]}
                    >
                      <Input disabled={sameAsOrderer} placeholder='姓名為必填' autoComplete='name' />
                    </Form.Item>
                  </FormCol>
                  <FormCol>
                    <Form.Item
                      name={[RECEIVER, 'phone']}
                      label='聯絡電話'
                      rules={[
                        { required: true, message: '聯絡電話為必填' },
                      ]}
                    >
                      <Input disabled={sameAsOrderer} placeholder='聯絡電話為必填' autoComplete='phone' />
                    </Form.Item>
                  </FormCol>
                </FormRow>
                <FormRow>
                  <FormCol>
                    <Form.Item
                      name={[RECEIVER, 'email']}
                      label='Email'
                      rules={[
                        { required: true, message: 'Email為必填' },
                      ]}
                    >
                      <Input disabled={sameAsOrderer} placeholder='Email為必填' autoComplete='email' />
                    </Form.Item>
                  </FormCol>
                  <FormCol>
                    <Form.Item
                      name={[RECEIVER, 'zipcode']}
                      label='郵遞區號'
                    >
                      <Input disabled={sameAsOrderer} autoComplete='postal-code' />
                    </Form.Item>
                  </FormCol>
                </FormRow>
                <FormRow>
                  <FormCol full>
                    <Form.Item
                      name={[RECEIVER, 'address']}
                      label='地址'
                      rules={[
                        { required: true, message: '地址為必填' },
                      ]}
                    >
                      <Input disabled={sameAsOrderer} placeholder='地址為必填' autoComplete='address' />
                    </Form.Item>
                  </FormCol>
                </FormRow>
              </Col>
            </Row>
            <Divider />

            <Row>
              <Col lg={12}>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name={'isMonthClose'}
                      label={<Title level={4} style={{ marginBottom: 20 }}>選擇付款方式</Title>}
                      rules={[
                        { required: true, message: '付款方式為必填' },
                      ]}
                    >
                      <Radio.Group onChange={() => { }} required>
                        <Space direction="vertical" size={'large'}>
                          <Radio value={false}>信用卡一次付清</Radio>
                          <Radio disabled={!userAuthority?.bill_monthly} value={true}>月結用戶</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>

                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <Row justify={'space-around'} style={{ paddingTop: 50 }}>
            <Col>
              <Link to='/cart'>
                <Button size='large'>
                  上一步
                </Button>
              </Link>
            </Col>
            <Col>
              <Button size='large' onClick={() => {
                onConfirmOrder();
              }}>
                確認送出
              </Button>
            </Col>
          </Row>
        </Section>
      </Section.Container>
      <form id="payForm" action={paymentUrl} method="POST" style={{ display: 'none' }}>
        <input name="MerchantID" value={paymentData.MerchantID} autoComplete="off" />
        <input name="MerchantTradeNo" value={paymentData.MerchantTradeNo} autoComplete="off" />
        <input name="MerchantTradeDate" value={paymentData.MerchantTradeDate} autoComplete="off" />
        <input name="PaymentType" value={paymentData.PaymentType} autoComplete="off" />
        <input name="TotalAmount" value={paymentData.TotalAmount} autoComplete="off" />
        <input name="TradeDesc" value={paymentData.TradeDesc} autoComplete="off" />
        <input name="ItemName" value={paymentData.ItemName} autoComplete="off" />
        <input name="ReturnURL" value={paymentData.ReturnURL} autoComplete="off" />
        <input name="ChoosePayment" value={paymentData.ChoosePayment} autoComplete="off" />
        <input name="CheckMacValue" value={paymentData.CheckMacValue} autoComplete="off" />
        <input name="EncryptType" value={paymentData.EncryptType} autoComplete="off" />
        <input name="ClientBackURL" value={paymentData.ClientBackURL} autoComplete="off" />
        <input name="CustomField1" value={paymentData.CustomField1} autoComplete="off" />
        <input name="CustomField2" value={paymentData.CustomField2} autoComplete="off" />
        <input name="NeedExtraPaidInfo" value={paymentData.NeedExtraPaidInfo} autoComplete="off" />
        <button type="submit">
          確認訂單
        </button>
      </form>
    </FullSpin>
  );
}

const StyledFormContainer = styled(Col)`
  border-right: 1px solid #d0d0d0;
`

