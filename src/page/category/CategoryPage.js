import { useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Divider, List, Breadcrumb, Card, Row, Col, Typography, Carousel, Image } from 'antd';
import color from 'shared/style/color';
import i18n from 'i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { Section } from 'shared/layout';
import { useRequest, useEventTarget } from 'ahooks';
import { categoryApi, productApi } from 'page/api';
import getSysFileUrl from 'utils/apiSysFiles';
import FullSpin from 'shared/FullSpin';
import SearchInput from 'shared/SearchInput';
import searchValues from 'shared/searchValues';

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

  const [search, onSearch] = useState('');

  // console.log(`categoryListData`)
  // console.log(categoryListData)

  const categoryItems = useMemo(() => {
    const list = categoryListData?.rows || [];
    return list.filter(item => searchValues(Object.values({
      name: item.categoryName
    }), search.toString())).map(item => ({
      ...item,
      imageUrl: getSysFileUrl(item.imageSysFileId)
    }))
  }, [categoryListData, search]);

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

  // console.log(`breadcrumbList`)
  // console.log(breadcrumbList)

  const loading = loadingCategoryDetailData || loadingCategoryList

  return (
    <FullSpin spinning={loading}>
      <Wrapper>
        <Section.Container>
          <Section>
            <Row justify={'space-between'}>
              <Col>
                <Breadcrumb
                  separator=">"
                  items={breadcrumbList}
                />
              </Col>
              <Col>
                <SearchInput onChange={onSearch} onSearch={() => {}} />
              </Col>
            </Row>

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
                // console.log(item)
                const link = id ? 
                  !item.hasProduct ? `../${item.id}` : `../product/${item.id}`
                : !item.hasProduct ? `./${item.id}` : `./product/${item.id}`

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
    </FullSpin>
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