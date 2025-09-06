import { RecipeReviewVoteSchema } from '../../__generated__';
import { SuccessSchema } from '../../lib/schema';
import z from 'zod';

/** -------- Create Recipe Review Vote -------- */
export const CreateRecipeReviewVoteInputSchema = RecipeReviewVoteSchema.pick({
  review_id: true,
  type: true,
  user_id: true,
});
export type TCreateRecipeReviewVoteInput = z.infer<typeof CreateRecipeReviewVoteInputSchema>;

export const CreateRecipeReviewVoteResponseSchema = SuccessSchema.extend({
  data: RecipeReviewVoteSchema,
});
export type TCreateRecipeReviewVoteResponse = z.infer<typeof CreateRecipeReviewVoteResponseSchema>;

/** -------- Get Recipe Review Vote By Id -------- */
export const GetRecipeReviewVoteByIdInputSchema = RecipeReviewVoteSchema.pick({
  id: true,
});
export type TGetRecipeReviewVoteByIdInput = z.infer<typeof GetRecipeReviewVoteByIdInputSchema>;

export const GetRecipeReviewVoteByIdResponseSchema = SuccessSchema.extend({
  data: RecipeReviewVoteSchema,
});
export type TGetRecipeReviewVoteByIdResponse = z.infer<typeof GetRecipeReviewVoteByIdResponseSchema>;

/** -------- Get All Recipe Review Votes -------- */
export const GetAllRecipeReviewVotesInputSchema = RecipeReviewVoteSchema;
export type TGetAllRecipeReviewVotesInput = z.infer<typeof GetAllRecipeReviewVotesInputSchema>;

export const GetAllRecipeReviewVotesOutputSchema = RecipeReviewVoteSchema;

export type TGetAllRecipeReviewVotesOutput = z.infer<typeof GetAllRecipeReviewVotesOutputSchema>;

export const GetAllRecipeReviewVotesResponseSchema = SuccessSchema.extend({
  data: z.array(GetAllRecipeReviewVotesOutputSchema),
});
export type TGetAllRecipeReviewVotesResponse = z.infer<typeof GetAllRecipeReviewVotesResponseSchema>;

/** -------- Update Recipe Review Vote -------- */
export const UpdateRecipeReviewVoteInputSchema = RecipeReviewVoteSchema.pick({
  type: true,
});
export type TUpdateRecipeReviewVoteInput = z.infer<typeof UpdateRecipeReviewVoteInputSchema>;

export const UpdateRecipeReviewVoteResponseSchema = SuccessSchema.extend({
  data: RecipeReviewVoteSchema,
});
export type TUpdateRecipeReviewVoteResponse = z.infer<typeof UpdateRecipeReviewVoteResponseSchema>;

/** -------- Delete Recipe Review Vote -------- */
export const DeleteRecipeReviewVoteInputSchema = RecipeReviewVoteSchema.pick({
  id: true,
});
export type TDeleteRecipeReviewVoteInput = z.infer<typeof DeleteRecipeReviewVoteInputSchema>;

export const DeleteRecipeReviewVoteResponseSchema = SuccessSchema.extend({
  data: RecipeReviewVoteSchema,
});
export type TDeleteRecipeReviewVoteResponse = z.infer<typeof DeleteRecipeReviewVoteResponseSchema>;

/** -------- Delete Many Recipe Review Votes -------- */
export const DeleteManyRecipeReviewVotesInputSchema = RecipeReviewVoteSchema.pick({
  review_id: true,
});
export type TDeleteManyRecipeReviewVotesInput = z.infer<typeof DeleteManyRecipeReviewVotesInputSchema>;

export const DeleteManyRecipeReviewVotesResponseSchema = SuccessSchema.extend({
  data: z.array(RecipeReviewVoteSchema),
});
export type TDeleteManyRecipeReviewVotesResponse = z.infer<typeof DeleteManyRecipeReviewVotesResponseSchema>;

/** -------- Toggle Recipe Review Vote -------- */
export const ToggleRecipeReviewVoteInputSchema = RecipeReviewVoteSchema.pick({
  review_id: true,
  type: true,
  user_id: true,
}).extend({
  id: z.string().optional(),
});
export type TToggleRecipeReviewVoteInput = z.infer<typeof ToggleRecipeReviewVoteInputSchema>;

export const ToggleRecipeReviewVoteResponseSchema = SuccessSchema.extend({
  data: RecipeReviewVoteSchema,
});
export type TToggleRecipeReviewVoteResponse = z.infer<typeof ToggleRecipeReviewVoteResponseSchema>;
