import styled from 'styled-components';
import { Suspense } from 'react';
import { ConfigProvider, Empty } from 'antd';
import { CartProvider } from 'shared/cart';
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
      <CartProvider>
        <GlobalStyles />
        <AppLayout>
          <Suspense fallback={null}>{routes}</Suspense>
        </AppLayout>
      </CartProvider>
    </ConfigProvider>
  );
}

const AppLayout = styled.div`
  
`;
