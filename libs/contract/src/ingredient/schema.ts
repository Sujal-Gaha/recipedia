import { z } from 'zod';
import { CreateIngredientInputSchema } from './ingredient/schema';
import { CreateIngredientVariantInputSchema } from './ingredient-variant/schema';
import { CreateIngredientVariantImageInputSchema } from './ingredient-variant-image/schema';
import { PaginationOutputSchema, SuccessSchema } from '../lib/schema';
import { IngredientSchema } from '../__generated__';

const IngredientWithVariantsAndImagesSchema = CreateIngredientInputSchema.extend({
  ingredient_variants: z.array(
    CreateIngredientVariantInputSchema.pick({
      name: true,
    }).extend({
      ingredient_variant_images: z.array(
        CreateIngredientVariantImageInputSchema.pick({
          is_primary: true,
          url: true,
        })
      ),
    })
  ),
});
export type TIngredientWithVariantsAndImages = z.infer<typeof IngredientWithVariantsAndImagesSchema>;

/** -------- Create Ingredient With Variants And Variant Images -------- */
export const CreateIngredientWithVariantsAndImagesInputSchema = IngredientWithVariantsAndImagesSchema;
export type TCreateIngredientWithVariantsAndImagesInput = z.infer<
  typeof CreateIngredientWithVariantsAndImagesInputSchema
>;

export const CreateIngredientWithVariantsAndImagesResponseSchema = SuccessSchema.extend({
  data: IngredientWithVariantsAndImagesSchema,
});
export type TCreateIngredientWithVariantsAndImagesResponse = z.infer<
  typeof CreateIngredientWithVariantsAndImagesResponseSchema
>;

/** -------- Get Ingredient By Id -------- */
export const GetIngredientByIdWithVariantsAndImagesInputSchema = IngredientSchema.pick({
  id: true,
});
export type TGetIngredientByIdWithVariantsAndImagesInput = z.infer<
  typeof GetIngredientByIdWithVariantsAndImagesInputSchema
>;

export const GetIngredientByIdWithVariantsAndImagesResponseSchema = SuccessSchema.extend({
  data: IngredientWithVariantsAndImagesSchema,
});
export type TGetIngredientByIdWithVariantsAndImagesResponse = z.infer<
  typeof GetIngredientByIdWithVariantsAndImagesResponseSchema
>;

/** -------- Get All Ingredients -------- */
export const GetAllIngredientsWithVariantsAndImagesInputSchema = z.object({
  page: z.string(),
  perPage: z.string(),
  global_filter: z.string().optional(),
});
export type TGetAllIngredientsWithVariantsAndImagesInput = z.infer<
  typeof GetAllIngredientsWithVariantsAndImagesInputSchema
>;

export const GetAllIngredientsWithVariantsAndImagesResponseSchema = SuccessSchema.extend({
  data: z.array(IngredientWithVariantsAndImagesSchema),
  pagination: PaginationOutputSchema,
});
export type TGetAllIngredientsWithVariantsAndImagesResponse = z.infer<
  typeof GetAllIngredientsWithVariantsAndImagesResponseSchema
>;
