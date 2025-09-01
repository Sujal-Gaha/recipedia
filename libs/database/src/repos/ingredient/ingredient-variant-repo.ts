import {
  IngredientVariantRepo,
  TCreateIngredientVariantRepoInput,
  TCreateManyIngredientVariantsRepoInput,
  TDeleteIngredientVariantRepoInput,
  TFindIngredientVariantByIdRepoInput,
  TFindManyIngredientVariantsRepoInput,
  TFindManyIngredientVariantsRepoOutput,
  TIngredientVariant,
  TUpdateIngredientVariantRepoInput,
} from '@libs/quasar';
import { db } from '../../prisma/client';

export class PrismaIngredientVariantRepo extends IngredientVariantRepo {
  override async create({
    data: { ingredient_id, name },
  }: TCreateIngredientVariantRepoInput): Promise<TIngredientVariant> {
    return await db.ingredientVariant.create({
      data: {
        ingredient_id,
        name,
      },
    });
  }

  override async delete({ data: { id } }: TDeleteIngredientVariantRepoInput): Promise<TIngredientVariant> {
    return await db.ingredientVariant.delete({
      where: {
        id,
      },
    });
  }

  override async update({ id, data: { name } }: TUpdateIngredientVariantRepoInput): Promise<TIngredientVariant> {
    return await db.ingredientVariant.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  override async findById({ data: { id } }: TFindIngredientVariantByIdRepoInput): Promise<TIngredientVariant | null> {
    return await db.ingredientVariant.findUnique({
      where: {
        id,
      },
    });
  }

  override async findMany({
    data: { page, perPage, ingredient_id },
  }: TFindManyIngredientVariantsRepoInput): Promise<TFindManyIngredientVariantsRepoOutput> {
    const ingredientVariants = await db.ingredientVariant.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        created_at: 'desc',
      },
      where: {
        ...(ingredient_id
          ? {
              ingredient_id,
            }
          : null),
      },
    });

    const count = await db.ingredientVariant.count({
      where: {
        ...(ingredient_id
          ? {
              ingredient_id,
            }
          : null),
      },
    });

    return {
      data: ingredientVariants,
      pagination: {
        page,
        perPage,
        total: count,
        totalPages: Math.ceil(count / perPage),
      },
    };
  }

  override async createMany({ data }: TCreateManyIngredientVariantsRepoInput): Promise<TIngredientVariant[]> {
    return await db.ingredientVariant.createManyAndReturn({
      data: data.map((ingredientVariant) => ({
        name: ingredientVariant.name,
        ingredient_id: ingredientVariant.ingredient_id,
      })),
    });
  }
}
