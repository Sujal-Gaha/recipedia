import { z } from 'zod';
/***----------Create Ingredient ----------- */

import { SuccessSchema } from '../lib/schema';
import { IngredientSchema, IngredientVariantSchema } from '../__generated__';

export const CreateIngredientInputSchema = IngredientSchema.pick({
  name: true,
  slug: true,
  image: true,
});

export type TCreateIngredientInput = z.infer<typeof CreateIngredientInputSchema>;

export const CreateIngredientResponseSchema = SuccessSchema.extend({
  data: IngredientSchema,
});

export type TCreateIngredientResponse = z.infer<typeof CreateIngredientResponseSchema>;

/******----------Get Ingredient By slug ---------****** */

export const GetIngredientBySlugInputSchema = IngredientSchema.pick({ slug: true });

export type TGetIngredientSlugInput = z.infer<typeof GetIngredientBySlugInputSchema>;

export const GetIngredientBySlugResponseSchema = SuccessSchema.extend({
  data: IngredientSchema.extend({
    variants: z.array(IngredientVariantSchema),
  }),
});

export type TGetIngredientBySlugResponse = z.infer<typeof GetIngredientBySlugResponseSchema>;

/***---------Get All Ingredient --------- */
export const GetAllIngredientsInputSchema = z.object({
  page: z.number(),
  perPage: z.number(),
  name: z.string().optional(),
});

export type TGetAllIngredientsInput = z.infer<typeof GetAllIngredientsInputSchema>;

export const GetAllIngredientsOutputSchema = IngredientSchema.extend({
  variants: z.array(IngredientVariantSchema),
});

export type TGetAllIngredientsOutput = z.infer<typeof GetAllIngredientsOutputSchema>;

export const GetAllIngredientResponseSchema = SuccessSchema.extend({
  data: z.array(GetAllIngredientsOutputSchema),
  pagination: z.object({
    page: z.number(),
    perPage: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});

export type TGetAllIngredientsResponse = z.infer<typeof GetAllIngredientResponseSchema>;

/**--------Update Ingredient ------- */
export const UpdateIngredientInputSchema = IngredientSchema.pick({ name: true, slug: true, image: true });
export type TUpdateIngredientInput = z.infer<typeof UpdateIngredientInputSchema>;

export const UpdateIngredientResponseSchema = SuccessSchema.extend({
  data: IngredientSchema,
});

export type TUpdateIngredientResponse = z.infer<typeof UpdateIngredientResponseSchema>;

/****---------Delete Ingredient ------- */

export const DeleteIngredientInputSchema = IngredientSchema.pick({
  id: true,
});

export type TDeleteIngredientInput = z.infer<typeof DeleteIngredientInputSchema>;
export const DeleteIngredientResponseSchema = SuccessSchema.extend({
  data: IngredientSchema,
});

export type TDeleteIngredientResponse = z.infer<typeof DeleteIngredientResponseSchema>;
