import { initContract } from '@ts-rest/core';
import { BASE_API_PATH, ErrorSchema } from '../lib/schema';
import {
  CreateRecipeWithAllFieldsInputSchema,
  CreateRecipeWithAllFieldsResponseSchema,
  GetAllRecipesWithAllFieldsInputSchema,
  GetRecipeBySlugWithAllFieldsResponseSchema,
} from './schema';
import { GetAllRecipesResponseSchema, GetRecipeBySlugResponseSchema } from './recipe/schema';

const c = initContract();

export const recipeContract = c.router({
  createRecipe: {
    method: 'POST',
    path: `${BASE_API_PATH}/recipe/createRecipe`,
    body: CreateRecipeWithAllFieldsInputSchema,
    responses: {
      201: CreateRecipeWithAllFieldsResponseSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Create a recipe',
  },

  getAllRecipes: {
    method: 'GET',
    path: `${BASE_API_PATH}/recipe/getAllRecipes`,
    query: GetAllRecipesWithAllFieldsInputSchema,
    responses: {
      200: GetAllRecipesResponseSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get all recipes',
  },

  getRecipeBySlug: {
    method: 'GET',
    path: `${BASE_API_PATH}/recipe/getRecipeBySlug/:slug`,
    responses: {
      200: GetRecipeBySlugResponseSchema,
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get a recipe by slug',
  },
});
