import { z } from 'zod';
import {
  RecipeDifficultySchema,
  RecipeImageSchema,
  RecipeReviewSchema,
  RecipeSchema,
  RecipeStatusSchema,
  RecipeStepSchema,
  UserSchema,
} from '../__generated__';
import { SuccessSchema, TrueOrFalseInputSchema } from '../lib/schema';

/** -------- Create Recipe -------- */
export const CreateRecipeInputSchema = RecipeSchema.pick({
  user_id: true,
  title: true,
  description: true,
  preparation_time: true,
  cook_time: true,
  difficulty: true,
  status: true,
});
export type TCreateRecipeInput = z.infer<typeof CreateRecipeInputSchema>;

export const CreateRecipeResponseSchema = SuccessSchema.extend({
  data: RecipeSchema,
});
export type TCreateRecipeResponse = z.infer<typeof CreateRecipeResponseSchema>;

/** -------- Get Recipe By Slug -------- */
export const GetRecipeBySlugInputSchema = RecipeSchema.pick({
  slug: true,
});
export type TGetRecipeBySlugInput = z.infer<typeof GetRecipeBySlugInputSchema>;

export const GetRecipeBySlugResponseSchema = SuccessSchema.extend({
  data: RecipeSchema,
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
});
export type TGetAllRecipesInput = z.infer<typeof GetAllRecipesInputSchema>;

export const GetAllRecipesOutputSchema = RecipeSchema.extend({
  user: UserSchema.pick({
    id: true,
    name: true,
    email: true,
    role: true,
    image: true,
    emailVerified: true,
  }),
  recipe_images: z.array(RecipeImageSchema),
  recipe_upvotes: z.object({
    total_votes: z.number(),
  }),
  recipe_review: z.object({
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
  recipe_steps: z.array(RecipeStepSchema),
});
export type TGetAllRecipesOutput = z.infer<typeof GetAllRecipesOutputSchema>;

export const GetAllRecipesResponseSchema = SuccessSchema.extend({
  data: z.array(GetAllRecipesOutputSchema),
  pagination: z.object({
    page: z.number(),
    perPage: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
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
