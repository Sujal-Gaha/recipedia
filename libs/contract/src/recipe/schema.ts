import { z } from 'zod';
import {
  RecipeDifficultySchema,
  RecipeFavouriteSchema,
  RecipeImageSchema,
  RecipeIngredientSchema,
  RecipeReviewSchema,
  RecipeSchema,
  RecipeStatusSchema,
  RecipeStepSchema,
  RecipeUpvoteSchema,
} from '../__generated__';
import { SuccessSchema, TrueOrFalseInputSchema } from '../lib/schema';

export const RecipeWithAllFieldsInputSchema = RecipeSchema.extend({
  ingredients: z.array(RecipeIngredientSchema),
  images: z.array(RecipeImageSchema),
  upvotes: z.array(RecipeUpvoteSchema),
  favourites: z.array(RecipeFavouriteSchema),
  reviews: z.array(RecipeReviewSchema),
  steps: z.array(RecipeStepSchema),
});
export type TRecipeWithAllFieldsInput = z.infer<typeof RecipeWithAllFieldsInputSchema>;

/** -------- Create Recipe With All Fields -------- */
export const CreateRecipeWithAllFieldsInputSchema = RecipeWithAllFieldsInputSchema.pick({
  cook_time: true,
  description: true,
  difficulty: true,
  preparation_time: true,
  title: true,
  user_id: true,
  ingredients: true,
})
  .extend({
    images: z.array(
      RecipeImageSchema.pick({
        is_primary: true,
        url: true,
      })
    ),
  })
  .extend({
    steps: z.array(
      RecipeStepSchema.pick({
        content: true,
        step_no: true,
      })
    ),
  })
  .extend({
    ingredients: z.array(
      RecipeIngredientSchema.pick({
        quantity: true,
        unit: true,
        note: true,
        ingredient_variant_id: true,
      })
    ),
  });
export type TCreateRecipeWithAllFieldsInput = z.infer<typeof CreateRecipeWithAllFieldsInputSchema>;

export const CreateRecipeWithAllFieldsOutputSchema = RecipeWithAllFieldsInputSchema.pick({
  id: true,
  cook_time: true,
  description: true,
  difficulty: true,
  preparation_time: true,
  title: true,
  user_id: true,
  ingredients: true,
  images: true,
  steps: true,
  slug: true,
  created_at: true,
  updated_at: true,
});
export type TCreateRecipeWithAllFieldsOutput = z.infer<typeof CreateRecipeWithAllFieldsOutputSchema>;

export const CreateRecipeWithAllFieldsResponseSchema = SuccessSchema.extend({
  data: CreateRecipeWithAllFieldsOutputSchema,
});
export type TCreateRecipeWithAllFieldsResponse = z.infer<typeof CreateRecipeWithAllFieldsResponseSchema>;

/** -------- Get All Recipes With All Fields -------- */
export const GetAllRecipesWithAllFieldsInputSchema = z.object({
  page: z.string(),
  perPage: z.string(),
  preparation_time: z.string().optional(),
  cook_time: z.string().optional(),
  difficulty: RecipeDifficultySchema.optional(),
  status: RecipeStatusSchema.optional(),
  is_flagged: TrueOrFalseInputSchema.optional(),
  global_filter: z.string().optional(),
  recipe_ingredients_ids: z.array(z.string()).optional(),
});
export type TGetAllRecipesWithAllFieldsInput = z.infer<typeof GetAllRecipesWithAllFieldsInputSchema>;

export const GetAllRecipesWithAllFieldsResponseSchema = SuccessSchema.extend({
  data: z.array(RecipeWithAllFieldsInputSchema),
});
export type TGetAllRecipesWithAllFiledsResponse = z.infer<typeof GetAllRecipesWithAllFieldsResponseSchema>;

/** -------- Get Recipe By Slug With All Fields -------- */
export const GetRecipeBySlugWithAllFieldsResponseSchema = SuccessSchema.extend({
  data: RecipeWithAllFieldsInputSchema,
});
export type TGetRecipeBySlugWithAllFieldsResponse = z.infer<typeof GetRecipeBySlugWithAllFieldsResponseSchema>;
