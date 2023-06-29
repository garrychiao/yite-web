import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

const HomePage = lazy(() => import('page/home/HomePage'));
// const ManagePage = lazy(() => import('page/manage/ManagePage'));
// const ComparePage = lazy(() => import('page/compare/ComparePage'));
// const LoginPage = lazy(() => import('page/auth/LoginPage'));
// const RegisterPage = lazy(() => import('page/auth/RegisterPage'));
// const AboutUsPage = lazy(() => import('page/aboutUs/AboutUsPage'));
// const PrivacyPage = lazy(() => import('page/privacy/PrivacyPage'));

export default function useMainRoutes() {
  
  return useRoutes([
    {
      path: '/',
      element: <HomePage />,
    },
    // {
    //   path: '/login',
    //   element: <RequireAuth require={false}>
    //     <LoginPage />
    //   </RequireAuth>
    // },
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
