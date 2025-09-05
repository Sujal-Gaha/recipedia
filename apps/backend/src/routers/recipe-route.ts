import { validateAccessToken } from '@baijanstack/express-auth';
import { recipeContract } from '@libs/contract';
import { initServer } from '@ts-rest/express';
import { createRecipe } from '../modules/recipe/createRecipe';
import { getAllRecipes } from '../modules/recipe/getAllRecipes';
import { getRecipeBySlug } from '../modules/recipe/getRecipeBySlug';
import { createRecipeFavourite } from '../modules/recipe/createRecipeFavourite';
import { createRecipeUpvote } from '../modules/recipe/createRecipeUpvote';

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
  createRecipeUpvote: {
    middleware: [validateAccessToken],
    handler: createRecipeUpvote,
  },
});
