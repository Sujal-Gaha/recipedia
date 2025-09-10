import { RecipeReviewVoteTypeType, TGetRecipeBySlugOutput } from '@libs/contract';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Edit, Flag, MessageCircle, MoreHorizontal, Star, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { recipeApi } from '@/apis/recipe-api';
import clsx from 'clsx';
import { toastError, toastSuccess } from '@/components/toaster';
import { useQueryClient } from '@tanstack/react-query';
import { useRecipeReviewModal } from '../modules/useRecipeReviewDialog';

export const ReviewTab = ({ recipe, user_id }: { recipe: TGetRecipeBySlugOutput; user_id: string }) => {
  const [selectedReviewId, setSelectedReviewId] = useState('');

  const qc = useQueryClient();

  const toggleRecipeReviewVoteMtn = recipeApi.toggleRecipeReviewVote.useMutation();

  const { RecipeReviewModalNode, setRecipeReviewModal } = useRecipeReviewModal({
    recipe_id: recipe.id,
    user_id,
    review_id: selectedReviewId,
  });

  const toggleRecipeReviewVote = async ({
    id,
    type,
    review_id,
  }: {
    id: string;
    type: RecipeReviewVoteTypeType;
    review_id: string;
  }) => {
    await toggleRecipeReviewVoteMtn.mutateAsync(
      {
        body: {
          id,
          review_id,
          type,
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

  const getRating = (rating: string): number => {
    if (rating === 'ONE') return 1;
    if (rating === 'TWO') return 2;
    if (rating === 'THREE') return 3;
    if (rating === 'FOUR') return 4;
    if (rating === 'FIVE') return 5;
    return 0;
  };

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

          {RecipeReviewModalNode}

          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() => {
                setSelectedReviewId('');
                setRecipeReviewModal(true);
              }}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Write a Review
            </Button>
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
                      {review.user.id === user_id ? (
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedReviewId(review.id);
                            setRecipeReviewModal(true);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>
                          <Flag className="mr-2 h-4 w-4" />
                          Report
                        </DropdownMenuItem>
                      )}
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        toggleRecipeReviewVote({
                          id: review.votes.find((vote) => vote.review_id === review.id)?.id || '',
                          type: 'UPVOTE',
                          review_id: review.id,
                        });
                      }}
                      disabled={toggleRecipeReviewVoteMtn.isPending}
                    >
                      <ThumbsUp className={clsx('mr-2 h-4 w-4', review.is_upvoted ? 'fill-green-500' : '')} />
                      Helpful ({review.total_upvotes})
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        toggleRecipeReviewVote({
                          id: review.votes.find((vote) => vote.review_id === review.id)?.id || '',
                          type: 'DOWNVOTE',
                          review_id: review.id,
                        });
                      }}
                      disabled={toggleRecipeReviewVoteMtn.isPending}
                    >
                      <ThumbsDown className={clsx('mr-2 h-4 w-4', review.is_downvoted ? 'fill-red-500' : '')} />
                      Not helpful ({review.total_downvotes})
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
