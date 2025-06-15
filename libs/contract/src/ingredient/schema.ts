import { z } from 'zod';
/***----------Create Ingredient ----------- */

import { IngredientSchema } from 'src/__generated__';
import { SuccessSchema } from 'src/lib/schema';

export const CreateIngredientInputSchema = IngredientSchema.pick({
  name: true,
  slug: true,
  image: true,
});

export type TCreateIngredientInput = z.infer<typeof CreateIngredientInputSchema>;

export const CreateIngredientResponseSchema = SuccessSchema.extend({
  data: IngredientSchema,
});

export type TCreateIngredientResponse = z.infer<typeof CreateIngredientResponseSchema>;
