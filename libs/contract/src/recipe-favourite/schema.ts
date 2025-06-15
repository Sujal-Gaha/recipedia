import { RecipeFavouriteSchema } from '../__generated__';
import { SuccessSchema } from '../lib/schema';
import z from 'zod';

/** -------- Create Recipe Favourite -------- */
export const CreateRecipeFavouriteInputSchema = RecipeFavouriteSchema.pick({
  recipe_id: true,
  user_id: true,
});
export type TCreateRecipeFavouriteInput = z.infer<typeof CreateRecipeFavouriteInputSchema>;

export const CreateRecipeFavouriteResponseSchema = SuccessSchema.extend({
  data: RecipeFavouriteSchema,
});
export type TCreateRecipeFavouriteResponse = z.infer<typeof CreateRecipeFavouriteResponseSchema>;

/** -------- Get Recipe Favourite By Id -------- */
export const GetRecipeFavouriteByIdInputSchema = RecipeFavouriteSchema.pick({
  id: true,
});
export type TGetRecipeFavouriteByIdInput = z.infer<typeof GetRecipeFavouriteByIdInputSchema>;

export const GetRecipeFavouriteByIdResponseSchema = SuccessSchema.extend({
  data: RecipeFavouriteSchema,
});
export type TGetRecipeFavouriteByIdResponse = z.infer<typeof GetRecipeFavouriteByIdResponseSchema>;

/** -------- Get All Recipe Favourites -------- */
export const GetAllRecipeFavouritesInputSchema = RecipeFavouriteSchema.pick({
  recipe_id: true,
  user_id: true,
});
export type TGetAllRecipeFavouritesInput = z.infer<typeof GetAllRecipeFavouritesInputSchema>;

export const GetAllRecipeFavouritesOutputSchema = RecipeFavouriteSchema;

export type TGetAllRecipeFavouritesOutput = z.infer<typeof GetAllRecipeFavouritesOutputSchema>;

export const GetAllRecipeFavouritesResponseSchema = SuccessSchema.extend({
  data: z.array(GetAllRecipeFavouritesOutputSchema),
});
export type TGetAllRecipeFavouritesResponse = z.infer<typeof GetAllRecipeFavouritesResponseSchema>;

/** -------- Delete Recipe Favourite -------- */
export const DeleteRecipeFavouriteInputSchema = RecipeFavouriteSchema.pick({
  id: true,
});
export type TDeleteRecipeFavouriteInput = z.infer<typeof DeleteRecipeFavouriteInputSchema>;

export const DeleteRecipeFavouriteResponseSchema = SuccessSchema.extend({
  data: RecipeFavouriteSchema,
});
export type TDeleteRecipeFavouriteResponse = z.infer<typeof DeleteRecipeFavouriteResponseSchema>;

/** -------- Delete Many Recipe Favourites -------- */
export const DeleteManyRecipeFavouritesInputSchema = RecipeFavouriteSchema.pick({
  recipe_id: true,
});
export type TDeleteManyRecipeFavouritesInput = z.infer<typeof DeleteManyRecipeFavouritesInputSchema>;

export const DeleteManyRecipeFavouritesResponseSchema = SuccessSchema.extend({
  data: z.array(RecipeFavouriteSchema),
});
export type TDeleteManyRecipeFavouritesResponse = z.infer<typeof DeleteManyRecipeFavouritesResponseSchema>;
