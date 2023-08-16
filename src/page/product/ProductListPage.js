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
import FullSpin from 'shared/FullSpin';
import SearchInput from 'shared/SearchInput';
import searchValues from 'shared/searchValues';

const { Title } = Typography;

export default function ProductListPage() {

  const [search, onSearch] = useState('');

  const { id } = useParams();
  const { data:productListData, loading:loadingProductListData } = useRequest(() => productApi.list({
    params: {
      categoryId: id,
      status: 'ACTIVE',
    }
  }), {
    refreshDeps: [id]
  });

  const { data:productDetailData, loading:loadingProductDetailData } = useRequest(() => categoryApi.get({id}), {
    refreshDeps: [id]
  });

  const productItems = useMemo(() => {
    const list = productListData?.rows || [];
    return list.filter(item => searchValues(Object.values({
      name: item.productName,
      productNo: item.productNo,
    }), search.toString())).map(item => ({
      ...item,
      imageUrl: item.mainImages ?  getSysFileUrl(item.mainImages[0].imageSysFileId) : ''
    }))
  }, [productListData, search]);

  // console.log(`data`)
  // console.log(productListData)

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
    const list = productDetailData?.categoryPath || [];
    return initPath.concat(list.map((item, index) => ({
      title: <Link to={index === list.length -1 ? `/category/product/${item.id}` : `/category/${item.id}`}>{item.categoryName}</Link>,
      name: item.categoryName
    })))

  }, [productDetailData])

  // console.log(`breadcrumbList`)
  // console.log(breadcrumbList)

  const loading = loadingProductDetailData || loadingProductListData;


  return (
    <FullSpin spinning={loading}>
      <Wrapper>
        <Section.Container>
          <Section style={{minHeight: '100vh'}}>
            <Row justify={'space-between'} align='middle' gutter={[20, 20]}>
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

            {productItems.length === 0 && <>查無產品</>}
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
              dataSource={productItems}
              renderItem={(item) => {
                return (<List.Item>
                  <Link to={`../productDetail/${item.id}`}>
                    <CategoryItem>
                      <Image preview={false} src={item.imageUrl} width={'100%'} />
                      <Divider />
                      <Title level={5} style={{textAlign: 'center', marginTop: 0}}>{item.productNo}</Title>
                      <Title level={4} style={{textAlign: 'center', marginTop: 0}}>{item.productName}</Title>
                      <BulletList>
                        {item?.outsideFeatures && item.outsideFeatures.map((item, index) => (
                          <li key={index}>{item.description}</li>
                        ))}
                      </BulletList>
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
  margin-bottom: 10%;
  cursor: pointer;
  border: 1px solid #c0c0c0;
`

const BulletList = styled.ul`
  color: #333;
  font-size: 16px;
  letter-spacing: 2pt;
`
// const CategoryItemTitle = styled.div`
  
// `