import { useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Divider, List, Breadcrumb, Card, Row, Col, Typography, Carousel, Image, notification } from 'antd';
import color from 'shared/style/color';
import i18n from 'i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Section } from 'shared/layout';
import { useRequest } from 'ahooks';
import { authApi } from 'page/api';
import getSysFileUrl from 'utils/apiSysFiles';
import FullSpin from 'shared/FullSpin';
import { useSignIn } from 'react-auth-kit'
import axios from 'axios';

const { Title } = Typography;

export default function LoginResultPage() {

  const signIn = useSignIn()
  const navigate = useNavigate();
  const { hash } = useLocation();
  const formattedToken = hash.substring(1);
  
  const {run, loading} = useRequest(() => authApi.getMe({token: formattedToken}), {
    manual: true,
    onSuccess: (res) => {
      
      axios.defaults.baseURL = `${process.env.REACT_APP_API_BASE_URL}/api`;
      axios.interceptors.request.use(async (request) => {
        request.headers.Authorization = `Bearer ${formattedToken}`;
        return request;
      });

      signIn(
        {
            token: formattedToken,
            expiresIn: 60*24*7, // minutes => set to on week
            tokenType: "Bearer",
            authState: res,
        }
      )
      
      notification.success({
        message: 'login success'
      });
      
      navigate('/');
    },
    onError: (err) => {
      console.error(err);
    }
  });

  useEffect(() => {
    if (formattedToken) {
      run();
    }
  }, [formattedToken, run]);
  
  return (
    <FullSpin spinning={loading} />
  );
}
