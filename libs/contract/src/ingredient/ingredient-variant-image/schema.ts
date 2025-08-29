import { z } from 'zod';
import { IngredientVariantImageSchema } from '../../__generated__';
import { PaginationOutputSchema, SuccessSchema } from '../../lib/schema';

/** -------- Create Ingredient Variant Image -------- */
export const CreateIngredientVariantImageInputSchema = IngredientVariantImageSchema.pick({
  ingredient_variant_id: true,
  is_primary: true,
  url: true,
});
export type TCreateIngredientVariantImageInput = z.infer<typeof CreateIngredientVariantImageInputSchema>;

export const CreateIngredientVariantImageOutputSchema = IngredientVariantImageSchema;
export type TCreateIngredientVariantImageOutput = z.infer<typeof CreateIngredientVariantImageOutputSchema>;

export const CreateIngredientVariantImageResponseSchema = SuccessSchema.extend({
  data: CreateIngredientVariantImageOutputSchema,
});
export type TCreateIngredientVariantImageResponse = z.infer<typeof CreateIngredientVariantImageResponseSchema>;

/** -------- Get Ingredient Variant Image By Id -------- */
export const GetIngredientVariantImageByIdInputSchema = IngredientVariantImageSchema.pick({
  id: true,
});
export type TGetIngredientVariantImageByIdInput = z.infer<typeof GetIngredientVariantImageByIdInputSchema>;

export const GetIngredientVariantImageByIdOutputSchema = IngredientVariantImageSchema;
export type TGetIngredientVariantImageByIdOutput = z.infer<typeof GetIngredientVariantImageByIdOutputSchema>;

export const GetIngredientVariantImageByIdResponseSchema = SuccessSchema.extend({
  data: GetIngredientVariantImageByIdOutputSchema,
});
export type TGetIngredientVariantImageByIdResponse = z.infer<typeof GetIngredientVariantImageByIdResponseSchema>;

/** -------- Get All Ingredient Variant Images -------- */
export const GetAllIngredientVariantImagesInputSchema = z.object({
  page: z.number(),
  perPage: z.number(),
});
export type TGetAllIngredientVariantImagesInput = z.infer<typeof GetAllIngredientVariantImagesInputSchema>;

export const GetAllIngredientVariantImagesOutputSchema = IngredientVariantImageSchema;
export type TGetAllIngredientVariantImagesOutput = z.infer<typeof GetAllIngredientVariantImagesOutputSchema>;

export const GetAllIngredientVariantImagesResponseSchema = SuccessSchema.extend({
  data: z.array(GetAllIngredientVariantImagesOutputSchema),
  pagination: PaginationOutputSchema,
});
export type TGetAllIngredientVariantImagesResponse = z.infer<typeof GetAllIngredientVariantImagesResponseSchema>;

/** -------- Update Ingredient Variant Image -------- */
export const UpdateIngredientVariantImageInputSchema = IngredientVariantImageSchema.pick({
  url: true,
  is_primary: true,
});
export type TUpdateIngredientVariantImageInput = z.infer<typeof UpdateIngredientVariantImageInputSchema>;

export const UpdateIngredientVariantImageOutputSchema = IngredientVariantImageSchema;
export type TUpdateIngredientVariantImageOutput = z.infer<typeof UpdateIngredientVariantImageOutputSchema>;

export const UpdateIngredientVariantImageResponseSchema = SuccessSchema.extend({
  data: UpdateIngredientVariantImageInputSchema,
});
export type TUpdateIngredientVariantImageResponse = z.infer<typeof UpdateIngredientVariantImageResponseSchema>;

/** -------- Delete Ingredient Variant Image -------- */
export const DeleteIngredientVariantImageInputSchema = IngredientVariantImageSchema.pick({
  id: true,
});
export type TDeleteIngredientVariantImageInput = z.infer<typeof DeleteIngredientVariantImageInputSchema>;

export const DeleteIngredientVariantImageOutputSchema = IngredientVariantImageSchema;
export type TDeleteIngredientVariantImageOutput = z.infer<typeof DeleteIngredientVariantImageOutputSchema>;

export const DeleteIngredientVariantImageResponseSchema = SuccessSchema.extend({
  data: DeleteIngredientVariantImageOutputSchema,
});
export type TDeleteIngredientVariantImageResponse = z.infer<typeof DeleteIngredientVariantImageResponseSchema>;
