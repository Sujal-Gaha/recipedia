import { _FULL_ROUTES } from '../constants/routes';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { VerifyEmailPage } from '../pages/auth/VerifyEmailPage';
import { VerifyOTPPage } from '../pages/auth/VerifyOtpPage';
import { UserLayout } from '../pages/layout/UserLayout';
import { Outlet, RouteObject } from 'react-router-dom';
import IngredientsPage from '../pages/user/IngredientsPage';
import { HomePage } from '../pages/common/landing/HomePage';
import { NotFoundPage } from '../pages/common/NotFoundPage';

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
  {
    path: _FULL_ROUTES.VERIFY_OTP,
    element: <VerifyOTPPage />,
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
        path: _FULL_ROUTES.INGREDIENTS,
        element: <IngredientsPage />,
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
