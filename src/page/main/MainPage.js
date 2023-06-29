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
        {/* <Footer>
          Copyright © 2020-2022 Teleworker Inc. All rights reserved.
        </Footer> */}
      </StyledContent>
    </Layout>
  );
}

const StyledContent = styled(Layout.Content)`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${color.bg};
`;
const Footer = styled.div`
  bottom: 0;
  margin-top: auto;
  width: 100%;
  line-height: 30px;
  text-align: center;
  color: ${color.placeholder};
`;
