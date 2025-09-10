import { motion } from 'framer-motion';
import { Heart, Share2, Clock, ChefHat, Star, MessageCircle, Bookmark, Timer, Award, Eye, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams } from 'react-router-dom';
import { recipeApi } from '@/apis/recipe-api';
import { useUserStore } from '@/stores/useUserStore';
import { PageLoading } from '@/components/loading';
import { toastError, toastSuccess } from '@/components/toaster';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { ReviewTab } from './components/ReviewTab';
import { RecipeTab } from './components/RecipeTab';
import { NutritionTab } from './components/NutritionTab';
import { TipsTab } from './components/TipsTab';
import { userApi } from '@/apis/user-api';

export const RecipeDetailPage = () => {
  const qc = useQueryClient();

  const params = useParams();
  const slug = params.slug || '';

  const { user } = useUserStore();
  const user_id = user?.id || '';

  const toggleUserFollowerMtn = userApi.toggleUserFollower.useMutation();
  const toggleRecipeFavouriteMtn = recipeApi.toggleRecipeFavourite.useMutation();
  const toggleRecipeUpvoteMtn = recipeApi.toggleRecipeUpvote.useMutation();

  const { data: getRecipeBySlugData, isLoading: isGetRecipeBySlugLoading } = recipeApi.getRecipeBySlug.useQuery(
    ['getRecipeBySlug', slug, user_id],
    {
      query: {
        slug,
        user_id,
      },
    },
    {
      queryKey: ['getRecipeBySlug', slug, user_id],
      enabled: !!slug,
    }
  );

  if (isGetRecipeBySlugLoading) {
    return <PageLoading />;
  }

  if (getRecipeBySlugData?.status !== 200) return null;

  const recipe = getRecipeBySlugData.body.data;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toastSuccess('Recipe link copied to clipboard!');
  };

  const handleBookmarkIconClicked = async () => {
    await toggleRecipeFavouriteMtn.mutateAsync(
      {
        body: {
          ...(recipe.user_favourite_id ? { id: recipe.user_favourite_id } : {}),
          recipe_id: recipe.id,
          user_id,
        },
      },
      {
        onSuccess: (data) => {
          toastSuccess(data.body.message);
          qc.invalidateQueries({
            queryKey: ['getRecipeBySlug'],
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

  const handleHeartIconClicked = async () => {
    await toggleRecipeUpvoteMtn.mutateAsync(
      {
        body: {
          ...(recipe.user_upvote_id ? { id: recipe.user_upvote_id } : {}),
          recipe_id: recipe.id,
          user_id,
        },
      },
      {
        onSuccess: () => {
          qc.invalidateQueries({
            queryKey: ['getRecipeBySlug'],
          });
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const handleFollowerBtnClicked = async () => {
    await toggleUserFollowerMtn.mutateAsync(
      {
        body: {
          follower_id: user_id,
          following_id: recipe.chef.id,
        },
      },
      {
        onSuccess: (data) => {
          qc.invalidateQueries({
            queryKey: ['getRecipeBySlug'],
          });
          toastSuccess(data.body.message);
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-8 mb-8"
        >
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={recipe.images.find((img) => img.is_primary)?.url || '/placeholder.svg'}
                alt={recipe.title}
                className="object-cover h-full w-full"
              />
            </div>

            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                size="sm"
                variant={recipe.is_favourited ? 'default' : 'secondary'}
                onClick={handleBookmarkIconClicked}
                className="shadow-lg"
                disabled={toggleRecipeFavouriteMtn.isPending}
              >
                <Bookmark className={clsx('h-4 w-4', recipe.is_favourited ? 'fill-current' : '')} />
              </Button>
              <Button
                size="sm"
                variant={recipe.is_upvoted ? 'default' : 'secondary'}
                onClick={handleHeartIconClicked}
                className="shadow-lg"
                disabled={toggleRecipeUpvoteMtn.isPending}
              >
                <Heart className={clsx('h-4 w-4', recipe.is_upvoted ? 'fill-current' : '')} />
              </Button>
              <Button size="sm" variant="secondary" onClick={handleShare} className="shadow-lg">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <Clock className="h-4 w-4 text-orange-500 mr-1" />
                      </div>
                      <div className="text-sm font-medium">{recipe.cook_time + recipe.preparation_time}m</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <Users className="h-4 w-4 text-blue-500 mr-1" />
                      </div>
                      <div className="text-sm font-medium">1</div>
                      <div className="text-xs text-muted-foreground">Serving</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <ChefHat className="h-4 w-4 text-green-500 mr-1" />
                      </div>
                      <div className="text-sm font-medium">{recipe.difficulty}</div>
                      <div className="text-xs text-muted-foreground">Level</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      </div>
                      <div className="text-sm font-medium">{recipe.review.average_rating}</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{recipe.description}</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={recipe.chef.image || '/placeholder.svg'} />
                      <AvatarFallback>
                        {recipe.chef.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{recipe.chef.name}</h3>
                        {recipe.chef.is_email_verified && <Award className="h-4 w-4 text-blue-500" />}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {recipe.chef.total_followers} {recipe.chef.total_followers > 1 ? 'followers' : 'follower'} •{' '}
                        {recipe.chef.total_recipes} {recipe.chef.total_recipes > 1 ? 'recipes' : 'recipe'}
                      </div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleFollowerBtnClicked}
                    disabled={toggleUserFollowerMtn.isPending}
                  >
                    {toggleUserFollowerMtn.isPending ? 'Following...' : recipe.is_following ? 'Unfollow' : 'Follow'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Eye className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-2xl font-bold">100</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Views</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <MessageCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-2xl font-bold">{recipe.review.reviews.length}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Reviews</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button size="lg" className="h-12 col-span-2">
                <Timer className="mr-2 h-5 w-5" />
                Start Cooking
              </Button>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="recipe" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="recipe">Recipe</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({recipe.review.reviews.length})</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="recipe" className="space-y-8">
            <RecipeTab recipe={recipe} />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <ReviewTab recipe={recipe} user_id={user_id} />
          </TabsContent>

          <TabsContent value="nutrition">
            <NutritionTab recipe={recipe} />
          </TabsContent>

          <TabsContent value="tips">
            <TipsTab recipe={recipe} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
