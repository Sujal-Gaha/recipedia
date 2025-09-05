import { initContract } from '@ts-rest/core';
import { BASE_API_PATH, ErrorSchema, TrueOrFalseInputSchema } from '../lib/schema';
import { CreateRecipeWithAllFieldsInputSchema, CreateRecipeWithAllFieldsResponseSchema } from './schema';
import { GetAllRecipesResponseSchema, GetRecipeBySlugResponseSchema } from './recipe/schema';
import { z } from 'zod';
import { RecipeDifficultySchema, RecipeStatusSchema } from '../__generated__';
import {
  CreateRecipeFavouriteInputSchema,
  CreateRecipeFavouriteResponseSchema,
  DeleteRecipeFavouriteInputSchema,
  DeleteRecipeFavouriteResponseSchema,
} from './recipe-favourite/schema';
import {
  CreateRecipeUpvoteInputSchema,
  CreateRecipeUpvoteResponseSchema,
  DeleteRecipeUpvoteInputSchema,
  DeleteRecipeUpvoteResponseSchema,
} from './recipe-upvote/schema';
import {
  CreateRecipeReviewInputSchema,
  CreateRecipeReviewResponseSchema,
  DeleteRecipeReviewInputSchema,
  DeleteRecipeReviewResponseSchema,
} from './recipe-review/schema';

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
      user_id: z.string().optional(),
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

  deleteRecipeFavourite: {
    method: 'POST',
    path: `${BASE_API_PATH}/recipe/deleteRecipeFavourite`,
    body: DeleteRecipeFavouriteInputSchema,
    responses: {
      200: DeleteRecipeFavouriteResponseSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Delete a recipe favourite',
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

  deleteRecipeUpvote: {
    method: 'POST',
    path: `${BASE_API_PATH}/recipe/deleteRecipeUpvote`,
    body: DeleteRecipeUpvoteInputSchema,
    responses: {
      200: DeleteRecipeUpvoteResponseSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Delete a recipe favourite',
  },

  createRecipeReview: {
    method: 'POST',
    path: `${BASE_API_PATH}/recipe/createRecipeReview`,
    body: CreateRecipeReviewInputSchema,
    responses: {
      201: CreateRecipeReviewResponseSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Create a recipe review',
  },

  deleteRecipeReview: {
    method: 'POST',
    path: `${BASE_API_PATH}/recipe/deleteRecipeReview`,
    body: DeleteRecipeReviewInputSchema,
    responses: {
      200: DeleteRecipeReviewResponseSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Delete a recipe review',
  },
});
