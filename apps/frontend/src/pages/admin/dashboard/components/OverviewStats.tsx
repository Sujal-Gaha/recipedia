import { AlertTriangle, Carrot, ChefHat, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const OverViewStats = ({
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
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-600">+{stats.newUsersToday}</span> today
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Recipes</CardTitle>
          <ChefHat className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalRecipes.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-blue-600">+{stats.recipesPublishedToday}</span> today
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ingredients</CardTitle>
          <Carrot className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalIngredients}</div>
          <p className="text-xs text-muted-foreground">Database entries</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Flagged Content</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats.flaggedContent}</div>
          <p className="text-xs text-muted-foreground">Needs review</p>
        </CardContent>
      </Card>
    </div>
  );
};
