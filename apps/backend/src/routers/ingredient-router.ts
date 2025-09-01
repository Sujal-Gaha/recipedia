import { validateAccessToken } from '@baijanstack/express-auth';
import { ingredientContract } from '@libs/contract';
import { initServer } from '@ts-rest/express';
import { createIngredient } from '../modules/ingredient/createIngredient';
import { getAllIngredients } from '../modules/ingredient/getAllIngredients';
import { getIngredientById } from '../modules/ingredient/getIngredientById';

const s = initServer();

export const ingredientRouter = s.router(ingredientContract, {
  createIngredient: {
    middleware: [validateAccessToken],
    handler: createIngredient,
  },
  getAllIngredients: {
    middleware: [validateAccessToken],
    handler: getAllIngredients,
  },
  getIngredientById: {
    middleware: [validateAccessToken],
    handler: getIngredientById,
  },
});
