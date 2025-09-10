import { Outlet, RouteObject } from 'react-router-dom';
import { _FULL_ROUTES } from '@/constants/routes';
import { HomePage } from '@/pages/common/landing/HomePage';
import { IngredientsPage } from '@/pages/user/IngredientsPage';
import { RecipesPage } from '@/pages/user/recipe/RecipePage';
import { CreateRecipePage } from '@/pages/user/recipe/create/CreateRecipePage';
import { UserLayout } from '@/pages/user/layout/UserLayout';
import { RecipeDetailPage } from '@/pages/user/recipe/detail/RecipeDetailPage';
import { ProfilePage } from '@/pages/common/profile/ProfilePage';
import { FavouriteRecipePage } from '@/pages/user/recipe/favourite/FavouriteRecipePage';
import { WithAuth } from '@/components/auth';

export const userRoutes: RouteObject[] = [
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
        path: _FULL_ROUTES.PROFILE,
        element: (
          <WithAuth>
            <ProfilePage />
          </WithAuth>
        ),
      },
      {
        path: _FULL_ROUTES.FAVOURITE,
        element: (
          <WithAuth>
            <FavouriteRecipePage />
          </WithAuth>
        ),
      },

      {
        path: '/dev',
        element: <div>This is test page for devs</div>,
      },
    ],
  },
];
