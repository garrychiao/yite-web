import { Fragment, useMemo, useEffect, useState } from 'react';
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

const { Title, Text } = Typography;

export default function SpecTab({ specTabData }) {

  // console.log(`specTabData`)
  // console.log(specTabData)

  return (<Row justify={'center'}>
    <Col span={20}>
      {
        specTabData?.bulletData ? <>
          {specTabData.bulletData.map((bullet, index) => (
            <Row key={index} justify={'center'}>
              <Col>
                <Text style={{ fontSize: 20 }}>
                  {`\u2022 ${bullet.description}`}
                </Text>
              </Col>
            </Row>
          ))}
        </> : <></>
      }
      {
        specTabData?.tableData ? (<>
          {specTabData.tableData.map((category, index) => (
            <Fragment key={index}>
              <TableHeader level={4} style={{}}>{category.categoryName}</TableHeader>
              {category.items.map((item, i) => (
                <Row key={i}>
                  <Col style={{padding: 10, borderBottom: '1px solid grey'}} span={12}>
                    <Text style={{fontSize: 'inherit'}}>{item.key}</Text>
                  </Col>
                  <Col style={{padding: 10,  borderBottom: '1px solid grey'}} span={12}>
                    <Text style={{fontSize: 'inherit'}}>{item.value}</Text>
                  </Col>
                </Row>))}
            </Fragment>))}
        </>) : <></>
      }
    </Col>
  </Row>)

}

const TableHeader = styled(Title)`
  background-color: #bbb;
  padding: 10px;
`

const TableContent = styled(Text)`
border: 1px solid #000;
`