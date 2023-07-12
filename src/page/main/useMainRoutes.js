import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import HomePage from 'page/home/HomePage';
import { ProductListPage, ProductPage } from 'page/product';
import { CategoryPage } from 'page/category';
import { RequireAuth } from 'page/auth';

// const HomePage = lazy(() => import('page/home/HomePage'));
// const { ProductPage, ProductListPage }= lazy(() => import('page/product'));
// const { CategoryPage }= lazy(() => import('page/category'));
// const ManagePage = lazy(() => import('page/manage/ManagePage'));
// const ComparePage = lazy(() => import('page/compare/ComparePage'));
const LoginPage = lazy(() => import('page/auth/LoginPage'));
const LoginResultPage = lazy(() => import('page/auth/LoginResultPage'));
const UserInfo = lazy(() => import('page/auth/UserInfo'));
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
      ]
    },
    {
      path: '/user/info',
      element: (<RequireAuth required>
        <UserInfo />
      </RequireAuth>)
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
