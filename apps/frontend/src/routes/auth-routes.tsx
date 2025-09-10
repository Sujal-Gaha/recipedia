import { RouteObject } from 'react-router-dom';
import { _FULL_ROUTES } from '@/constants/routes';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { VerifyEmailPage } from '@/pages/auth/VerifyEmailPage';
import { CallbackPage } from '@/pages/auth/CallbackPage';

export const authRoutes: RouteObject[] = [
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
    path: _FULL_ROUTES.CALLBACK,
    element: <CallbackPage />,
  },
];
