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
import ReactPlayer from 'react-player';

const { Title, Text } = Typography;

export default function IntroTab({ introTabData }) {

  // console.log(`introTabData`)
  // console.log(introTabData)
  return (<>
    <Row justify={'center'}>
      <Col span={20}>
        <Text style={{ fontSize: 'inherit' }}>{introTabData?.introDescription}</Text>
      </Col>
    </Row>
    <Row justify={'center'}>
      {
        (introTabData?.introVideoUrls && introTabData?.introVideoUrls.length > 0) ?
          introTabData.introVideoUrls.map((item, index) => (
            <Col key={index} span={20} align={'center'}>
              <PlayerContaienr >
                <ReactPlayer url={item} />
              </PlayerContaienr>
            </Col>
          ))
          : <></>
      }
    </Row>
    <Row justify={'center'}>
      <Col span={20} align={'center'}>
        {
          (introTabData?.introImages && introTabData?.introImages.length > 0) ?
            introTabData.introImages.map((item, index) => (
              <FeatureImageContaienr key={index}>
                <Image preview={false} src={item.imageUrl} />
              </FeatureImageContaienr>
            ))
            : <></>
        }
      </Col>
    </Row>
  </>)

}

const PlayerContaienr = styled.div`
  padding: 20px;

`

const FeatureImageContaienr = styled.div`
  padding: 20px;

`