import { z } from 'zod';
import { IngredientSchema } from '../../__generated__';
import { PaginationOutputSchema, SuccessSchema } from '../../lib/schema';

/** -------- Create Ingredient -------- */
export const CreateIngredientInputSchema = IngredientSchema.pick({
  name: true,
  image: true,
  category: true,
  description: true,
  calories: true,
  carbohydrates: true,
  fat: true,
  protein: true,
  fiber: true,
  sugar: true,
});
export type TCreateIngredientInput = z.infer<typeof CreateIngredientInputSchema>;

export const CreateIngredientOutputSchema = IngredientSchema;
export type TCreateIngredientOutput = z.infer<typeof CreateIngredientOutputSchema>;

export const CreateIngredientResponseSchema = SuccessSchema.extend({
  data: CreateIngredientOutputSchema,
});
export type TCreateIngredientResponse = z.infer<typeof CreateIngredientResponseSchema>;

/** -------- Get Ingredient By Id -------- */
export const GetIngredientByIdInputSchema = IngredientSchema.pick({
  id: true,
});
export type TGetIngredientByIdInput = z.infer<typeof GetIngredientByIdInputSchema>;

export const GetIngredientByIdOutputSchema = IngredientSchema;
export type TGetIngredientByIdOutput = z.infer<typeof GetIngredientByIdOutputSchema>;

export const GetIngredientByIdResponseSchema = SuccessSchema.extend({
  data: GetIngredientByIdOutputSchema,
});
export type TGetIngredientByIdResponse = z.infer<typeof GetIngredientByIdResponseSchema>;

/** -------- Get Ingredient By Slug -------- */
export const GetIngredientBySlugInputSchema = IngredientSchema.pick({
  slug: true,
});
export type TGetIngredientBySlugInput = z.infer<typeof GetIngredientBySlugInputSchema>;

export const GetIngredientBySlugOutputSchema = IngredientSchema;
export type TGetIngredientBySlugOutput = z.infer<typeof GetIngredientBySlugOutputSchema>;

export const GetIngredientBySlugResponseSchema = SuccessSchema.extend({
  data: GetIngredientBySlugOutputSchema,
});
export type TGetIngredientBySlugResponse = z.infer<typeof GetIngredientBySlugResponseSchema>;

/** -------- Get All Ingredients -------- */
export const GetAllIngredientsInputSchema = z.object({
  page: z.number(),
  perPage: z.number(),
});
export type TGetAllIngredientsInput = z.infer<typeof GetAllIngredientsInputSchema>;

export const GetAllIngredientsOutputSchema = IngredientSchema;
export type TGetAllIngredientsOutput = z.infer<typeof GetAllIngredientsOutputSchema>;

export const GetAllIngredientsResponseSchema = SuccessSchema.extend({
  data: z.array(GetAllIngredientsOutputSchema),
  pagination: PaginationOutputSchema,
});
export type TGetAllIngredientsResponse = z.infer<typeof GetAllIngredientsResponseSchema>;

/** -------- Update Ingredient -------- */
export const UpdateIngredientInputSchema = IngredientSchema.pick({
  image: true,
  name: true,
  slug: true,
});
export type TUpdateIngredientInput = z.infer<typeof UpdateIngredientInputSchema>;

export const UpdateIngredientOutputSchema = IngredientSchema;
export type TUpdateIngredientOutput = z.infer<typeof UpdateIngredientOutputSchema>;

export const UpdateIngredientResponseSchema = SuccessSchema.extend({
  data: UpdateIngredientInputSchema,
});
export type TUpdateIngredientResponse = z.infer<typeof UpdateIngredientResponseSchema>;

/** -------- Delete Ingredient -------- */
export const DeleteIngredientInputSchema = IngredientSchema.pick({
  id: true,
});
export type TDeleteIngredientInput = z.infer<typeof DeleteIngredientInputSchema>;

export const DeleteIngredientOutputSchema = IngredientSchema;
export type TDeleteIngredientOutput = z.infer<typeof DeleteIngredientOutputSchema>;

export const DeleteIngredientResponseSchema = SuccessSchema.extend({
  data: DeleteIngredientOutputSchema,
});
export type TDeleteIngredientResponse = z.infer<typeof DeleteIngredientResponseSchema>;
