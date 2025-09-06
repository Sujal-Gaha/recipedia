import { z } from 'zod';
import {
  IngredientSchema,
  IngredientVariantSchema,
  RecipeDifficultySchema,
  RecipeImageSchema,
  RecipeIngredientSchema,
  RecipeReviewSchema,
  RecipeReviewVoteSchema,
  RecipeSchema,
  RecipeStatusSchema,
  RecipeStepSchema,
  RecipeTipSchema,
  UserSchema,
} from '../../__generated__';
import { PaginationOutputSchema, SuccessSchema, TrueOrFalseInputSchema } from '../../lib/schema';

/** -------- Create Recipe -------- */
export const CreateRecipeInputSchema = RecipeSchema.pick({
  user_id: true,
  title: true,
  description: true,
  preparation_time: true,
  cook_time: true,
  difficulty: true,
});
export type TCreateRecipeInput = z.infer<typeof CreateRecipeInputSchema>;

export const CreateRecipeResponseSchema = SuccessSchema.extend({
  data: RecipeSchema,
});
export type TCreateRecipeResponse = z.infer<typeof CreateRecipeResponseSchema>;

/** -------- Get Recipe By Slug -------- */
export const GetRecipeBySlugInputSchema = RecipeSchema.pick({
  slug: true,
}).extend({
  user_id: z.string(),
});
export type TGetRecipeBySlugInput = z.infer<typeof GetRecipeBySlugInputSchema>;

export const GetRecipeBySlugOutputSchema = RecipeSchema.extend({
  user: UserSchema.pick({
    id: true,
    name: true,
    email: true,
    user_type: true,
    image: true,
    is_email_verified: true,
  }),
  ingredients: z.array(
    RecipeIngredientSchema.extend({
      ingredient_variant: IngredientVariantSchema.pick({
        image: true,
        name: true,
      }).extend({
        ingredient: IngredientSchema.pick({
          calories: true,
          carbohydrates: true,
          fat: true,
          fiber: true,
          protein: true,
          sugar: true,
        }),
      }),
    })
  ),
  images: z.array(RecipeImageSchema),
  upvotes: z.object({
    total_votes: z.number(),
  }),
  favourites: z.object({
    total_favourites: z.number(),
  }),
  review: z.object({
    average_rating: z.number(),
    total_reviews: z.number(),
    total_ratings: z.number(),
    reviews: z.array(
      RecipeReviewSchema.pick({
        id: true,
        comment: true,
        created_at: true,
        rating: true,
        updated_at: true,
      }).extend({
        total_votes: z.number(),
        total_upvotes: z.number(),
        total_downvotes: z.number(),
        is_upvoted: z.boolean(),
        is_downvoted: z.boolean(),
        user: UserSchema.pick({
          id: true,
          name: true,
          email: true,
          user_type: true,
          image: true,
          is_email_verified: true,
        }),
        votes: z.array(RecipeReviewVoteSchema),
      })
    ),
  }),
  user_favourite_id: z.string().nullable(),
  user_upvote_id: z.string().nullable(),
  steps: z.array(RecipeStepSchema),
  tips: z.array(RecipeTipSchema),
  is_favourited: z.boolean(),
  is_upvoted: z.boolean(),
});
export type TGetRecipeBySlugOutput = z.infer<typeof GetRecipeBySlugOutputSchema>;

export const GetRecipeBySlugResponseSchema = SuccessSchema.extend({
  data: GetRecipeBySlugOutputSchema,
});
export type TGetRecipeBySlugResponse = z.infer<typeof GetRecipeBySlugResponseSchema>;

/** -------- Get All Recipes -------- */
export const GetAllRecipesInputSchema = z.object({
  page: z.number(),
  perPage: z.number(),
  preparation_time: z.number().optional(),
  cook_time: z.number().optional(),
  difficulty: RecipeDifficultySchema.optional(),
  status: RecipeStatusSchema.optional(),
  is_flagged: TrueOrFalseInputSchema.optional(),
  global_filter: z.string().optional(),
  recipe_ingredients_ids: z.array(z.string()).optional(),
  user_id: z.string().optional(),
});
export type TGetAllRecipesInput = z.infer<typeof GetAllRecipesInputSchema>;

export const GetAllRecipesOutputSchema = RecipeSchema.extend({
  user: UserSchema.pick({
    id: true,
    name: true,
    email: true,
    user_type: true,
    image: true,
    is_email_verified: true,
  }),
  ingredients: z.array(RecipeIngredientSchema),
  images: z.array(RecipeImageSchema),
  upvotes: z.object({
    total_votes: z.number(),
  }),
  favourites: z.object({
    total_favourites: z.number(),
  }),
  review: z.object({
    average_rating: z.number(),
    total_reviews: z.number(),
    total_ratings: z.number(),
    reviews: z.array(
      RecipeReviewSchema.pick({
        id: true,
        comment: true,
        created_at: true,
        rating: true,
        updated_at: true,
      }).extend({
        total_votes: z.number(),
      })
    ),
  }),
  steps: z.array(RecipeStepSchema),
  is_favourited: z.boolean(),
  is_upvoted: z.boolean(),
  user_favourite_id: z.string().nullable(),
  user_upvote_id: z.string().nullable(),
});
export type TGetAllRecipesOutput = z.infer<typeof GetAllRecipesOutputSchema>;

export const GetAllRecipesResponseSchema = SuccessSchema.extend({
  data: z.array(GetAllRecipesOutputSchema),
  pagination: PaginationOutputSchema,
});
export type TGetAllRecipesResponse = z.infer<typeof GetAllRecipesResponseSchema>;

/** -------- Update a Recipe -------- */
export const UpdateRecipeInputSchema = RecipeSchema.pick({
  title: true,
  description: true,
  preparation_time: true,
  cook_time: true,
  difficulty: true,
  status: true,
  is_flagged: true,
});
export type TUpdateRecipeInput = z.infer<typeof UpdateRecipeInputSchema>;

export const UpdateRecipeResponseSchema = SuccessSchema.extend({
  data: RecipeSchema,
});
export type TUpdateRecipeResponse = z.infer<typeof UpdateRecipeResponseSchema>;

/** -------- Delete a Recipe -------- */
export const DeleteRecipeInputSchema = RecipeSchema.pick({
  id: true,
});
export type TDeleteRecipeInput = z.infer<typeof DeleteRecipeInputSchema>;

export const DeleteRecipeResponseSchema = SuccessSchema.extend({
  data: RecipeSchema,
});
export type TDeleteRecipeResponse = z.infer<typeof DeleteRecipeResponseSchema>;
