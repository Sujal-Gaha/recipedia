import { validateAccessToken } from '@baijanstack/express-auth';
import { recipeContract } from '@libs/contract';
import { initServer } from '@ts-rest/express';
import { createRecipe } from '../modules/recipe/createRecipe';
import { getAllRecipes } from '../modules/recipe/getAllRecipes';
import { getRecipeBySlug } from '../modules/recipe/getRecipeBySlug';

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
});
