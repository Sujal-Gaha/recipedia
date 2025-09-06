import { useState } from 'react';
import { Grid3X3, List, Search } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import { RecipeCard } from './components/RecipeCard';
import { recipeApi } from '@/apis/recipe-api';
import { RecipeDifficultySchema, RecipeDifficultyType, RecipeStatusSchema, RecipeStatusType } from '@libs/contract';
import { RecipeTable } from './components/RecipeTable';
import { toastError, toastSuccess } from '@/components/toaster';
import { useQueryClient } from '@tanstack/react-query';

export const AdminRecipePage = () => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const [pagination] = useState({
    page: 1,
    perPage: 10,
  });
  const [globalFilter, setGlobalFilter] = useState('');
  const [difficulty, setDifficulty] = useState<RecipeDifficultyType | 'ALL'>('ALL');
  const [status, setStatus] = useState<RecipeStatusType | 'ALL'>('ALL');

  const qc = useQueryClient();

  const flagRecipeByIdMtn = recipeApi.flagRecipeById.useMutation();

  const { data: getAllRecipesData } = recipeApi.getAllRecipes.useQuery(
    ['getAllRecipes', pagination.page, pagination.perPage, globalFilter, difficulty, status],
    {
      query: {
        page: String(pagination.page),
        perPage: String(pagination.perPage),
        ...(globalFilter ? { global_filter: globalFilter } : null),
        ...(difficulty !== 'ALL' ? { difficulty: difficulty } : null),
        ...(status !== 'ALL' ? { status: status } : null),
      },
    }
  );

  const recipes = getAllRecipesData?.status === 200 ? getAllRecipesData.body.data : [];

  const flagRecipe = async (id: string) => {
    await flagRecipeByIdMtn.mutateAsync(
      {
        body: {
          id,
        },
      },
      {
        onSuccess: (data) => {
          toastSuccess(data.body.message);
          qc.invalidateQueries({
            queryKey: ['getAllRecipes'],
          });
        },
        onError: (error) => {
          if (error.status === 400 || error.status === 500) {
            toastError(error.body.message);
          } else {
            toastError('Something went wrong! Please try again later.');
          }
          console.log(error);
        },
      }
    );
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Recipe Management</h1>
        <p className="text-xl text-muted-foreground">Monitor and moderate recipe content across the platform</p>
      </div>

      {/* Stats */}
      {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recipes</CardTitle>
            <ChefHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRecipes}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{stats.publishedRecipes}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.publishedRecipes / stats.totalRecipes) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.flaggedRecipes}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last week</p>
          </CardContent>
        </Card>
      </div> */}

      <Card className="p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search recipes or authors..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 w-full sm:w-80"
              />
            </div>
            <Select value={status} onValueChange={(value) => setStatus(value as RecipeStatusType)}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                {/* <SelectItem value={RecipeStatusSchema.Enum.ARCHIVED}>Archived</SelectItem> */}
                <SelectItem value={RecipeStatusSchema.Enum.DELETED}>Deleted</SelectItem>
                <SelectItem value={RecipeStatusSchema.Enum.DRAFT}>Draft</SelectItem>
                <SelectItem value={RecipeStatusSchema.Enum.PUBLISHED}>Publish</SelectItem>
              </SelectContent>
            </Select>
            <Select value={difficulty} onValueChange={(value) => setDifficulty(value as RecipeDifficultyType)}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Difficulties</SelectItem>
                <SelectItem value={RecipeDifficultySchema.Enum.EASY}>Easy</SelectItem>
                <SelectItem value={RecipeDifficultySchema.Enum.MEDIUM}>Medium</SelectItem>
                <SelectItem value={RecipeDifficultySchema.Enum.HARD}>Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center border rounded-lg p-1">
            <Button variant={viewMode === 'table' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('table')}>
              <List className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('grid')}>
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Recipes List */}
      <Card>
        <CardHeader>
          <CardTitle>Recipes ({recipes.length})</CardTitle>
          <CardDescription>Monitor and moderate recipe content</CardDescription>
        </CardHeader>
        <CardContent>
          {viewMode === 'table' ? (
            <RecipeTable recipes={recipes} pagination={pagination} flagRecipe={flagRecipe} />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} flagRecipe={flagRecipe} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
