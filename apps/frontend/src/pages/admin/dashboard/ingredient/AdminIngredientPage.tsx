import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Grid3X3, List, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IngredientCard } from './components/IngredientCard';
import { Link } from 'react-router-dom';
import { _FULL_ROUTES } from '@/constants/routes';
import { ingredientApi } from '@/apis/ingredient-api';
import { IngredientTable } from './components/IngredientTable';

export const AdminIngredientPage = () => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const [pagination] = useState({
    page: 1,
    perPage: 6,
  });
  const [globalFilter, setGlobalFilter] = useState('');

  const { data: getAllIngredientsData } = ingredientApi.getAllIngredients.useQuery(
    ['getAllIngredientVariants', pagination.page, pagination.perPage, globalFilter],
    {
      query: {
        page: String(pagination.page),
        perPage: String(pagination.perPage),
        global_filter: globalFilter,
      },
    }
  );

  const ingredients = getAllIngredientsData?.status === 200 ? getAllIngredientsData.body.data : [];

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Ingredient Management</h1>
        <p className="text-xl text-muted-foreground">Manage the ingredient database and variants</p>
      </div>

      {/* Stats */}
      {/* <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ingredients</CardTitle>
            <Carrot className="h-8 w-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalIngredients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Package className="h-8 w-8 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{stats.activeIngredients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            <AlertTriangle className="h-8 w-8 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.inactiveIngredients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalUsage}</div>
          </CardContent>
        </Card>
      </div> */}

      {/* Filters and Actions */}
      <Card className="p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search ingredients..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 w-full sm:w-80"
            />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center border rounded-lg p-1">
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('grid')}>
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
            <Button asChild>
              <Link to={_FULL_ROUTES.ADMIN_DASHBOARD_INGREDIENT_CREATE}>
                <Plus className="mr-2 h-4 w-4" />
                Add Ingredient
              </Link>
            </Button>
            {/* <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button> */}
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ingredients ({ingredients.length})</CardTitle>
          <CardDescription>Manage ingredients and their variants</CardDescription>
        </CardHeader>
        <CardContent>
          {viewMode === 'table' ? (
            <IngredientTable ingredients={ingredients} />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ingredients.map((ingredient) => (
                <IngredientCard key={ingredient.id} ingredient={ingredient} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
