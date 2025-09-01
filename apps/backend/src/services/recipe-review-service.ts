import { PrismaRecipeReviewRepo, PrismaRecipeReviewVoteRepo } from '@libs/database';

export class RecipeReviewService {
  constructor(
    private readonly recipeReviewRepo: PrismaRecipeReviewRepo,
    private readonly recipeReviewVoteRepo: PrismaRecipeReviewVoteRepo
  ) {}
}
