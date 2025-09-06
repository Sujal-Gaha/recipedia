import { Dispatch, SetStateAction, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../../../components/ui/dialog';
import { Button } from '../../../../../components/ui/button';
import { Star } from 'lucide-react';
import { Label } from '../../../../../components/ui/label';
import clsx from 'clsx';
import { RecipeReviewRatingEnumSchema, RecipeReviewRatingEnumType, TUpsertRecipeReviewInput } from '@libs/contract';
import { Textarea } from '../../../../../components/ui/textarea';
import { recipeApi } from '../../../../../apis/recipe-api';
import { SubmitHandler, useForm, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { toastError, toastSuccess } from '../../../../../components/toaster';
import { useQueryClient } from '@tanstack/react-query';
import { CardLoading, InlineLoading } from '../../../../../components/loading';

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

const RecipeReviewDialog = ({
  isUpserting,
  rating,
  setRecipeReviewDialog,
  register,
  setValue,
  handleSubmit,
  upsertRecipeReview,
}: {
  isUpserting: boolean;
  rating: RecipeReviewRatingEnumType;
  setRecipeReviewDialog: Dispatch<SetStateAction<boolean>>;
  register: UseFormRegister<TUpsertRecipeReviewInput>;
  setValue: UseFormSetValue<TUpsertRecipeReviewInput>;
  handleSubmit: UseFormHandleSubmit<TUpsertRecipeReviewInput>;
  upsertRecipeReview: SubmitHandler<TUpsertRecipeReviewInput>;
}) => {
  return (
    <form onSubmit={handleSubmit(upsertRecipeReview)} className="space-y-4">
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
        <Button type="submit" disabled={isUpserting}>
          {isUpserting ? <InlineLoading /> : 'Submit Review'}
        </Button>
        <Button type="button" variant="outline" onClick={() => setRecipeReviewDialog(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export const useRecipeReviewModal = ({
  user_id,
  recipe_id,
  review_id,
}: {
  user_id: string;
  recipe_id: string;
  review_id: string;
}) => {
  const [isRecipeReviewModalOpen, setRecipeReviewModal] = useState(false);

  const upsertRecipeReviewMtn = recipeApi.upsertRecipeReview.useMutation();

  const qc = useQueryClient();

  const { data, isLoading } = recipeApi.getRecipeReviewById.useQuery(
    ['getRecipeReviewById', review_id],
    {
      query: {
        id: review_id,
      },
    },
    {
      queryKey: ['getRecipeReviewById', review_id],
      enabled: !!review_id,
    }
  );

  const { handleSubmit, register, setValue } = useForm<TUpsertRecipeReviewInput>({
    values: {
      comment: data?.body.data.comment || '',
      rating: data?.body.data.rating || 'FIVE',
      recipe_id,
      user_id,
    },
  });

  const upsertRecipeReview: SubmitHandler<TUpsertRecipeReviewInput> = async (input) => {
    await upsertRecipeReviewMtn.mutateAsync(
      {
        body: {
          id: review_id,
          comment: input.comment,
          rating: input.rating,
          recipe_id,
          user_id: input.user_id,
        },
      },
      {
        onSuccess: (data) => {
          toastSuccess(data.body.message);
          qc.invalidateQueries({
            queryKey: ['getRecipeBySlug'],
          });
          setRecipeReviewModal(false);
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

  return {
    setRecipeReviewModal,
    RecipeReviewModalNode: (
      <Dialog open={isRecipeReviewModalOpen} onOpenChange={setRecipeReviewModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <CardLoading />
          ) : (
            <RecipeReviewDialog
              setRecipeReviewDialog={setRecipeReviewModal}
              register={register}
              setValue={setValue}
              rating={data?.body.data.rating || getRatingEnum(0)}
              handleSubmit={handleSubmit}
              upsertRecipeReview={upsertRecipeReview}
              isUpserting={upsertRecipeReviewMtn.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    ),
  };
};
