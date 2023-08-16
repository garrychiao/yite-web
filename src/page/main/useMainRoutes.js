import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import HomePage from 'page/home/HomePage';
import { ProductListPage, ProductPage } from 'page/product';
import { CategoryPage } from 'page/category';
import { RequireAuth } from 'page/auth';
import { CartPage, ConfirmOrderPage, OrderCreatedPage, PaymentConfirmPage, InitECPayPage } from 'page/cart';

// const HomePage = lazy(() => import('page/home/HomePage'));
// const { ProductPage, ProductListPage }= lazy(() => import('page/product'));
// const { CategoryPage }= lazy(() => import('page/category'));
// const ManagePage = lazy(() => import('page/manage/ManagePage'));
// const ComparePage = lazy(() => import('page/compare/ComparePage'));
const LoginPage = lazy(() => import('page/auth/LoginPage'));
const LoginResultPage = lazy(() => import('page/auth/LoginResultPage'));
const UserInfo = lazy(() => import('page/auth/UserInfo'));
const OrderHistory = lazy(() => import('page/auth/OrderHistory'));
const OrderDetail = lazy(() => import('page/auth/OrderDetail'));
// const CartPage = lazy(() => import('page/cart/CartPage'));
// const RegisterPage = lazy(() => import('page/auth/RegisterPage'));
// const AboutUsPage = lazy(() => import('page/aboutUs/AboutUsPage'));
// const PrivacyPage = lazy(() => import('page/privacy/PrivacyPage'));

export default function useMainRoutes() {
  
  return useRoutes([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/category',
      children: [
        {
          path: '',
          element: <CategoryPage />,
        },
        {
          path: ':id',
          element: <CategoryPage />,
        },
        {
          path: 'product/:id',
          element: <ProductListPage />,
        },
        {
          path: 'productDetail/:id',
          element: <ProductPage />,
        },
        {
          path: 'productDetail/preview/:id',
          element: <ProductPage preview />,
        },
      ]
    },
    // auth pages
    {
      path: '/user/info',
      element: (<RequireAuth required>
        <UserInfo />
      </RequireAuth>)
    },
    {
      path: '/cart',
      element: (<RequireAuth required>
        <CartPage />
      </RequireAuth>)
    },
    {
      path: '/order',
      children: [
        {
          path: 'history',
          element: (<RequireAuth required>
            <OrderHistory />
          </RequireAuth>)
        },
        {
          path: 'history/:id',
          element: (<RequireAuth required>
            <OrderDetail />
          </RequireAuth>)
        },
        {
          path: 'confirm',
          element: (<RequireAuth required>
            <ConfirmOrderPage />
          </RequireAuth>)
        },
        {
          path: 'payment/confirm/:id',
          element: (<RequireAuth required={false}>
            <PaymentConfirmPage />
          </RequireAuth>)
        },
        {
          path: 'confirm/:id',
          element: (<RequireAuth required>
            <ConfirmOrderPage />
          </RequireAuth>)
        },
        {
          path: 'created',
          element: (<RequireAuth required>
            <OrderCreatedPage />
          </RequireAuth>)
        },
        {
          path: 'initECPay/:orderId',
          element: (<RequireAuth required={false}>
            <InitECPayPage />
          </RequireAuth>)
        },
      ]
    },
    {
      path: '/login/result',
      element: <LoginResultPage />
    },
    {
      path: '/login',
      element: <RequireAuth nonAuth={true}>
        <LoginPage />
      </RequireAuth>
    },
    // {
    //   path: '/register',
    //   element: <RequireAuth require={false}>
    //   <RegisterPage />
    // </RequireAuth>,
    // },
    // {
    //   path: '/manage',
    //   element: <ManagePage />,
    // },
    // {
    //   path: '/compare',
    //   element: <ComparePage />,
    // },
    // {
    //   path: '/about-us',
    //   element: <AboutUsPage />,
    // },
    // {
    //   path: '/privacy',
    //   element: <PrivacyPage />,
    // },
    // {
    //   path: '/contact',
    //   element: <ContactPage />,
    // },
    {
      path: '*',
      element: <Navigate to='/' replace />,
    },
  ]);
}
