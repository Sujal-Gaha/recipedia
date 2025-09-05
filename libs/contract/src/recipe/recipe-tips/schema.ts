import { RecipeTipSchema } from '../../__generated__';
import { SuccessSchema } from '../../lib/schema';
import z from 'zod';

/** -------- Create Recipe Tip -------- */
export const CreateRecipeTipInputSchema = RecipeTipSchema.pick({
  recipe_id: true,
  content: true,
});
export type TCreateRecipeTipInput = z.infer<typeof CreateRecipeTipInputSchema>;

export const CreateRecipeTipResponseSchema = SuccessSchema.extend({
  data: RecipeTipSchema,
});
export type TCreateRecipeTipResponse = z.infer<typeof CreateRecipeTipResponseSchema>;

/** -------- Get Recipe Tip By Id -------- */
export const GetRecipeTipByIdInputSchema = RecipeTipSchema.pick({
  id: true,
});
export type TGetRecipeTipByIdInput = z.infer<typeof GetRecipeTipByIdInputSchema>;

export const GetRecipeTipByIdResponseSchema = SuccessSchema.extend({
  data: RecipeTipSchema,
});
export type TGetRecipeTipByIdResponse = z.infer<typeof GetRecipeTipByIdResponseSchema>;

/** -------- Get All Recipe Tips -------- */
export const GetAllRecipeTipsInputSchema = RecipeTipSchema.pick({
  recipe_id: true,
});
export type TGetAllRecipeTipsInput = z.infer<typeof GetAllRecipeTipsInputSchema>;

export const GetAllRecipeTipsOutputSchema = RecipeTipSchema;

export type TGetAllRecipeTipsOutput = z.infer<typeof GetAllRecipeTipsOutputSchema>;

export const GetAllRecipeTipsResponseSchema = SuccessSchema.extend({
  data: z.array(GetAllRecipeTipsOutputSchema),
});
export type TGetAllRecipeTipsResponse = z.infer<typeof GetAllRecipeTipsResponseSchema>;

/** -------- Delete Recipe Tip -------- */
export const DeleteRecipeTipInputSchema = RecipeTipSchema.pick({
  id: true,
});
export type TDeleteRecipeTipInput = z.infer<typeof DeleteRecipeTipInputSchema>;

export const DeleteRecipeTipResponseSchema = SuccessSchema.extend({
  data: RecipeTipSchema,
});
export type TDeleteRecipeTipResponse = z.infer<typeof DeleteRecipeTipResponseSchema>;

/** -------- Delete Many Recipe Tips -------- */
export const DeleteManyRecipeTipsInputSchema = RecipeTipSchema.pick({
  recipe_id: true,
});
export type TDeleteManyRecipeTipsInput = z.infer<typeof DeleteManyRecipeTipsInputSchema>;

export const DeleteManyRecipeTipsResponseSchema = SuccessSchema.extend({
  data: z.array(RecipeTipSchema),
});
export type TDeleteManyRecipeTipsResponse = z.infer<typeof DeleteManyRecipeTipsResponseSchema>;
