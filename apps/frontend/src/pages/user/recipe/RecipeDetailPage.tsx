import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Share2,
  Clock,
  Users,
  ChefHat,
  Star,
  MessageCircle,
  Bookmark,
  Plus,
  Minus,
  Timer,
  ShoppingCart,
  Printer as Print,
  Flag,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Award,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Separator } from '../../../components/ui/separator';
import { Progress } from '../../../components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { useParams } from 'react-router-dom';
import { recipeApi } from '../../../apis/recipe-api';
import { useUserStore } from '../../../stores/useUserStore';
import { PageLoading } from '../../../components/loading';
import { toastError, toastSuccess } from '../../../components/toaster';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';

// Mock reviews data
const mockReviews = [
  {
    id: '1',
    user: {
      name: 'Sarah Johnson',
      avatar: '/placeholder.svg?height=40&width=40&text=SJ',
      verified: false,
    },
    rating: 5,
    date: '2024-01-15',
    title: 'Perfect pizza recipe!',
    content:
      "This recipe is absolutely amazing! The crust came out perfectly crispy and the flavor combination is incredible. My family loved it and we'll definitely be making this again.",
    helpful: 23,
    images: [
      '/placeholder.svg?height=150&width=150&text=User+Pizza+1',
      '/placeholder.svg?height=150&width=150&text=User+Pizza+2',
    ],
    verified_purchase: true,
  },
  {
    id: '2',
    user: {
      name: 'Mike Chen',
      avatar: '/placeholder.svg?height=40&width=40&text=MC',
      verified: true,
    },
    rating: 4,
    date: '2024-01-10',
    title: 'Great recipe with minor tweaks',
    content:
      'Excellent base recipe! I added a bit of garlic to the sauce and used whole wheat flour for the dough. Still turned out fantastic. The instructions are very clear and easy to follow.',
    helpful: 18,
    images: [],
    verified_purchase: true,
  },
  {
    id: '3',
    user: {
      name: 'Emma Rodriguez',
      avatar: '/placeholder.svg?height=40&width=40&text=ER',
      verified: false,
    },
    rating: 5,
    date: '2024-01-08',
    title: 'Restaurant quality at home',
    content:
      "I've tried many pizza recipes but this one is by far the best. The key is really using high-quality ingredients like San Marzano tomatoes and buffalo mozzarella. Worth every penny!",
    helpful: 31,
    images: ['/placeholder.svg?height=150&width=150&text=User+Pizza+3'],
    verified_purchase: false,
  },
];

export default function RecipeDetailPage() {
  const [reviews, setReviews] = useState(mockReviews);
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    content: '',
  });

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
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Recipe link copied to clipboard!');
  };

  const submitReview = () => {
    if (!newReview.title.trim() || !newReview.content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const review = {
      id: Date.now().toString(),
      user: {
        name: 'You',
        avatar: '/placeholder.svg?height=40&width=40&text=You',
        verified: false,
      },
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      title: newReview.title,
      content: newReview.content,
      helpful: 0,
      images: [],
      verified_purchase: false,
    };

    setReviews((prev) => [review, ...prev]);
    setNewReview({ rating: 5, title: '', content: '' });
    setShowReviewForm(false);
    toast.success('Review submitted successfully!');
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

            {/* Recipe Stats */}
            {/* <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Eye className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-2xl font-bold">{recipe.stats.views.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Views</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <MessageCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-2xl font-bold">{recipe.stats.reviews}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Reviews</div>
                </CardContent>
              </Card>
            </div> */}

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
            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
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

                {/* Completion Progress */}
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

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            {/* Review Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">{recipe.review.average_rating}</div>
                    <div className="flex items-center justify-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= recipe.review.average_rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">Based on {recipe.review.total_reviews} reviews</div>
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = reviews.filter((r) => r.rating === rating).length;
                      const percentage = (count / reviews.length) * 100;

                      return (
                        <div key={rating} className="flex items-center gap-3">
                          <div className="flex items-center gap-1 w-12">
                            <span className="text-sm">{rating}</span>
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          </div>
                          <Progress value={percentage} className="flex-1 h-2" />
                          <span className="text-sm text-muted-foreground w-8">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex justify-center">
                  <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
                    <DialogTrigger asChild>
                      <Button>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Write a Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Write a Review</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Rating</Label>
                          <div className="flex gap-1 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Button
                                key={star}
                                variant="ghost"
                                size="sm"
                                className="p-1"
                                onClick={() => setNewReview((prev) => ({ ...prev, rating: star }))}
                              >
                                <Star
                                  className={`h-6 w-6 ${
                                    star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="review-title">Title</Label>
                          <input
                            id="review-title"
                            className="w-full mt-1 px-3 py-2 border rounded-md"
                            placeholder="Summarize your experience"
                            value={newReview.title}
                            onChange={(e) => setNewReview((prev) => ({ ...prev, title: e.target.value }))}
                          />
                        </div>

                        <div>
                          <Label htmlFor="review-content">Review</Label>
                          <Textarea
                            id="review-content"
                            className="mt-1"
                            placeholder="Share your thoughts about this recipe..."
                            rows={4}
                            value={newReview.content}
                            onChange={(e) => setNewReview((prev) => ({ ...prev, content: e.target.value }))}
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button onClick={submitReview} className="flex-1">
                            Submit Review
                          </Button>
                          <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={review.user.avatar || '/placeholder.svg'} />
                            <AvatarFallback>
                              {review.user.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{review.user.name}</span>
                              {review.user.verified && <Award className="h-4 w-4 text-blue-500" />}
                              {review.verified_purchase && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Flag className="mr-2 h-4 w-4" />
                              Report
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">{review.title}</h4>
                        <p className="text-gray-700 leading-relaxed">{review.content}</p>

                        {/* BACKLOG_FEATURE */}
                        {/* {review.images.length > 0 && (
                          <div className="flex gap-2">
                            {review.images.map((image, imgIndex) => (
                              <div key={imgIndex} className="w-20 h-20 rounded-lg overflow-hidden">
                                <img
                                  src={image || '/placeholder.svg'}
                                  alt={`Review image ${imgIndex + 1}`}
                                  width={80}
                                  height={80}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            ))}
                          </div>
                        )} */}

                        <div className="flex items-center gap-4 pt-2">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            Helpful ({review.helpful})
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ThumbsDown className="mr-2 h-4 w-4" />
                            Not helpful
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
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
