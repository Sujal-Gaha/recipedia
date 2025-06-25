import { _FULL_ROUTES } from '../constants/routes';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { VerifyEmailPage } from '../pages/auth/VerifyEmailPage';
import { HomePage } from '../pages/HomePage';
import { UserLayout } from '../pages/layout/UserLayout';
import { NotFoundPage } from '../pages/NotFoundPage';
import { Outlet, RouteObject } from 'react-router-dom';

const authRoutes: RouteObject[] = [
  {
    path: _FULL_ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: _FULL_ROUTES.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: _FULL_ROUTES.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
  },
  {
    path: _FULL_ROUTES.VERIFY_EMAIL,
    element: <VerifyEmailPage />,
  },
];

export const routes: RouteObject[] = [
  {
    path: _FULL_ROUTES.HOME,
    element: (
      <UserLayout>
        <Outlet />
      </UserLayout>
    ),
    children: [
      {
        path: _FULL_ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: '/dev',
        element: <div>This is test page for devs</div>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
  ...authRoutes,
];
