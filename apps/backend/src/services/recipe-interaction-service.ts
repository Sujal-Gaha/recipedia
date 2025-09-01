import { PrismaRecipeFavouriteRepo, PrismaRecipeUpvoteRepo } from '@libs/database';
import { logger } from '@libs/quasar';

export class RecipeInteractionService {
  constructor(
    private readonly recipeFavouriteRepo: PrismaRecipeFavouriteRepo,
    private readonly recipeUpvoteRepo: PrismaRecipeUpvoteRepo
  ) {
    logger.info('Recipe Interaction Service initialized...');
  }
}
