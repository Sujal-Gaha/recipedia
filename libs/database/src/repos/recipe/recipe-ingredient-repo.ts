import {
  RecipeIngredientRepo,
  TCreateManyRecipeIngredientsRepoInput,
  TCreateRecipeIngredientRepoInput,
  TDeleteRecipeIngredientRepoInput,
  TFindManyRecipeIngredientsRepoInput,
  TFindRecipeIngredientByIdRepoInput,
  TRecipeIngredient,
} from '@libs/quasar';
import { db } from '../../prisma/client';

export class PrismaRecipeIngredientRepo extends RecipeIngredientRepo {
  override async create({
    data: { ingredient_variant_id, note, quantity, recipe_id, unit },
  }: TCreateRecipeIngredientRepoInput): Promise<TRecipeIngredient> {
    return await db.recipeIngredient.create({
      data: {
        ingredient_variant_id,
        note,
        quantity,
        recipe_id,
        unit,
      },
    });
  }

  override async findById({ data: { id } }: TFindRecipeIngredientByIdRepoInput): Promise<TRecipeIngredient | null> {
    return await db.recipeIngredient.findUnique({
      where: {
        id,
      },
    });
  }

  override async findMany({ data: { recipe_id } }: TFindManyRecipeIngredientsRepoInput): Promise<TRecipeIngredient[]> {
    return await db.recipeIngredient.findMany({
      where: {
        recipe_id,
      },
    });
  }

  override async delete({ data: { id } }: TDeleteRecipeIngredientRepoInput): Promise<TRecipeIngredient> {
    return await db.recipeIngredient.delete({
      where: {
        id,
      },
    });
  }

  override async createMany({ data }: TCreateManyRecipeIngredientsRepoInput): Promise<TRecipeIngredient[]> {
    return await db.recipeIngredient.createManyAndReturn({
      data: data.map((recipeIngredient) => ({
        recipe_id: recipeIngredient.recipe_id,
        ingredient_variant_id: recipeIngredient.ingredient_variant_id,
        quantity: recipeIngredient.quantity,
        unit: recipeIngredient.unit,
        note: recipeIngredient.note,
      })),
    });
  }
}
