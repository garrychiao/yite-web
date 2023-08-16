import styled from 'styled-components';
import axios from 'axios';
import { Suspense, useEffect } from 'react';
import { ConfigProvider, Empty } from 'antd';
import { CartProvider } from 'shared/cart';
// import { AuthProvider } from 'react-auth-kit'
import color from 'shared/style/color';
import GlobalStyles from 'shared/style/GlobalStyles';
import useAppRoutes from './useAppRoutes';
import { useRequest } from 'ahooks';
import { authApi } from 'page/api';
import { useSignIn, useAuthUser, useAuthHeader, useIsAuthenticated } from 'react-auth-kit'
import { useLocation } from 'react-router-dom';
// ConfigProvider.config({
//   theme: {
//     primaryColor: color.primary,
//     errorColor: color.error,
//     successColor: color.success,
//   },
// });

export default function App() {
  const routes = useAppRoutes();
  const signIn = useSignIn();
  const location = useLocation();

  const userHeader = useAuthHeader();
  const isAuthenticated = useIsAuthenticated()
  
  const { run, loading } = useRequest(() => authApi.getMe({}), {
    manual: true,
    onSuccess: (res) => {
      console.log('login res')
      console.log(res)
      signIn(
        {
          token: localStorage.getItem('token'),
          expiresIn: 60 * 24 * 7, // minutes => set to on week
          tokenType: "Bearer",
          authState: res,
        }
      )
    },
    onError: (err) => {
      console.error(err);
    }
  });


  useEffect(() => {
    console.log(`location`)
    console.log(location)
    if (isAuthenticated()) {
      run();
    }
  }, [location])

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
