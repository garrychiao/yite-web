import styled from 'styled-components';
import { Suspense, useEffect } from 'react';
import { useBoolean, useResponsive } from 'ahooks';
import { Layout } from 'antd';
import color from 'shared/style/color';
import MainHeader from './MainHeader';
import useMainRoutes from './useMainRoutes';

export default function MainPage() {
  const [collapsed, { toggle, setTrue: setCollapsedTrue }] = useBoolean();
  const responsive = useResponsive();
  const routes = useMainRoutes();

  // responsive collapse the sider
  useEffect(() => {
    if (!responsive.xl) setCollapsedTrue();
  }, [responsive.xl, setCollapsedTrue]);

  return (
    <Layout>
      <MainHeader onToggleClick={toggle} />
      <StyledContent>
        <Suspense fallback={null}>{routes}</Suspense>
        {/* <a href='yiteapp://order/payment/confirm/test-order-id'>test app link</a> */}
      </StyledContent>
    </Layout>
  );
}

const StyledContent = styled(Layout.Content)`
  
`;