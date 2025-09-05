import {
  RecipeReviewRatingEnumSchema,
  RecipeReviewRatingEnumType,
  TCreateRecipeReviewInput,
  TGetRecipeBySlugOutput,
} from '@libs/contract';
import { Card, CardContent } from '../../../../../components/ui/card';
import { Award, Flag, MessageCircle, MoreHorizontal, Star, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Progress } from '../../../../../components/ui/progress';
import { Separator } from '../../../../../components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../../../components/ui/dialog';
import { Button } from '../../../../../components/ui/button';
import { Label } from '../../../../../components/ui/label';
import { Textarea } from '../../../../../components/ui/textarea';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../../components/ui/dropdown-menu';
import { useState } from 'react';
import { recipeApi } from '../../../../../apis/recipe-api';
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { toastError, toastSuccess } from '../../../../../components/toaster';
import { useQueryClient } from '@tanstack/react-query';
import { InlineLoading } from '../../../../../components/loading';

export const ReviewTab = ({ recipe, user_id }: { recipe: TGetRecipeBySlugOutput; user_id: string }) => {
  const [isReviewDialogOpen, setReviewDialog] = useState(false);

  const qc = useQueryClient();

  const createRecipeReviewMtn = recipeApi.createRecipeReview.useMutation();

  const { register, handleSubmit, setValue, watch } = useForm<TCreateRecipeReviewInput>({
    defaultValues: {
      comment: '',
      rating: 'FIVE',
      recipe_id: recipe.id,
      user_id,
    },
  });

  const createRecipeReview: SubmitHandler<TCreateRecipeReviewInput> = async (input) => {
    await createRecipeReviewMtn.mutateAsync(
      {
        body: {
          comment: input.comment,
          rating: input.rating,
          recipe_id: recipe.id,
          user_id: input.user_id,
        },
      },
      {
        onSuccess: (data) => {
          toastSuccess(data.body.message);
          qc.invalidateQueries({
            queryKey: ['getRecipeBySlug'],
          });
          setReviewDialog(false);
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

  const getRating = (rating: string): number => {
    if (rating === 'ONE') return 1;
    if (rating === 'TWO') return 2;
    if (rating === 'THREE') return 3;
    if (rating === 'FOUR') return 4;
    if (rating === 'FIVE') return 5;
    return 0;
  };

  const getRatingEnum = (rating: number): RecipeReviewRatingEnumType => {
    if (rating === 1) return RecipeReviewRatingEnumSchema.Enum.ONE;
    if (rating === 2) return RecipeReviewRatingEnumSchema.Enum.TWO;
    if (rating === 3) return RecipeReviewRatingEnumSchema.Enum.THREE;
    if (rating === 4) return RecipeReviewRatingEnumSchema.Enum.FOUR;
    return RecipeReviewRatingEnumSchema.Enum.FIVE;
  };

  const { rating } = watch();

  return (
    <>
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
                const count = recipe.review.reviews.filter((r) => getRating(r.rating) === rating).length;
                const percentage = (count / recipe.review.reviews.length) * 100;

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
            <Dialog open={isReviewDialogOpen} onOpenChange={setReviewDialog}>
              <DialogTrigger asChild>
                <Button type="button">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Write a Review
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Write a Review</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(createRecipeReview)} className="space-y-4">
                  <div>
                    <Label>Rating</Label>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button
                          key={star}
                          variant="ghost"
                          size="sm"
                          type="button"
                          className="p-1"
                          onClick={() => setValue('rating', getRatingEnum(star))}
                        >
                          <Star
                            className={clsx(
                              'h-6 w-6',
                              star <= getRating(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            )}
                          />
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="review-content">Review</Label>
                    <Textarea
                      id="review-content"
                      className="mt-1"
                      placeholder="Share your thoughts about this recipe..."
                      rows={4}
                      {...register('comment')}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" disabled={createRecipeReviewMtn.isPending}>
                      {createRecipeReviewMtn.isPending ? <InlineLoading /> : 'Submit Review'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setReviewDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {recipe.review.reviews.map((review, index) => (
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
                      <AvatarImage src={review.user.image || '/placeholder.svg'} />
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
                        {review.user.is_email_verified && <Award className="h-4 w-4 text-blue-500" />}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= getRating(review.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.created_at).toLocaleDateString()}
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
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>

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
                      Helpful ({review.total_votes})
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
    </>
  );
};
