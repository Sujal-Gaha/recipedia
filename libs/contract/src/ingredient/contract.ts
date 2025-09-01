import { initContract } from '@ts-rest/core';
import { BASE_API_PATH, ErrorSchema } from '../lib/schema';
import {
  CreateIngredientWithVariantsAndImagesInputSchema,
  CreateIngredientWithVariantsAndImagesResponseSchema,
  GetAllIngredientsWithVariantsAndImagesInputSchema,
  GetAllIngredientsWithVariantsAndImagesResponseSchema,
  GetIngredientByIdWithVariantsAndImagesInputSchema,
  GetIngredientByIdWithVariantsAndImagesResponseSchema,
} from './schema';

const c = initContract();

export const ingredientContract = c.router({
  createIngredient: {
    method: 'POST',
    path: `${BASE_API_PATH}/ingredient/createIngredient`,
    body: CreateIngredientWithVariantsAndImagesInputSchema,
    responses: {
      201: CreateIngredientWithVariantsAndImagesResponseSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Create an ingredient',
  },

  getIngredientById: {
    method: 'GET',
    path: `${BASE_API_PATH}/ingredient/getIngredientById`,
    query: GetIngredientByIdWithVariantsAndImagesInputSchema,
    responses: {
      200: GetIngredientByIdWithVariantsAndImagesResponseSchema,
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get an ingredient by id',
  },

  getAllIngredients: {
    method: 'GET',
    path: `${BASE_API_PATH}/ingredient/getAllIngredients`,
    query: GetAllIngredientsWithVariantsAndImagesInputSchema,
    responses: {
      200: GetAllIngredientsWithVariantsAndImagesResponseSchema,
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get all ingredients',
  },
});
