import {
  TCreateIngredientVariantResponse,
  TDeleteIngredientVariantInput,
  TDeleteIngredientVariantResponse,
  TUpdateIngredientVariantResponse,
} from '@libs/contract';
import {
  IngredientVariantRepo,
  TCreateIngredientVariantRepoInput,
  TUpdateIngredientVariantRepoInput,
} from '@libs/quasar';
import { db } from 'src/prisma/client';

export class PrismaIngredientVariantRepo extends IngredientVariantRepo {
  override async create({
    data: { name, ingredient_id },
  }: TCreateIngredientVariantRepoInput): Promise<TCreateIngredientVariantResponse['data']> {
    return await db.ingredientVariant.create({
      data: {
        name,
        ingredient_id,
      },
    });
  }
  override async update({
    id,
    data: { name, ingredient_id },
  }: TUpdateIngredientVariantRepoInput): Promise<TUpdateIngredientVariantResponse['data']> {
    return await db.ingredientVariant.update({
      where: { id },
      data: {
        name,
        ingredient_id,
      },
    });
  }
  override async delete({
    data: { id },
  }: TDeleteIngredientVariantInput): Promise<TDeleteIngredientVariantResponse['data']> {
    return await db.ingredientVariant.update({
      where: {
        id,
      },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    });
  }
}
