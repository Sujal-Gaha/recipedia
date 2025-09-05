import { initContract } from '@ts-rest/core';
import { BASE_API_PATH, ErrorSchema, TrueOrFalseInputSchema } from '../lib/schema';
import { CreateRecipeWithAllFieldsInputSchema, CreateRecipeWithAllFieldsResponseSchema } from './schema';
import { GetAllRecipesResponseSchema, GetRecipeBySlugResponseSchema } from './recipe/schema';
import { z } from 'zod';
import { RecipeDifficultySchema, RecipeStatusSchema } from '../__generated__';
import { CreateRecipeFavouriteInputSchema, CreateRecipeFavouriteResponseSchema } from './recipe-favourite/schema';
import { CreateRecipeUpvoteInputSchema, CreateRecipeUpvoteResponseSchema } from './recipe-upvote/schema';

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
    query: z.object({
      page: z.string(),
      perPage: z.string(),
      preparation_time: z.string().optional(),
      cook_time: z.string().optional(),
      difficulty: RecipeDifficultySchema.optional(),
      status: RecipeStatusSchema.optional(),
      is_flagged: TrueOrFalseInputSchema.optional(),
      global_filter: z.string().optional(),
      recipe_ingredients_ids: z.array(z.string()).optional(),
    }),
    responses: {
      200: GetAllRecipesResponseSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get all recipes',
  },

  getRecipeBySlug: {
    method: 'GET',
    path: `${BASE_API_PATH}/recipe/getRecipeBySlug/:slug/:user_id`,
    responses: {
      200: GetRecipeBySlugResponseSchema,
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get a recipe by slug',
  },

  createRecipeFavourite: {
    method: 'POST',
    path: `${BASE_API_PATH}/recipe/createRecipeFavourite`,
    body: CreateRecipeFavouriteInputSchema,
    responses: {
      201: CreateRecipeFavouriteResponseSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Create a recipe favourite',
  },

  createRecipeUpvote: {
    method: 'POST',
    path: `${BASE_API_PATH}/recipe/createRecipeUpvote`,
    body: CreateRecipeUpvoteInputSchema,
    responses: {
      201: CreateRecipeUpvoteResponseSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Create a recipe upvote',
  },
});
