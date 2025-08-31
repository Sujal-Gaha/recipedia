import { useState } from 'react';
import { recipes } from './constants/recipes';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle,
  ChefHat,
  Edit,
  Eye,
  Flag,
  Grid3X3,
  List,
  MoreHorizontal,
  Search,
  Star,
  Trash2,
} from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../components/ui/table';
import { Badge } from '../../../../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import { RecipeCard } from './components/RecipeCard';
import { IRecipe } from './types/recipe';

export const AdminRecipePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || recipe.status === statusFilter;
    const matchesDifficulty = difficultyFilter === 'all' || recipe.difficulty === difficultyFilter;
    return matchesSearch && matchesStatus && matchesDifficulty;
  });

  const stats = {
    totalRecipes: recipes.length,
    publishedRecipes: recipes.filter((r) => r.status === 'published').length,
    draftRecipes: recipes.filter((r) => r.status === 'draft').length,
    flaggedRecipes: recipes.filter((r) => r.flagged).length,
    totalViews: recipes.reduce((sum, r) => sum + r.views, 0),
    totalUpvotes: recipes.reduce((sum, r) => sum + r.upvotes, 0),
  };

  const handleFlagRecipe = (recipe: IRecipe) => {
    // showToast({
    //   type: 'warning',
    //   title: 'Recipe Flagged',
    //   message: `"${recipe.title}" has been flagged for review`,
    //   duration: 4000,
    // });
    // addNotification({
    //   type: 'warning',
    //   title: 'Recipe Flagged for Review',
    //   message: `Your recipe "${recipe.title}" has been flagged by our moderation team and is currently under review. We'll notify you once the review is complete.`,
    //   priority: 'high',
    //   category: 'admin',
    //   actionUrl: `/recipes/${recipe.id}`,
    //   actionLabel: 'View Recipe',
    //   metadata: {
    //     recipeId: recipe.id,
    //     recipeName: recipe.title,
    //     userId: recipe.authorId,
    //     action: 'flagged',
    //   },
    // });
  };

  const handleApproveRecipe = (recipe: IRecipe) => {
    // showToast({
    //   type: 'success',
    //   title: 'Recipe Approved',
    //   message: `"${recipe.title}" has been approved and published`,
    //   duration: 4000,
    // });
    // addNotification({
    //   type: 'success',
    //   title: 'Recipe Approved!',
    //   message: `Great news! Your recipe "${recipe.title}" has been approved by our moderation team and is now live on the platform.`,
    //   priority: 'medium',
    //   category: 'admin',
    //   actionUrl: `/recipes/${recipe.id}`,
    //   actionLabel: 'View Recipe',
    //   metadata: {
    //     recipeId: recipe.id,
    //     recipeName: recipe.title,
    //     userId: recipe.authorId,
    //     action: 'approved',
    //   },
    // });
  };

  const handleDeleteRecipe = (recipe: IRecipe) => {
    // showToast({
    //   type: 'error',
    //   title: 'Recipe Deleted',
    //   message: `"${recipe.title}" has been permanently deleted`,
    //   duration: 4000,
    // });
    // addNotification({
    //   type: 'error',
    //   title: 'Recipe Removed',
    //   message: `Your recipe "${recipe.title}" has been removed from the platform due to policy violations. If you believe this was done in error, please contact our support team.`,
    //   priority: 'high',
    //   category: 'admin',
    //   metadata: {
    //     recipeId: recipe.id,
    //     recipeName: recipe.title,
    //     userId: recipe.authorId,
    //     action: 'deleted',
    //   },
    // });
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Recipe Management</h1>
        <p className="text-xl text-muted-foreground">Monitor and moderate recipe content across the platform</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
      </div>

      {/* Filters and Actions */}
      <Card className="p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search recipes or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-80"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="EASY">Easy</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HARD">Hard</SelectItem>
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
          <CardTitle>Recipes ({filteredRecipes.length})</CardTitle>
          <CardDescription>Monitor and moderate recipe content</CardDescription>
        </CardHeader>
        <CardContent>
          {viewMode === 'table' ? (
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recipe</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecipes.map((recipe) => (
                    <TableRow key={recipe.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={recipe.image || '/placeholder.svg'}
                            alt={recipe.title}
                            width={40}
                            height={40}
                            className="rounded-lg object-cover"
                          />
                          <div>
                            <div className="flex items-center space-x-2">
                              {recipe.flagged && <Flag className="h-4 w-4 text-red-500" />}
                              <span className="font-medium">{recipe.title}</span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-1">{recipe.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{recipe.author}</TableCell>
                      <TableCell>
                        <Badge
                          variant={recipe.status === 'published' ? 'default' : 'secondary'}
                          className={
                            recipe.status === 'published'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                              : 'bg-gray-50 text-gray-700 border border-gray-200/50'
                          }
                        >
                          {recipe.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            recipe.difficulty === 'EASY'
                              ? 'secondary'
                              : recipe.difficulty === 'MEDIUM'
                              ? 'default'
                              : 'destructive'
                          }
                        >
                          {recipe.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="mr-1 h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium">{recipe.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Eye className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{recipe.views}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{recipe.createdAt}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/recipes/${recipe.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Recipe
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Recipe
                            </DropdownMenuItem>
                            {recipe.flagged ? (
                              <DropdownMenuItem
                                className="text-emerald-600"
                                onClick={() => handleApproveRecipe(recipe)}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-amber-600" onClick={() => handleFlagRecipe(recipe)}>
                                <Flag className="mr-2 h-4 w-4" />
                                Flag Recipe
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteRecipe(recipe)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Recipe
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  handleApproveRecipe={handleApproveRecipe}
                  handleDeleteRecipe={handleDeleteRecipe}
                  handleFlagRecipe={handleFlagRecipe}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
