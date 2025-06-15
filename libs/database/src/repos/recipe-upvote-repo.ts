import {
  RecipeUpvoteRepo,
  TCreateRecipeUpvoteRepoInput,
  TDeleteManyRecipeUpvotesRepoOuput,
  TDeleteRecipeUpvoteRepoInput,
  TFindManyRecipeUpvotesRepoInput,
  TFindRecipeUpvoteByIdRepoInput,
  TRecipeUpvote,
} from '@libs/quasar';
import { db } from '../prisma/client';

export class PrismaRecipeUpvoteRepo extends RecipeUpvoteRepo {
  override async create({ data: { recipe_id, user_id } }: TCreateRecipeUpvoteRepoInput): Promise<TRecipeUpvote> {
    return await db.recipeUpvote.create({
      data: {
        recipe_id,
        user_id,
      },
    });
  }

  override async delete({ data: { id } }: TDeleteRecipeUpvoteRepoInput): Promise<TRecipeUpvote> {
    return await db.recipeUpvote.delete({
      where: {
        id,
      },
    });
  }

  override async findById({ data: { id } }: TFindRecipeUpvoteByIdRepoInput): Promise<TRecipeUpvote | null> {
    return await db.recipeUpvote.findUnique({
      where: {
        id,
      },
    });
  }

  override async findMany({ data: { recipe_id } }: TFindManyRecipeUpvotesRepoInput): Promise<TRecipeUpvote[]> {
    return await db.recipeUpvote.findMany({
      where: {
        recipe_id,
      },
    });
  }

  override async deleteMany({ data: { recipe_id } }: TDeleteManyRecipeUpvotesRepoOuput): Promise<TRecipeUpvote[]> {
    const upvotes = db.recipeUpvote.findMany({
      where: {
        recipe_id,
      },
    });

    await db.recipeUpvote.deleteMany({
      where: {
        recipe_id,
      },
    });

    return upvotes;
  }
}
