import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
// import { RequireAuth } from 'shared/auth';

// const LoginPage = lazy(() => import('page/login/LoginPage'));
const MainPage = lazy(() => import('page/main/MainPage'));

export default function useAppRoutes() {

  const routes = useRoutes([
    { path: '403', element: '403 Forbidden' },
    { path: '404', element: '404 Not Found' },
    {
      path: '*',
      element: (
        <MainPage />
      ),
    },
  ]);

  return routes
}
