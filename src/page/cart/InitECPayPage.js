import axios from 'axios';
import { useEffect, useMemo, useState, useRef } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Spin, Input, Checkbox, Divider, Row, Col, Typography, Button, Image, Table, notification, Form, Radio, Space } from 'antd';
import color from 'shared/style/color';
import i18n from 'i18next';
import { ArrowRightOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Section } from 'shared/layout';
import { ProductCard, ListHeader } from './fields';
import { useCart } from 'shared/cart';
import getSysFileUrl from 'utils/apiSysFiles';
import CurrencyFormat from 'react-currency-format';
import { useAuthUser } from 'react-auth-kit';
import { orderApi } from 'page/api';
import { useRequest } from 'ahooks';
import FullSpin from 'shared/FullSpin';
import { basicFormProps, FormRow, FormCol } from 'shared/form';

const { Title } = Typography;

export default function InitECPayPage() {

  const navigate = useNavigate();
  const { orderId } = useParams();
  const { hash: hashToken } = useLocation();
  const authedToken = localStorage.getItem('_auth');
  // console.log(`hashToken`)
  // console.log(hashToken)
  // console.log(`authedToken`)
  // console.log(authedToken)

  const authToken = useMemo(() => {
    const hash = hashToken.substring(1).trim();
    if (!authedToken && !hash) {
      notification.error({ message: 'User Unauthorized' })
      return navigate('/')
    }

    return `Bearer ${hash ? hash : authedToken}`

  }, [hashToken]);


  console.log(`authToken`)
  console.log(authToken)

  const [paymentData, setPaymentData] = useState({})
  const [paymentUrl, setPaymentUrl] = useState('')

  useRequest(() => orderApi.get(orderId, authToken), {
    ready: !!authToken,
    onSuccess: async (data) => {

      console.log(`data`)
      console.log(data)
      if (!(data.status === 'INIT' || data.status === 'DRAFT')) {
        notification.error({ message: 'Invalid Order Status' })
        return navigate('/')
      }

      try {
        const paymentResp = await orderApi.initPayment({
          userId: data.userId,
          orderId: data.id,
          showResultUrl: `${window.location.origin}/order/payment/confirm/${data.id}`
        }, authToken)

        console.log(paymentResp.payload);
        console.log(paymentResp.redirectUrl);
        setPaymentData({ ...paymentResp.payload });
        setPaymentUrl(paymentResp.redirectUrl)
        document.querySelector('#payForm').submit();

      } catch (err) {
        console.error(err);
      }
    },
    onError: (error) => {
      notification.error({ message: 'Cannot find order' })
      return navigate('/order/history')
    }
  });
  // console.log(data);



  return (
    <>
      <FullSpin tip="正在前往付款..." spinning={true} />
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

        <button type="submit">
          確認訂單
        </button>
      </form>
    </>
  );
}

const StyledFormContainer = styled(Col)`
  border-right: 1px solid #d0d0d0;
`

