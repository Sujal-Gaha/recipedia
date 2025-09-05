import { Outlet, RouteObject } from 'react-router-dom';
import { _FULL_ROUTES } from '../constants/routes';
import { HomePage } from '../pages/common/landing/HomePage';
import { IngredientsPage } from '../pages/user/IngredientsPage';
import { RecipesPage } from '../pages/user/recipe/RecipePage';
import { CreateRecipePage } from '../pages/user/recipe/create/CreateRecipePage';
import { UserLayout } from '../pages/user/layout/UserLayout';
import { WithAuth } from '../components/auth';
import RecipeDetailPage from '../pages/user/recipe/detail/RecipeDetailPage';

export const userRoutes: RouteObject[] = [
  {
    path: _FULL_ROUTES.HOME,
    element: (
      // <WithAuth>
      <UserLayout>
        <Outlet />
      </UserLayout>
      // </WithAuth>
    ),
    children: [
      {
        path: _FULL_ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: _FULL_ROUTES.INGREDIENT,
        element: <IngredientsPage />,
      },
      {
        path: _FULL_ROUTES.RECIPE,
        element: <RecipesPage />,
      },
      {
        path: `${_FULL_ROUTES.RECIPE}/:slug`,
        element: <RecipeDetailPage />,
      },
      {
        path: _FULL_ROUTES.CREATE_RECIPE,
        element: <CreateRecipePage />,
      },

      {
        path: '/dev',
        element: <div>This is test page for devs</div>,
      },
    ],
  },
];
