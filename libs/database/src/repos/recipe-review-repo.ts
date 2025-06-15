import {
  RecipeReviewRepo,
  TCreateRecipeReviewRepoInput,
  TDeleteManyRecipeReviewsRepoOuput,
  TDeleteRecipeReviewRepoInput,
  TFindManyRecipeReviewsRepoInput,
  TFindRecipeReviewByIdRepoInput,
  TRecipeReview,
} from '@libs/quasar';
import { db } from '../prisma/client';

export class PrismaRecipeReviewRepo extends RecipeReviewRepo {
  override async create({
    data: { recipe_id, user_id, comment, rating },
  }: TCreateRecipeReviewRepoInput): Promise<TRecipeReview> {
    return await db.recipeReview.create({
      data: {
        recipe_id,
        user_id,
        comment,
        rating,
      },
    });
  }

  override async delete({ data: { id } }: TDeleteRecipeReviewRepoInput): Promise<TRecipeReview> {
    return await db.recipeReview.delete({
      where: {
        id,
      },
    });
  }

  override async findById({ data: { id } }: TFindRecipeReviewByIdRepoInput): Promise<TRecipeReview | null> {
    return await db.recipeReview.findUnique({
      where: {
        id,
      },
    });
  }

  override async findMany({ data: { recipe_id } }: TFindManyRecipeReviewsRepoInput): Promise<TRecipeReview[]> {
    return await db.recipeReview.findMany({
      where: {
        recipe_id,
      },
    });
  }

  override async deleteMany({ data: { recipe_id } }: TDeleteManyRecipeReviewsRepoOuput): Promise<TRecipeReview[]> {
    const reviews = db.recipeReview.findMany({
      where: {
        recipe_id,
      },
    });

    await db.recipeReview.deleteMany({
      where: {
        recipe_id,
      },
    });

    return reviews;
  }
}
