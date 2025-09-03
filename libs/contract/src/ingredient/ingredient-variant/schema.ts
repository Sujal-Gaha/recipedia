import { z } from 'zod';
import { IngredientVariantSchema } from '../../__generated__';
import { PaginationOutputSchema, SuccessSchema } from '../../lib/schema';

/** -------- Create Ingredient Variant -------- */
export const CreateIngredientVariantInputSchema = IngredientVariantSchema.pick({
  ingredient_id: true,
  name: true,
  image: true,
});
export type TCreateIngredientVariantInput = z.infer<typeof CreateIngredientVariantInputSchema>;

export const CreateIngredientVariantOutputSchema = IngredientVariantSchema;
export type TCreateIngredientVariantOutput = z.infer<typeof CreateIngredientVariantOutputSchema>;

export const CreateIngredientVariantResponseSchema = SuccessSchema.extend({
  data: CreateIngredientVariantOutputSchema,
});
export type TCreateIngredientVariantResponse = z.infer<typeof CreateIngredientVariantResponseSchema>;

/** -------- Create Many Ingredient Variant -------- */
export const CreateManyIngredientVariantsInputSchema = z.array(
  IngredientVariantSchema.pick({
    ingredient_id: true,
    name: true,
    image: true,
  })
);
export type TCreateManyIngredientVariantsInput = z.infer<typeof CreateManyIngredientVariantsInputSchema>;

export const CreateManyIngredientVariantsOutputSchema = z.array(IngredientVariantSchema);
export type TCreateManyIngredientVariantsOutput = z.infer<typeof CreateManyIngredientVariantsOutputSchema>;

export const CreateManyIngredientVariantsResponseSchema = SuccessSchema.extend({
  data: CreateManyIngredientVariantsOutputSchema,
});
export type TCreateManyIngredientVariantsResponse = z.infer<typeof CreateManyIngredientVariantsResponseSchema>;

/** -------- Get Ingredient Variant By Id -------- */
export const GetIngredientVariantByIdInputSchema = IngredientVariantSchema.pick({
  id: true,
});
export type TGetIngredientVariantByIdInput = z.infer<typeof GetIngredientVariantByIdInputSchema>;

export const GetIngredientVariantByIdOutputSchema = IngredientVariantSchema;
export type TGetIngredientVariantByIdOutput = z.infer<typeof GetIngredientVariantByIdOutputSchema>;

export const GetIngredientVariantByIdResponseSchema = SuccessSchema.extend({
  data: GetIngredientVariantByIdOutputSchema,
});
export type TGetIngredientVariantByIdResponse = z.infer<typeof GetIngredientVariantByIdResponseSchema>;

/** -------- Get All Ingredient Variants -------- */
export const GetAllIngredientVariantsInputSchema = z.object({
  page: z.number(),
  perPage: z.number(),
  ingredient_id: z.string().optional(),
});
export type TGetAllIngredientVariantsInput = z.infer<typeof GetAllIngredientVariantsInputSchema>;

export const GetAllIngredientVariantsOutputSchema = IngredientVariantSchema;
export type TGetAllIngredientVariantsOutput = z.infer<typeof GetAllIngredientVariantsOutputSchema>;

export const GetAllIngredientVariantsResponseSchema = SuccessSchema.extend({
  data: z.array(GetAllIngredientVariantsOutputSchema),
  pagination: PaginationOutputSchema,
});
export type TGetAllIngredientVariantsResponse = z.infer<typeof GetAllIngredientVariantsResponseSchema>;

/** -------- Update Ingredient Variant -------- */
export const UpdateIngredientVariantInputSchema = IngredientVariantSchema.pick({
  name: true,
});
export type TUpdateIngredientVariantInput = z.infer<typeof UpdateIngredientVariantInputSchema>;

export const UpdateIngredientVariantOutputSchema = IngredientVariantSchema;
export type TUpdateIngredientVariantOutput = z.infer<typeof UpdateIngredientVariantOutputSchema>;

export const UpdateIngredientVariantResponseSchema = SuccessSchema.extend({
  data: UpdateIngredientVariantInputSchema,
});
export type TUpdateIngredientVariantResponse = z.infer<typeof UpdateIngredientVariantResponseSchema>;

/** -------- Delete Ingredient Variant -------- */
export const DeleteIngredientVariantInputSchema = IngredientVariantSchema.pick({
  id: true,
});
export type TDeleteIngredientVariantInput = z.infer<typeof DeleteIngredientVariantInputSchema>;

export const DeleteIngredientVariantOutputSchema = IngredientVariantSchema;
export type TDeleteIngredientVariantOutput = z.infer<typeof DeleteIngredientVariantOutputSchema>;

export const DeleteIngredientVariantResponseSchema = SuccessSchema.extend({
  data: DeleteIngredientVariantOutputSchema,
});
export type TDeleteIngredientVariantResponse = z.infer<typeof DeleteIngredientVariantResponseSchema>;
