import { z } from 'zod';
/**--------- Create Ingredient Variant images ---------------------- */

import { IngredientVariantImageSchema } from 'src/__generated__';
import { SuccessSchema } from 'src/lib/schema';

export const CreateIngredientVariantImageInputSchema = IngredientVariantImageSchema.pick({
  url: true,
  is_primary: true,
  ingredient_variant_id: true,
});
export type TCreateIngredientVariantImageInput = z.infer<typeof CreateIngredientVariantImageInputSchema>;

export const CreateIngredientVariantImageResponseSchema = SuccessSchema.extend({
  data: IngredientVariantImageSchema,
});

export type TCreateIngredientVariantImageResponse = z.infer<typeof CreateIngredientVariantImageResponseSchema>;

/**--------------Get All Images for Ingredient Variant --------- */

export const GetAllIngredientVariantImagesInputSchema = z.object({
  ingredient_variant_id: z.string(),
});

export type TGetAllIngredientVariantImagesInput = z.infer<typeof GetAllIngredientVariantImagesInputSchema>;

export const GetAllIngredientVariantImagesResponseSchema = SuccessSchema.extend({
  data: z.array(IngredientVariantImageSchema),
});

export type TGetAllIngredientVariantImagesResponse = z.infer<typeof GetAllIngredientVariantImagesResponseSchema>;

/** -------- Get One Ingredient Variant Image By ID -------- */
export const GetIngredientVariantImageByIdInputSchema = IngredientVariantImageSchema.pick({
  id: true,
});
export type TGetIngredientVariantImageByIdInput = z.infer<typeof GetIngredientVariantImageByIdInputSchema>;

export const GetIngredientVariantImageByIdResponseSchema = SuccessSchema.extend({
  data: IngredientVariantImageSchema,
});
export type TGetIngredientVariantImageByIdResponse = z.infer<typeof GetIngredientVariantImageByIdResponseSchema>;

/**----------Update Ingredient Variant Image ---------- */

export const UpdateIngredientVariantImageInputSchema = IngredientVariantImageSchema.pick({
  url: true,
  is_primary: true,
});

export type TUpdateIngredientVariantImageInput = z.infer<typeof UpdateIngredientVariantImageInputSchema>;

export const UpdateIngredientVariantImageResponseSchema = SuccessSchema.extend({
  data: IngredientVariantImageSchema,
});
export type TUpdateIngredientVariantImageResponse = z.infer<typeof UpdateIngredientVariantImageResponseSchema>;

/** -------- Delete Ingredient Variant Image -------- */
export const DeleteIngredientVariantImageInputSchema = IngredientVariantImageSchema.pick({
  id: true,
});
export type TDeleteIngredientVariantImageInput = z.infer<typeof DeleteIngredientVariantImageInputSchema>;

export const DeleteIngredientVariantImageResponseSchema = SuccessSchema.extend({
  data: IngredientVariantImageSchema,
});
export type TDeleteIngredientVariantImageResponse = z.infer<typeof DeleteIngredientVariantImageResponseSchema>;
