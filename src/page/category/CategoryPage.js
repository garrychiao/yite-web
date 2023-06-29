import { useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Divider, List, Breadcrumb, Card, Row, Col, Typography, Carousel, Image } from 'antd';
import color from 'shared/style/color';
import i18n from 'i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { Section } from 'shared/layout';
import { useRequest } from 'ahooks';
import { categoryApi, productApi } from 'page/api';
import getSysFileUrl from 'utils/apiSysFiles';

const { Title } = Typography;

export default function CategoryPage() {

  const { id } = useParams();
  const { data:categoryListData, loading:loadingCategoryList } = useRequest(() => categoryApi.list({
    params: id ? {
      parentCategoryId: id
    } : {
      isRoot: true,
    }
  }), {
    refreshDeps: [id]
  });

  const { data:categoryDetailData, loading:loadingCategoryDetailData } = useRequest(() => categoryApi.get({id}), {
    ready: !!id,
    refreshDeps: [id]
  });
  console.log(`categoryDetailData`)
  console.log(categoryDetailData)

  const categoryItems = useMemo(() => {
    const list = categoryListData?.rows || [];
    return list.length ? list.map(item => ({
      ...item,
      imageUrl: getSysFileUrl(item.imageSysFileId)
    })) : list
  }, [categoryListData]);

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
    const list = categoryDetailData?.categoryPath || [];
    return initPath.concat(list.map(item => ({
      title: <Link to={`/category/${item.id}`}>{item.categoryName}</Link>,
      name: item.categoryName
    })))

  }, [categoryDetailData])

  console.log(`breadcrumbList`)
  console.log(breadcrumbList)

  return (
    <Wrapper>
      <Section.Container>
        <Section style={{height: '100vh'}}>
          <Breadcrumb
            separator=">"
            items={breadcrumbList}
          />

          <Divider />

          <List
            grid={{
              gutter: 36,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 4,
              xxl: 4,
            }}
            rowKey={'id'}
            dataSource={categoryItems}
            renderItem={(item) => {
              const link = !id ? `./${item.id}` : !item.hasProduct ? `../${item.id}` : `../product/${item.id}`

              return (<List.Item>
                <Link to={link}>
                  <CategoryItem>
                    <Image preview={false} src={item.imageUrl} width={'100%'} />
                    <Title level={4} style={{textAlign: 'center'}}>{item.categoryName}</Title>
                  </CategoryItem>
                </Link>
              </List.Item>)
            }}
          />
        </Section>
      </Section.Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .ant-list-item:hover {
    box-shadow: 0px 3px 6px #00000029;
  }
`

const CategoryItem = styled.div`
  padding-bottom: 5%;
  cursor: pointer;
`

// const CategoryItemTitle = styled.div`
  
// `