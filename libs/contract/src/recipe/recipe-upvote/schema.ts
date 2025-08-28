import { RecipeUpvoteSchema } from '../../__generated__';
import { SuccessSchema } from '../../lib/schema';
import z from 'zod';

/** -------- Create Recipe Upvote -------- */
export const CreateRecipeUpvoteInputSchema = RecipeUpvoteSchema.pick({
  recipe_id: true,
  user_id: true,
});
export type TCreateRecipeUpvoteInput = z.infer<typeof CreateRecipeUpvoteInputSchema>;

export const CreateRecipeUpvoteResponseSchema = SuccessSchema.extend({
  data: RecipeUpvoteSchema,
});
export type TCreateRecipeUpvoteResponse = z.infer<typeof CreateRecipeUpvoteResponseSchema>;

/** -------- Get Recipe Upvote By Id -------- */
export const GetRecipeUpvoteByIdInputSchema = RecipeUpvoteSchema.pick({
  id: true,
});
export type TGetRecipeUpvoteByIdInput = z.infer<typeof GetRecipeUpvoteByIdInputSchema>;

export const GetRecipeUpvoteByIdResponseSchema = SuccessSchema.extend({
  data: RecipeUpvoteSchema,
});
export type TGetRecipeUpvoteByIdResponse = z.infer<typeof GetRecipeUpvoteByIdResponseSchema>;

/** -------- Get All Recipe Upvotes -------- */
export const GetAllRecipeUpvotesInputSchema = RecipeUpvoteSchema.pick({
  recipe_id: true,
});
export type TGetAllRecipeUpvotesInput = z.infer<typeof GetAllRecipeUpvotesInputSchema>;

export const GetAllRecipeUpvotesOutputSchema = RecipeUpvoteSchema;

export type TGetAllRecipeUpvotesOutput = z.infer<typeof GetAllRecipeUpvotesOutputSchema>;

export const GetAllRecipeUpvotesResponseSchema = SuccessSchema.extend({
  data: z.array(GetAllRecipeUpvotesOutputSchema),
});
export type TGetAllRecipeUpvotesResponse = z.infer<typeof GetAllRecipeUpvotesResponseSchema>;

/** -------- Delete Recipe Upvote -------- */
export const DeleteRecipeUpvoteInputSchema = RecipeUpvoteSchema.pick({
  id: true,
});
export type TDeleteRecipeUpvoteInput = z.infer<typeof DeleteRecipeUpvoteInputSchema>;

export const DeleteRecipeUpvoteResponseSchema = SuccessSchema.extend({
  data: RecipeUpvoteSchema,
});
export type TDeleteRecipeUpvoteResponse = z.infer<typeof DeleteRecipeUpvoteResponseSchema>;

/** -------- Delete Many Recipe Upvotes -------- */
export const DeleteManyRecipeUpvotesInputSchema = RecipeUpvoteSchema.pick({
  recipe_id: true,
});
export type TDeleteManyRecipeUpvotesInput = z.infer<typeof DeleteManyRecipeUpvotesInputSchema>;

export const DeleteManyRecipeUpvotesResponseSchema = SuccessSchema.extend({
  data: z.array(RecipeUpvoteSchema),
});
export type TDeleteManyRecipeUpvotesResponse = z.infer<typeof DeleteManyRecipeUpvotesResponseSchema>;
