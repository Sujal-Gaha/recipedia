import { initContract } from '@ts-rest/core';
import { BASE_API_PATH, ErrorSchema, TrueOrFalseInputSchema } from '../lib/schema';
import { CreateRecipeWithAllFieldsInputSchema, CreateRecipeWithAllFieldsResponseSchema } from './schema';
import {
  FlagRecipeByIdInputSchema,
  FlagRecipeByIdResponseSchema,
  GetAllRecipesResponseSchema,
  GetRecipeBySlugInputSchema,
  GetRecipeBySlugResponseSchema,
} from './recipe/schema';
import { z } from 'zod';
import { RecipeDifficultySchema, RecipeStatusSchema } from '../__generated__';
import { ToggleRecipeFavouriteInputSchema, ToggleRecipeFavouriteResponseSchema } from './recipe-favourite/schema';
import { ToggleRecipeUpvoteInputSchema, ToggleRecipeUpvoteResponseSchema } from './recipe-upvote/schema';
import {
  DeleteRecipeReviewInputSchema,
  DeleteRecipeReviewResponseSchema,
  GetRecipeReviewByIdInputSchema,
  GetRecipeReviewByIdResponseSchema,
  UpsertRecipeReviewInputSchema,
  UpsertRecipeReviewResponseSchema,
} from './recipe-review/schema';
import { ToggleRecipeReviewVoteInputSchema, ToggleRecipeReviewVoteResponseSchema } from './recipe-review-vote/schema';

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

  flagRecipeById: {
    method: 'POST',
    path: `${BASE_API_PATH}/recipe/flagRecipeById`,
    body: FlagRecipeByIdInputSchema,
    responses: {
      200: FlagRecipeByIdResponseSchema,
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
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
      recipe_ingredient_variants_id: z.array(z.string()).optional(),
      user_id: z.string().optional(),
      is_favourited: TrueOrFalseInputSchema.optional(),
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
    path: `${BASE_API_PATH}/recipe/getRecipeBySlug`,
    query: GetRecipeBySlugInputSchema,
    responses: {
      200: GetRecipeBySlugResponseSchema,
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get a recipe by slug',
  },

  toggleRecipeFavourite: {
    method: 'POST',
    path: `${BASE_API_PATH}/recipe/toggleRecipeFavourite`,
    body: ToggleRecipeFavouriteInputSchema,
    responses: {
      200: ToggleRecipeFavouriteResponseSchema,
      201: ToggleRecipeFavouriteResponseSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Toggle a recipe favourite',
  },

  toggleRecipeUpvote: {
    method: 'POST',
    path: `${BASE_API_PATH}/recipe/toggleRecipeUpvote`,
    body: ToggleRecipeUpvoteInputSchema,
    responses: {
      200: ToggleRecipeUpvoteResponseSchema,
      201: ToggleRecipeUpvoteResponseSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Toggle a recipe upvote',
  },

  upsertRecipeReview: {
    method: 'POST',
    path: `${BASE_API_PATH}/recipe/upsertRecipeReview`,
    body: UpsertRecipeReviewInputSchema,
    responses: {
      200: UpsertRecipeReviewResponseSchema,
      201: UpsertRecipeReviewResponseSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Upsert a recipe review',
  },

  getRecipeReviewById: {
    method: 'GET',
    path: `${BASE_API_PATH}/recipe/getRecipeReviewById`,
    query: GetRecipeReviewByIdInputSchema,
    responses: {
      200: GetRecipeReviewByIdResponseSchema,
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get a recipe review by id',
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

  toggleRecipeReviewVote: {
    method: 'POST',
    path: `${BASE_API_PATH}/recipe/toggleRecipeReviewVote`,
    body: ToggleRecipeReviewVoteInputSchema,
    responses: {
      200: ToggleRecipeReviewVoteResponseSchema,
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Toggle a recipe review vote',
  },
});
