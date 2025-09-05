import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Share2,
  Clock,
  ChefHat,
  Star,
  MessageCircle,
  Bookmark,
  Timer,
  Printer as Print,
  Award,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import { Separator } from '../../../../components/ui/separator';
import { Progress } from '../../../../components/ui/progress';
import { useParams } from 'react-router-dom';
import { recipeApi } from '../../../../apis/recipe-api';
import { useUserStore } from '../../../../stores/useUserStore';
import { PageLoading } from '../../../../components/loading';
import { toastError, toastSuccess } from '../../../../components/toaster';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { ReviewTab } from './components/ReviewTab';

export default function RecipeDetailPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const qc = useQueryClient();

  const params = useParams();
  const slug = params.slug || '';

  const { user } = useUserStore();
  const user_id = user?.id || '';

  const createRecipeFavouriteMtn = recipeApi.createRecipeFavourite.useMutation();
  const deleteRecipeFavouriteMtn = recipeApi.deleteRecipeFavourite.useMutation();

  const createRecipeUpvoteMtn = recipeApi.createRecipeUpvote.useMutation();
  const deleteRecipeUpvoteMtn = recipeApi.deleteRecipeUpvote.useMutation();

  const { data: getRecipeBySlugData, isLoading: isGetRecipeBySlugLoading } = recipeApi.getRecipeBySlug.useQuery(
    ['getRecipeBySlug', slug, user_id],
    {
      params: {
        slug,
        user_id,
      },
    },
    {
      queryKey: ['getRecipeBySlug', slug, user_id],
      enabled: !!slug,
    }
  );

  const toggleStepComplete = (stepIndex: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepIndex) ? prev.filter((s) => s !== stepIndex) : [...prev, stepIndex]
    );
    setActiveStep(stepIndex + 1);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Recipe link copied to clipboard!');
  };

  if (isGetRecipeBySlugLoading) {
    return <PageLoading />;
  }

  if (getRecipeBySlugData?.status !== 200) return null;

  const recipe = getRecipeBySlugData.body.data;

  const total_calories = +recipe.ingredients
    .reduce((total, ing) => (total += ing.ingredient_variant.ingredient.calories), 0)
    .toFixed(2);

  const total_protein = +recipe.ingredients
    .reduce((total, ing) => (total += ing.ingredient_variant.ingredient.protein), 0)
    .toFixed(2);

  const total_carbohydrates = +recipe.ingredients
    .reduce((total, ing) => (total += ing.ingredient_variant.ingredient.carbohydrates), 0)
    .toFixed(2);

  const total_fat = +recipe.ingredients
    .reduce((total, ing) => (total += ing.ingredient_variant.ingredient.fat), 0)
    .toFixed(2);

  const total_sugar = +recipe.ingredients
    .reduce((total, ing) => (total += ing.ingredient_variant.ingredient.sugar), 0)
    .toFixed(2);

  const total_fiber = +recipe.ingredients
    .reduce((total, ing) => (total += ing.ingredient_variant.ingredient.fiber), 0)
    .toFixed(2);

  const recipeNutritions = {
    total_protein,
    total_carbohydrates,
    total_fat,
    total_sugar,
    total_fiber,
  };

  const deleteRecipeFavourite = async (id: string) => {
    await deleteRecipeFavouriteMtn.mutateAsync(
      {
        body: {
          id,
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

  const markRecipeAsFavourite = async () => {
    await createRecipeFavouriteMtn.mutateAsync(
      {
        body: {
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

  const handleBookmarkIconClicked = async () => {
    if (recipe.is_favourited && recipe.user_favourite_id) {
      await deleteRecipeFavourite(recipe.user_favourite_id);
    } else {
      await markRecipeAsFavourite();
    }
  };

  const upvoteRecipe = async () => {
    await createRecipeUpvoteMtn.mutateAsync(
      {
        body: {
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

  const deleteRecipeUpvote = async (id: string) => {
    await deleteRecipeUpvoteMtn.mutateAsync(
      {
        body: {
          id,
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

  const handleHearIconClicked = async () => {
    if (recipe.is_upvoted && recipe.user_upvote_id) {
      await deleteRecipeUpvote(recipe.user_upvote_id);
    } else {
      await upvoteRecipe();
    }
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
                disabled={createRecipeFavouriteMtn.isPending || deleteRecipeFavouriteMtn.isPending}
              >
                <Bookmark className={clsx('h-4 w-4', recipe.is_favourited ? 'fill-current' : '')} />
              </Button>
              <Button
                size="sm"
                variant={recipe.is_upvoted ? 'default' : 'secondary'}
                onClick={handleHearIconClicked}
                className="shadow-lg"
                disabled={createRecipeUpvoteMtn.isPending || deleteRecipeUpvoteMtn.isPending}
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
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <Clock className="h-4 w-4 text-orange-500 mr-1" />
                      </div>
                      <div className="text-sm font-medium">{recipe.cook_time + recipe.preparation_time}m</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    {/* <div>
                      <div className="flex items-center justify-center mb-1">
                        <Users className="h-4 w-4 text-blue-500 mr-1" />
                      </div>
                      <div className="text-sm font-medium">{servings}</div>
                      <div className="text-xs text-muted-foreground">Servings</div>
                    </div> */}
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
                      <AvatarImage src={recipe.user.image || '/placeholder.svg'} />
                      <AvatarFallback>
                        {recipe.user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{recipe.user.name}</h3>
                        {recipe.user.is_email_verified && <Award className="h-4 w-4 text-blue-500" />}
                      </div>
                      {/* <div className="text-sm text-muted-foreground">
                        {recipe.author.followers.toLocaleString()} followers • {recipe.author.recipes} recipes
                      </div> */}
                    </div>
                  </div>
                  <Button variant="outline">Follow</Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              {/* <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Eye className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-2xl font-bold">{recipe.stats.views.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Views</div>
                </CardContent>
              </Card> */}
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

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button size="lg" className="h-12 col-span-2">
                <Timer className="mr-2 h-5 w-5" />
                Start Cooking
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="recipe" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="recipe">Recipe</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({recipe.review.reviews.length})</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>

          {/* Recipe Tab */}
          <TabsContent value="recipe" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Ingredients */}
              <div className="lg:col-span-1">
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle className="text-xl">Ingredients</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recipe.ingredients.map((ingredient, index) => (
                      <motion.div
                        key={ingredient.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={ingredient.ingredient_variant.image || '/placeholder.svg'}
                            alt={ingredient.ingredient_variant.name}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">
                            {ingredient.quantity % 1 === 0 ? ingredient.quantity : ingredient.quantity.toFixed(1)}{' '}
                            {ingredient.unit}
                          </div>
                          <div className="text-sm text-gray-600 truncate">{ingredient.ingredient_variant.name}</div>
                          {ingredient.note && <div className="text-xs text-muted-foreground">{ingredient.note}</div>}
                        </div>
                      </motion.div>
                    ))}

                    <Separator />

                    {/* BACKLOG_FEATURE */}
                    {/* <Button variant="outline" className="w-full bg-transparent">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add All to Shopping List
                    </Button> */}
                  </CardContent>
                </Card>
              </div>

              {/* Instructions */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Instructions</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Print className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                    <Button variant="outline" size="sm">
                      <Timer className="h-4 w-4 mr-2" />
                      Timer
                    </Button>
                  </div>
                </div>

                {recipe.steps.map((step, index) => (
                  <motion.div
                    key={step.step_no}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`transition-all duration-300 ${
                        completedSteps.includes(index)
                          ? 'bg-green-50 border-green-200'
                          : activeStep === index
                          ? 'ring-2 ring-orange-200 bg-orange-50'
                          : ''
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <Button
                              size="sm"
                              variant={completedSteps.includes(index) ? 'default' : 'outline'}
                              className="w-8 h-8 rounded-full p-0"
                              onClick={() => toggleStepComplete(index)}
                            >
                              {completedSteps.includes(index) ? '✓' : ''}
                            </Button>
                          </div>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-lg">{step.content}</h3>
                              {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {instruction.time} min
                              </div> */}
                            </div>

                            <p className="text-gray-700 leading-relaxed">{step.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">Cooking Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {completedSteps.length} of {recipe.steps.length} steps
                      </span>
                    </div>
                    <Progress value={(completedSteps.length / recipe.steps.length) * 100} className="h-2" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <ReviewTab recipe={recipe} user_id={user_id} />
          </TabsContent>

          <TabsContent value="nutrition">
            <Card>
              <CardHeader>
                <CardTitle>Nutritional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                      <div className="text-3xl font-bold text-orange-600 mb-2">{total_calories}</div>
                      <div className="text-sm text-muted-foreground">Calories</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(recipeNutritions)
                      .filter(([key]) => key !== 'calories')
                      .map(([key, value]) => {
                        const scaledValue = value;

                        const unit = ['total_protein', 'total_fat', 'total_sugar', 'total_fiber'].includes(key)
                          ? 'g'
                          : '';

                        return (
                          <div key={key} className="flex justify-between items-center py-2 border-b">
                            <span className="capitalize font-medium">{key.split('_').join(' ')}</span>
                            <span className="font-semibold">
                              {scaledValue}
                              {unit}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips">
            <Card>
              <CardHeader>
                <CardTitle>Chef's Tips & Tricks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recipe.tips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{tip.content}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
