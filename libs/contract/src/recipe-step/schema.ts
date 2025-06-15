import { RecipeStepSchema } from '../__generated__';
import { SuccessSchema } from '../lib/schema';
import z from 'zod';

/** -------- Create Recipe Step -------- */
export const CreateRecipeStepInputSchema = RecipeStepSchema.pick({
  recipe_id: true,
  content: true,
  step_no: true,
});
export type TCreateRecipeStepInput = z.infer<typeof CreateRecipeStepInputSchema>;

export const CreateRecipeStepResponseSchema = SuccessSchema.extend({
  data: RecipeStepSchema,
});
export type TCreateRecipeStepResponse = z.infer<typeof CreateRecipeStepResponseSchema>;

/** -------- Get Recipe Step By Id -------- */
export const GetRecipeStepByIdInputSchema = RecipeStepSchema.pick({
  id: true,
});
export type TGetRecipeStepByIdInput = z.infer<typeof GetRecipeStepByIdInputSchema>;

export const GetRecipeStepByIdResponseSchema = SuccessSchema.extend({
  data: RecipeStepSchema,
});
export type TGetRecipeStepByIdResponse = z.infer<typeof GetRecipeStepByIdResponseSchema>;

/** -------- Get All Recipe Steps -------- */
export const GetAllRecipeStepsInputSchema = RecipeStepSchema.pick({
  recipe_id: true,
});
export type TGetAllRecipeStepsInput = z.infer<typeof GetAllRecipeStepsInputSchema>;

export const GetAllRecipeStepsOutputSchema = RecipeStepSchema;

export type TGetAllRecipeStepsOutput = z.infer<typeof GetAllRecipeStepsOutputSchema>;

export const GetAllRecipeStepsResponseSchema = SuccessSchema.extend({
  data: z.array(GetAllRecipeStepsOutputSchema),
});
export type TGetAllRecipeStepsResponse = z.infer<typeof GetAllRecipeStepsResponseSchema>;

/** -------- Delete Recipe Step -------- */
export const DeleteRecipeStepInputSchema = RecipeStepSchema.pick({
  id: true,
});
export type TDeleteRecipeStepInput = z.infer<typeof DeleteRecipeStepInputSchema>;

export const DeleteRecipeStepResponseSchema = SuccessSchema.extend({
  data: RecipeStepSchema,
});
export type TDeleteRecipeStepResponse = z.infer<typeof DeleteRecipeStepResponseSchema>;

/** -------- Delete Many Recipe Steps -------- */
export const DeleteManyRecipeStepsInputSchema = RecipeStepSchema.pick({
  recipe_id: true,
});
export type TDeleteManyRecipeStepsInput = z.infer<typeof DeleteManyRecipeStepsInputSchema>;

export const DeleteManyRecipeStepsResponseSchema = SuccessSchema.extend({
  data: z.array(RecipeStepSchema),
});
export type TDeleteManyRecipeStepsResponse = z.infer<typeof DeleteManyRecipeStepsResponseSchema>;
