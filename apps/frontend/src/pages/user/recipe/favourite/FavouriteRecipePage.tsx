import { Bookmark, Clock, Heart, Search, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { useState } from 'react';
import { RecipeDifficulty } from '@prisma/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import { RecipeDifficultySchema } from '@libs/contract';
import { recipeApi } from '../../../../apis/recipe-api';
import { useUserStore } from '../../../../stores/useUserStore';
import { useQueryClient } from '@tanstack/react-query';
import { toastError, toastSuccess } from '../../../../components/toaster';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import clsx from 'clsx';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import { Link } from 'react-router-dom';
import { _FULL_ROUTES } from '../../../../constants/routes';

export const FavouriteRecipePage = () => {
  const [sortBy, setSortBy] = useState('popular');
  const [globalFilter, setGlobalFilter] = useState('');
  const [difficulty, setDifficulty] = useState<RecipeDifficulty | 'ALL'>('ALL');

  const { user } = useUserStore();
  const user_id = user ? user.id : '';

  const qc = useQueryClient();

  const toggleRecipeFavouriteMtn = recipeApi.toggleRecipeFavourite.useMutation();

  const toggleRecipeUpvoteMtn = recipeApi.toggleRecipeUpvote.useMutation();

  const { data: getAllRecipesData } = recipeApi.getAllRecipes.useQuery(
    ['getAllRecipes', '1', '6', globalFilter, difficulty, user_id, 'true'],
    {
      query: {
        user_id,
        page: '1',
        perPage: '6',
        global_filter: globalFilter,
        difficulty: difficulty !== 'ALL' ? difficulty : undefined,
        is_favourited: 'true',
      },
    }
  );

  const recipes = getAllRecipesData?.status === 200 ? getAllRecipesData.body.data : [];

  const handleBookmarkIconClicked = async ({
    recipe_id,
    user_favourite_id,
  }: {
    recipe_id: string;
    user_favourite_id: string | null;
  }) => {
    await toggleRecipeFavouriteMtn.mutateAsync(
      {
        body: {
          ...(user_favourite_id ? { id: user_favourite_id } : {}),
          recipe_id,
          user_id,
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

  const handleHeartIconClicked = async ({
    user_upvote_id,
    recipe_id,
  }: {
    user_upvote_id: string | null;
    recipe_id: string;
  }) => {
    await toggleRecipeUpvoteMtn.mutateAsync(
      {
        body: {
          ...(user_upvote_id ? { id: user_upvote_id } : {}),
          recipe_id,
          user_id,
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
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <Card className="border-0 p-8 mb-12">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="relative col-span-2">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search recipes..."
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
              </div>

              <Select value={difficulty} onValueChange={(value) => setDifficulty(value as RecipeDifficulty)}>
                <SelectTrigger className="text-lg !h-12 w-full">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Difficulties</SelectItem>
                  <SelectItem value={RecipeDifficultySchema.Enum.EASY}>Easy</SelectItem>
                  <SelectItem value={RecipeDifficultySchema.Enum.MEDIUM}>Medium</SelectItem>
                  <SelectItem value={RecipeDifficultySchema.Enum.HARD}>Hard</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="text-lg !h-12 w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="cookTime">Cook Time</SelectItem>
                </SelectContent>
              </Select>

              {/* <Button variant="outline" className="h-12 text-lg font-medium">
                  <Filter className="mr-3 h-5 w-5" />
                  More Filters
                </Button> */}
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <p className="text-lg text-gray-600">
            Showing <span className="font-semibold">{recipes.length}</span> of{' '}
            <span className="font-semibold">{recipes.length}</span> recipes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden border-0 group cursor-pointer">
              <div className="relative overflow-hidden">
                <img
                  src={recipe.images.find((img) => img.is_primary)?.url || '/placeholder.svg'}
                  alt={recipe.title}
                  width={300}
                  height={200}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
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
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={recipe.is_favourited ? 'default' : 'secondary'}
                      onClick={() =>
                        handleBookmarkIconClicked({ recipe_id: recipe.id, user_favourite_id: recipe.user_favourite_id })
                      }
                      className="shadow-lg"
                      disabled={toggleRecipeFavouriteMtn.isPending}
                    >
                      <Bookmark className={clsx('h-4 w-4', recipe.is_favourited ? 'fill-current' : '')} />
                    </Button>
                    <Button
                      size="sm"
                      variant={recipe.is_upvoted ? 'default' : 'secondary'}
                      onClick={() =>
                        handleHeartIconClicked({ recipe_id: recipe.id, user_upvote_id: recipe.user_upvote_id })
                      }
                      className="shadow-lg"
                      disabled={toggleRecipeUpvoteMtn.isPending}
                    >
                      <Heart className={clsx('h-4 w-4', recipe.is_upvoted ? 'fill-current' : '')} />
                    </Button>
                  </div>
                </div>
              </div>

              <CardHeader className="p-6 pb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={recipe.user.image || '/placeholder.svg'} alt={recipe.user.name} />
                    <AvatarFallback>{recipe.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-600">{recipe.user.name}</span>
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors leading-tight">
                  {recipe.title}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed truncate">
                  {recipe.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                    <Clock className="h-4 w-4 mr-1" />
                    {recipe.cook_time + recipe.preparation_time}min
                  </div>
                  <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-400" />
                    {recipe.review.average_rating}
                  </div>
                  <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                    <TrendingUp
                      className={clsx('h-4 w-4 mr-1', recipe.is_upvoted ? 'text-primary' : 'text-gray_500')}
                    />
                    {recipe.upvotes.total_votes}
                  </div>
                </div>

                <Button className="w-full font-medium" asChild>
                  <Link to={`${_FULL_ROUTES.RECIPE}/${recipe.slug}`}>View Recipe</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
