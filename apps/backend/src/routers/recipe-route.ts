import { validateAccessToken } from '@baijanstack/express-auth';
import { recipeContract } from '@libs/contract';
import { initServer } from '@ts-rest/express';
import { createRecipe } from '../modules/recipe/createRecipe';
import { getAllRecipes } from '../modules/recipe/getAllRecipes';
import { getRecipeBySlug } from '../modules/recipe/getRecipeBySlug';
import { deleteRecipeReview } from '../modules/recipe/deleteRecipeReview';
import { toggleRecipeReviewVote } from '../modules/recipe/toggleRecipeReviewVote';
import { upsertRecipeReview } from '../modules/recipe/upsertRecipeReview';
import { getRecipeReviewById } from '../modules/recipe/getRecipeReviewById';
import { toggleRecipeFavourite } from '../modules/recipe/toggleRecipeFavourite';
import { toggleRecipeUpvote } from '../modules/recipe/toggleRecipeUpvote';

const s = initServer();

export const recipeRouter = s.router(recipeContract, {
  createRecipe: {
    middleware: [validateAccessToken],
    handler: createRecipe,
  },
  getAllRecipes: {
    middleware: [validateAccessToken],
    handler: getAllRecipes,
  },
  getRecipeBySlug: {
    middleware: [validateAccessToken],
    handler: getRecipeBySlug,
  },

  toggleRecipeFavourite: {
    middleware: [validateAccessToken],
    handler: toggleRecipeFavourite,
  },

  toggleRecipeUpvote: {
    middleware: [validateAccessToken],
    handler: toggleRecipeUpvote,
  },

  upsertRecipeReview: {
    middleware: [validateAccessToken],
    handler: upsertRecipeReview,
  },
  getRecipeReviewById: {
    middleware: [validateAccessToken],
    handler: getRecipeReviewById,
  },
  deleteRecipeReview: {
    middleware: [validateAccessToken],
    handler: deleteRecipeReview,
  },

  toggleRecipeReviewVote: {
    middleware: [validateAccessToken],
    handler: toggleRecipeReviewVote,
  },
});
