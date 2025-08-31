import { Outlet, RouteObject } from 'react-router-dom';
import { _FULL_ROUTES } from '../constants/routes';
import { AdminDashboardPage } from '../pages/admin/dashboard/AdminDashboardPage';
import { AdminLayout } from '../pages/admin/layout/AdminLayout';
import { AdminIngredientPage } from '../pages/admin/dashboard/ingredient/AdminIngredientPage';
import { AdminRecipePage } from '../pages/admin/dashboard/recipe/AdminRecipePage';
import { AdminUserPage } from '../pages/admin/dashboard/user/AdminUserPage';

export const adminRoutes: RouteObject[] = [
  {
    path: _FULL_ROUTES.ADMIN_DASHBOARD,
    element: (
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    ),
    children: [
      {
        path: _FULL_ROUTES.ADMIN_DASHBOARD,
        element: <AdminDashboardPage />,
      },
      {
        path: _FULL_ROUTES.ADMIN_DASHBOARD_INGREDIENT,
        element: <AdminIngredientPage />,
      },
      {
        path: _FULL_ROUTES.ADMIN_DASHBOARD_RECIPE,
        element: <AdminRecipePage />,
      },
      {
        path: _FULL_ROUTES.ADMIN_DASHBOARD_USER,
        element: <AdminUserPage />,
      },
    ],
  },
];
