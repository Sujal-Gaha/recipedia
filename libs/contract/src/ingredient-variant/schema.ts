import { z } from 'zod';

import { IngredientVariantImageSchema, IngredientVariantSchema } from '../__generated__';
import { SuccessSchema } from '../lib/schema';

/**------Create Ingredient Variant---------- */

export const CreateIngredientVariantInputSchema = IngredientVariantSchema.pick({
  name: true,
  ingredient_id: true,
});
export type TCreateIngredientVariantInput = z.infer<typeof CreateIngredientVariantInputSchema>;

export const CreateIngredientVariantResponseSchema = SuccessSchema.extend({
  data: IngredientVariantSchema,
});
export type TCreateIngredientVariantResponse = z.infer<typeof CreateIngredientVariantResponseSchema>;

/***------------Get Ingredient Variant By Id--------- */
export const GetIngredientVariantByIdInputSchema = IngredientVariantSchema.pick({
  id: true,
});

export type TGetIngredientVariantByIdInput = z.infer<typeof GetIngredientVariantByIdInputSchema>;

export const GetIngredientVariantByIdResponseSchema = SuccessSchema.extend({
  data: IngredientVariantSchema.extend({
    images: z.array(IngredientVariantImageSchema),
  }),
});

export type TGetIngredientVariantByIdResponse = z.infer<typeof GetIngredientVariantByIdResponseSchema>;

/***-------Get All Ingredient Variant--------- */
export const GetAllIngredientVariantInputSchema = z.object({
  page: z.number(),
  perPage: z.number(),
  ingredient_id: z.string().optional(),
});
export type TGetAllIngredientVariantInput = z.infer<typeof GetAllIngredientVariantInputSchema>;

export const GetAllIngredientVariantsOutputSchema = IngredientVariantSchema.extend({
  images: z.array(IngredientVariantImageSchema),
});

export type TGetAllIngredientVariantOutput = z.infer<typeof GetAllIngredientVariantsOutputSchema>;

export const GetAllIngredientVariantResponseSchema = SuccessSchema.extend({
  data: z.array(GetAllIngredientVariantsOutputSchema),
  pagination: z.object({
    page: z.number(),
    perPage: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});

export type TGetAllIngredientVariantsResponse = z.infer<typeof GetAllIngredientVariantResponseSchema>;

/** -------- Update Ingredient Variant -------- */

export const UpdateIngredientVariantInputSchema = IngredientVariantSchema.pick({
  name: true,
  ingredient_id: true,
});

export type TUpdateIngredientVariantInput = z.infer<typeof UpdateIngredientVariantInputSchema>;

export const UpdateIngredientVariantResponseSchema = SuccessSchema.extend({
  data: IngredientVariantSchema,
});

export type TUpdateIngredientVariantResponse = z.infer<typeof UpdateIngredientVariantResponseSchema>;

/** -------- Delete Ingredient Variant -------- */
export const DeleteIngredientVariantInputSchema = IngredientVariantSchema.pick({
  id: true,
});
export type TDeleteIngredientVariantInput = z.infer<typeof DeleteIngredientVariantInputSchema>;

export const DeleteIngredientVariantResponseSchema = SuccessSchema.extend({
  data: IngredientVariantSchema,
});
export type TDeleteIngredientVariantResponse = z.infer<typeof DeleteIngredientVariantResponseSchema>;
