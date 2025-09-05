import { validateAccessToken } from '@baijanstack/express-auth';
import { recipeContract } from '@libs/contract';
import { initServer } from '@ts-rest/express';
import { createRecipe } from '../modules/recipe/createRecipe';
import { getAllRecipes } from '../modules/recipe/getAllRecipes';
import { getRecipeBySlug } from '../modules/recipe/getRecipeBySlug';
import { createRecipeFavourite } from '../modules/recipe/createRecipeFavourite';
import { createRecipeUpvote } from '../modules/recipe/createRecipeUpvote';
import { deleteRecipeFavourite } from '../modules/recipe/deleteRecipeFavourite';
import { deleteRecipeUpvote } from '../modules/recipe/deleteRecipeUpvote';
import { createRecipeReview } from '../modules/recipe/createRecipeReview';
import { deleteRecipeReview } from '../modules/recipe/deleteRecipeReview';

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

  createRecipeFavourite: {
    middleware: [validateAccessToken],
    handler: createRecipeFavourite,
  },
  deleteRecipeFavourite: {
    middleware: [validateAccessToken],
    handler: deleteRecipeFavourite,
  },

  createRecipeUpvote: {
    middleware: [validateAccessToken],
    handler: createRecipeUpvote,
  },
  deleteRecipeUpvote: {
    middleware: [validateAccessToken],
    handler: deleteRecipeUpvote,
  },

  createRecipeReview: {
    middleware: [validateAccessToken],
    handler: createRecipeReview,
  },
  deleteRecipeReview: {
    middleware: [validateAccessToken],
    handler: deleteRecipeReview,
  },
});
