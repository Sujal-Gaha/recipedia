import { RecipeImageSchema } from '../../__generated__';
import { PaginationOutputSchema, SuccessSchema } from '../../lib/schema';
import z from 'zod';

/** -------- Create Recipe Image -------- */
export const CreateRecipeImageInputSchema = RecipeImageSchema.pick({
  recipe_id: true,
  is_primary: true,
  url: true,
});
export type TCreateRecipeImageInput = z.infer<typeof CreateRecipeImageInputSchema>;

export const CreateRecipeImageResponseSchema = SuccessSchema.extend({
  data: RecipeImageSchema,
});
export type TCreateRecipeImageResponse = z.infer<typeof CreateRecipeImageResponseSchema>;

/** -------- Create Many Recipe Images -------- */
export const CreateManyRecipeImagesInputSchema = z.array(
  RecipeImageSchema.pick({
    recipe_id: true,
    is_primary: true,
    url: true,
  })
);
export type TCreateManyRecipeImagesInput = z.infer<typeof CreateManyRecipeImagesInputSchema>;

export const CreateManyRecipeImagesResponseSchema = SuccessSchema.extend({
  data: z.array(RecipeImageSchema),
});
export type TCreateManyRecipeImagesResponse = z.infer<typeof CreateManyRecipeImagesResponseSchema>;

/** -------- Get Recipe Image By Id -------- */
export const GetRecipeImageByIdInputSchema = RecipeImageSchema.pick({
  id: true,
});
export type TGetRecipeImageByIdInput = z.infer<typeof GetRecipeImageByIdInputSchema>;

export const GetRecipeImageByIdResponseSchema = SuccessSchema.extend({
  data: RecipeImageSchema,
});
export type TGetRecipeImageByIdResponse = z.infer<typeof GetRecipeImageByIdResponseSchema>;

/** -------- Get All Recipe Images -------- */
export const GetAllRecipeImagesInputSchema = RecipeImageSchema.pick({
  recipe_id: true,
});
export type TGetAllRecipeImagesInput = z.infer<typeof GetAllRecipeImagesInputSchema>;

export const GetAllRecipeImagesOutputSchema = RecipeImageSchema;

export type TGetAllRecipeImagesOutput = z.infer<typeof GetAllRecipeImagesOutputSchema>;

export const GetAllRecipeImagesResponseSchema = SuccessSchema.extend({
  data: z.array(GetAllRecipeImagesOutputSchema),
  pagination: PaginationOutputSchema,
});
export type TGetAllRecipeImagesResponse = z.infer<typeof GetAllRecipeImagesResponseSchema>;

/** -------- Delete Recipe Image -------- */
export const DeleteRecipeImageInputSchema = RecipeImageSchema.pick({
  id: true,
});
export type TDeleteRecipeImageInput = z.infer<typeof DeleteRecipeImageInputSchema>;

export const DeleteRecipeImageResponseSchema = SuccessSchema.extend({
  data: RecipeImageSchema,
});
export type TDeleteRecipeImageResponse = z.infer<typeof DeleteRecipeImageResponseSchema>;

/** -------- Delete Many Recipe Images -------- */
export const DeleteManyRecipeImagesInputSchema = RecipeImageSchema.pick({
  recipe_id: true,
});
export type TDeleteManyRecipeImagesInput = z.infer<typeof DeleteManyRecipeImagesInputSchema>;

export const DeleteManyRecipeImagesResponseSchema = SuccessSchema.extend({
  data: z.array(RecipeImageSchema),
});
export type TDeleteManyRecipeImagesResponse = z.infer<typeof DeleteManyRecipeImagesResponseSchema>;
