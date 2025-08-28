import { RecipeReviewSchema } from '../../__generated__';
import { SuccessSchema } from '../../lib/schema';
import z from 'zod';

/** -------- Create Recipe Review -------- */
export const CreateRecipeReviewInputSchema = RecipeReviewSchema.pick({
  recipe_id: true,
  user_id: true,
  comment: true,
  rating: true,
});
export type TCreateRecipeReviewInput = z.infer<typeof CreateRecipeReviewInputSchema>;

export const CreateRecipeReviewResponseSchema = SuccessSchema.extend({
  data: RecipeReviewSchema,
});
export type TCreateRecipeReviewResponse = z.infer<typeof CreateRecipeReviewResponseSchema>;

/** -------- Get Recipe Review By Id -------- */
export const GetRecipeReviewByIdInputSchema = RecipeReviewSchema.pick({
  id: true,
});
export type TGetRecipeReviewByIdInput = z.infer<typeof GetRecipeReviewByIdInputSchema>;

export const GetRecipeReviewByIdResponseSchema = SuccessSchema.extend({
  data: RecipeReviewSchema,
});
export type TGetRecipeReviewByIdResponse = z.infer<typeof GetRecipeReviewByIdResponseSchema>;

/** -------- Get All Recipe Reviews -------- */
export const GetAllRecipeReviewsInputSchema = RecipeReviewSchema.pick({
  recipe_id: true,
});
export type TGetAllRecipeReviewsInput = z.infer<typeof GetAllRecipeReviewsInputSchema>;

export const GetAllRecipeReviewsOutputSchema = RecipeReviewSchema;

export type TGetAllRecipeReviewsOutput = z.infer<typeof GetAllRecipeReviewsOutputSchema>;

export const GetAllRecipeReviewsResponseSchema = SuccessSchema.extend({
  data: z.array(GetAllRecipeReviewsOutputSchema),
});
export type TGetAllRecipeReviewsResponse = z.infer<typeof GetAllRecipeReviewsResponseSchema>;

/** -------- Delete Recipe Review -------- */
export const DeleteRecipeReviewInputSchema = RecipeReviewSchema.pick({
  id: true,
});
export type TDeleteRecipeReviewInput = z.infer<typeof DeleteRecipeReviewInputSchema>;

export const DeleteRecipeReviewResponseSchema = SuccessSchema.extend({
  data: RecipeReviewSchema,
});
export type TDeleteRecipeReviewResponse = z.infer<typeof DeleteRecipeReviewResponseSchema>;

/** -------- Delete Many Recipe Reviews -------- */
export const DeleteManyRecipeReviewsInputSchema = RecipeReviewSchema.pick({
  recipe_id: true,
});
export type TDeleteManyRecipeReviewsInput = z.infer<typeof DeleteManyRecipeReviewsInputSchema>;

export const DeleteManyRecipeReviewsResponseSchema = SuccessSchema.extend({
  data: z.array(RecipeReviewSchema),
});
export type TDeleteManyRecipeReviewsResponse = z.infer<typeof DeleteManyRecipeReviewsResponseSchema>;
