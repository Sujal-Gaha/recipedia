import { z } from 'zod';
import { CreateIngredientVariantInputSchema } from './ingredient-variant/schema';
import { PaginationOutputSchema, SuccessSchema } from '../lib/schema';
import { IngredientSchema } from '../__generated__';

const IngredientWithVariantsAndImagesSchema = IngredientSchema.pick({
  name: true,
  image: true,
  category: true,
  description: true,
  calories: true,
  carbohydrates: true,
  fat: true,
  protein: true,
  sugar: true,
  fiber: true,
}).extend({
  ingredient_variants: z.array(
    CreateIngredientVariantInputSchema.pick({
      name: true,
      image: true,
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

export const GetIngredientByIdWithVariantsAndImagesOutputSchema = IngredientSchema.pick({
  id: true,
  category: true,
  created_at: true,
  image: true,
  name: true,
  slug: true,
  description: true,
  updated_at: true,
  calories: true,
  carbohydrates: true,
  fat: true,
  protein: true,
  fiber: true,
  sugar: true,
}).extend({
  ingredient_variants: z.array(
    CreateIngredientVariantInputSchema.pick({
      name: true,
      image: true,
    })
  ),
});
export type TGetIngredientByIdWithVariantsAndImagesOutput = z.infer<
  typeof GetIngredientByIdWithVariantsAndImagesOutputSchema
>;

export const GetIngredientByIdWithVariantsAndImagesResponseSchema = SuccessSchema.extend({
  data: GetIngredientByIdWithVariantsAndImagesOutputSchema,
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

export const GetAllIngredientsWithVariantsAndImagesOutputSchema = IngredientSchema.extend({
  ingredient_variants: z.array(CreateIngredientVariantInputSchema),
});
export type TGetAllIngredientsWithVariantsAndImagesOutput = z.infer<
  typeof GetAllIngredientsWithVariantsAndImagesOutputSchema
>;

export const GetAllIngredientsWithVariantsAndImagesResponseSchema = SuccessSchema.extend({
  data: z.array(GetAllIngredientsWithVariantsAndImagesOutputSchema),
  pagination: PaginationOutputSchema,
});
export type TGetAllIngredientsWithVariantsAndImagesResponse = z.infer<
  typeof GetAllIngredientsWithVariantsAndImagesResponseSchema
>;
