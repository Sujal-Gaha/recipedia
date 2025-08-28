import {
  RecipeReviewVoteRepo,
  TCreateRecipeReviewVoteRepoInput,
  TDeleteManyRecipeReviewVotesRepoOuput,
  TDeleteRecipeReviewVoteRepoInput,
  TFindManyRecipeReviewVotesRepoInput,
  TFindRecipeReviewVoteByIdRepoInput,
  TRecipeReviewVote,
} from '@libs/quasar';
import { db } from '../../prisma/client';

export class PrismaRecipeReviewVoteRepo extends RecipeReviewVoteRepo {
  override async create({
    data: { review_id, user_id, type },
  }: TCreateRecipeReviewVoteRepoInput): Promise<TRecipeReviewVote> {
    return await db.recipeReviewVote.create({
      data: {
        review_id,
        user_id,
        type,
      },
    });
  }

  override async delete({ data: { id } }: TDeleteRecipeReviewVoteRepoInput): Promise<TRecipeReviewVote> {
    return await db.recipeReviewVote.delete({
      where: {
        id,
      },
    });
  }

  override async findById({ data: { id } }: TFindRecipeReviewVoteByIdRepoInput): Promise<TRecipeReviewVote | null> {
    return await db.recipeReviewVote.findUnique({
      where: {
        id,
      },
    });
  }

  override async findMany({ data: { review_id } }: TFindManyRecipeReviewVotesRepoInput): Promise<TRecipeReviewVote[]> {
    return await db.recipeReviewVote.findMany({
      where: {
        review_id,
      },
    });
  }

  override async deleteMany({
    data: { review_id },
  }: TDeleteManyRecipeReviewVotesRepoOuput): Promise<TRecipeReviewVote[]> {
    const reviewVotes = db.recipeReviewVote.findMany({
      where: {
        review_id,
      },
    });

    await db.recipeReviewVote.deleteMany({
      where: {
        review_id,
      },
    });

    return reviewVotes;
  }
}
