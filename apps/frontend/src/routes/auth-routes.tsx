import { RouteObject } from 'react-router-dom';
import { _FULL_ROUTES } from '@/constants/routes';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { VerifyEmailPage } from '@/pages/auth/VerifyEmailPage';
import { CallbackPage } from '@/pages/auth/CallbackPage';
import { ForgotPasswordPageV2 } from '@/pages/auth/ForgotPasswordPageV2';

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
    element: <ForgotPasswordPageV2 />,
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
