import { useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Divider, List, Breadcrumb, Card, Row, Col, Typography, Carousel, Image, Tabs } from 'antd';
import color from 'shared/style/color';
import i18n from 'i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { Section } from 'shared/layout';
import { useRequest } from 'ahooks';
import { categoryApi, productApi } from 'page/api';
import getSysFileUrl from 'utils/apiSysFiles';
import IntroTab from './IntroTab';
import SpecTab from './SpecTab';
import FileTab from './FileTab';

const { Title } = Typography;

export default function TabList({ introTabData, specTabData, downloadFiles }) {

  const items = [
    {
      key: '1',
      label: '產品介紹',
      children: <IntroTab introTabData={introTabData} />,
    },
    {
      key: '2',
      label: `產品規格`,
      children: <SpecTab specTabData={specTabData} />,
    },
    {
      key: '3',
      label: `檔案下載`,
      children: <FileTab downloadFiles={downloadFiles} />,
    },
  ];


  return (<StyledTabs 
      centered 
      defaultActiveKey="1" 
      items={items} 
      size='large'
      tabBarGutter={100}
      onChange={() => {}} />)
  
}

const StyledTabs = styled(Tabs)`
  width: 100%;
  font-size: 20px;
`

const StyledTabBar = styled(Tabs)`
  width: 200px;
  color: #000;
`