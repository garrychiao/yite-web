import { useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Divider, List, Breadcrumb, Card, Row, Col, Typography, Carousel, Image, Tabs, notification } from 'antd';
import color from 'shared/style/color';
import i18n from 'i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { Section } from 'shared/layout';
import { useRequest } from 'ahooks';
import { categoryApi, productApi } from 'page/api';
import getSysFileUrl from 'utils/apiSysFiles';
import FullSpin from 'shared/FullSpin';
import { useAuthUser } from 'react-auth-kit';

const { Title } = Typography;

export default function FileTab({ downloadFiles }) {

  const auth = useAuthUser();
  const user = auth();
  console.log(`downloadFiles`);
  console.log(downloadFiles);
  const [loading, setLoading] = useState(false);

  const onDownload = (fileURL, fileName) => {

    if (!user?.enable) {
      return notification.error({
        message: '您的用戶已被停權'
      })
    }

    setLoading(true)
    fetch(fileURL, {
      method: 'GET',
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          fileName,
        );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      }).finally(() => {
        setLoading(false)
      })
  }

  return (
    <FullSpin spinning={loading}>
      <Row justify={'center'}>
        <Col>

          {downloadFiles.map((file, index) => {
            return <Title
              style={{ cursor: 'pointer' }}
              type="danger"
              key={index}
              level={5}
              onClick={() => {
                onDownload(file.uri, file.name);
              }}>{file.name}</Title>
            // <a key={index} href={file.uri} download>{file.name}</a>
          })}

        </Col>
      </Row>
    </FullSpin>
  )

}
