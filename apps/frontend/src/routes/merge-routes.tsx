import { RouteObject } from 'react-router-dom';
import { NotFoundPage } from '../pages/common/NotFoundPage';
import { authRoutes } from './auth-routes';
import { adminRoutes } from './admin-routes';
import { userRoutes } from './user-routes';
import { commonRoutes } from './common-routes';

export const routes: RouteObject[] = [
  ...authRoutes,
  ...userRoutes,
  ...adminRoutes,
  ...commonRoutes,
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
