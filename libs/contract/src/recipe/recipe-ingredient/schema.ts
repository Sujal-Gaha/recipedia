import { z } from 'zod';
import { RecipeIngredientSchema } from '../../__generated__';
import { PaginationOutputSchema, SuccessSchema } from '../../lib/schema';

/** -------- Create Recipe Ingredient -------- */
export const CreateRecipeIngredientInputSchema = RecipeIngredientSchema.pick({
  ingredient_variant_id: true,
  note: true,
  quantity: true,
  recipe_id: true,
  unit: true,
});
export type TCreateRecipeIngredientInput = z.infer<typeof CreateRecipeIngredientInputSchema>;

export const CreateRecipeIngredientResponseSchema = SuccessSchema.extend({
  data: RecipeIngredientSchema,
});
export type TCreateRecipeIngredientResponse = z.infer<typeof CreateRecipeIngredientResponseSchema>;

/** -------- Create Many Recipe Ingredients -------- */
export const CreateManyRecipeIngredientsInputSchema = z.array(CreateRecipeIngredientInputSchema);
export type TCreateManyRecipeIngredientsInput = z.infer<typeof CreateManyRecipeIngredientsInputSchema>;

export const CreateManyRecipeIngredientsResponseSchema = SuccessSchema.extend({
  data: z.array(RecipeIngredientSchema),
});
export type TCreateManyRecipeIngredientsResponse = z.infer<typeof CreateManyRecipeIngredientsResponseSchema>;

/** -------- Get Recipe Ingredient By Id -------- */
export const GetRecipeIngredientByIdInputSchema = RecipeIngredientSchema.pick({
  id: true,
});
export type TGetRecipeIngredientByIdInput = z.infer<typeof GetRecipeIngredientByIdInputSchema>;

export const GetRecipeIngredientByIdResponseSchema = SuccessSchema.extend({
  data: RecipeIngredientSchema,
});
export type TGetRecipeIngredientByIdResponse = z.infer<typeof GetRecipeIngredientByIdResponseSchema>;

/** -------- Get All Recipe Ingredients -------- */
export const GetAllRecipeIngredientsInputSchema = z.object({
  recipe_id: z.string().optional(),
});
export type TGetAllRecipeIngredientsInput = z.infer<typeof GetAllRecipeIngredientsInputSchema>;

export const GetAllRecipeIngredientsResponseSchema = SuccessSchema.extend({
  data: z.array(RecipeIngredientSchema),
  pagination: PaginationOutputSchema,
});
export type TGetAllRecipeIngredientsResponse = z.infer<typeof GetAllRecipeIngredientsResponseSchema>;

/** -------- Delete Recipe Ingredient -------- */
export const DeleteRecipeIngredientInputSchema = RecipeIngredientSchema.pick({
  id: true,
});
export type TDeleteRecipeIngredientInput = z.infer<typeof DeleteRecipeIngredientInputSchema>;

export const DeleteRecipeIngredientResponseSchema = SuccessSchema.extend({
  data: RecipeIngredientSchema,
});
export type TDeleteRecipeIngredientResponse = z.infer<typeof DeleteRecipeIngredientResponseSchema>;
