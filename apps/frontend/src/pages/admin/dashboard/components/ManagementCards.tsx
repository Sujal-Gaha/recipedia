import { ArrowRight, Carrot, ChefHat, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Link } from 'react-router-dom';
import { _FULL_ROUTES } from '../../../../constants/routes';
import { Button } from '../../../../components/ui/button';

export const ManagementCards = ({
  stats,
}: {
  stats: {
    totalUsers: number;
    totalRecipes: number;
    totalIngredients: number;
    flaggedContent: number;
    activeUsers: number;
    newUsersToday: number;
    recipesPublishedToday: number;
    systemHealth: number;
  };
}) => {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-8">
      <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl">User Management</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </div>
            </div>
            <Link to={_FULL_ROUTES.ADMIN_DASHBOARD_USER}>
              <ArrowRight className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Active Users</span>
              <span className="font-medium">{stats.activeUsers}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">New Today</span>
              <span className="font-medium text-emerald-600">+{stats.newUsersToday}</span>
            </div>
            <Button asChild className="w-full mt-4">
              <Link to={_FULL_ROUTES.ADMIN_DASHBOARD_USER}>Manage Users</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <ChefHat className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-xl">Recipe Management</CardTitle>
                <CardDescription>Monitor and moderate recipe content</CardDescription>
              </div>
            </div>
            <Link to={_FULL_ROUTES.ADMIN_DASHBOARD_RECIPE}>
              <ArrowRight className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Published Today</span>
              <span className="font-medium">{stats.recipesPublishedToday}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Flagged</span>
              <span className="font-medium text-red-600">{stats.flaggedContent}</span>
            </div>
            <Button asChild className="w-full mt-4">
              <Link to={_FULL_ROUTES.ADMIN_DASHBOARD_RECIPE}>Manage Recipes</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <Carrot className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <CardTitle className="text-xl">Ingredient Management</CardTitle>
                <CardDescription>Manage ingredient database and variants</CardDescription>
              </div>
            </div>
            <Link to={`${_FULL_ROUTES.ADMIN_DASHBOARD_INGREDIENT}`}>
              <ArrowRight className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Ingredients</span>
              <span className="font-medium">{stats.totalIngredients}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Categories</span>
              <span className="font-medium">12</span>
            </div>
            <Button asChild className="w-full mt-4">
              <Link to={_FULL_ROUTES.ADMIN_DASHBOARD_INGREDIENT}>Manage Ingredients</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
