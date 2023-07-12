import styled from 'styled-components';
import { Suspense } from 'react';
import { ConfigProvider, Empty } from 'antd';
// import { AuthProvider } from 'shared/auth';
// import { AuthProvider } from 'react-auth-kit'
import color from 'shared/style/color';
import GlobalStyles from 'shared/style/GlobalStyles';
import useAppRoutes from './useAppRoutes';

// ConfigProvider.config({
//   theme: {
//     primaryColor: color.primary,
//     errorColor: color.error,
//     successColor: color.success,
//   },
// });

export default function App() {
  const routes = useAppRoutes();

  return (
    <ConfigProvider renderEmpty={() => <Empty description={false} />}>
      <GlobalStyles />
      <AppLayout>
        <Suspense fallback={null}>{routes}</Suspense>
      </AppLayout>
    </ConfigProvider>
  );
}

const AppLayout = styled.div`
  
`;
