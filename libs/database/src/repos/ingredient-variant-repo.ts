import {
  TCreateIngredientVariantResponse,
  TDeleteIngredientVariantResponse,
  TGetIngredientVariantByIdResponse,
  TUpdateIngredientVariantResponse,
} from '@libs/contract';
import {
  IngredientVariantRepo,
  TCreateIngredientVariantRepoInput,
  TDeleteIngredientVariantRepoInput,
  TFindIngredientVariantByIdRepoInput,
  TFindManyIngredientVariantsRepoInput,
  TFindManyIngredientVariantsRepoOutput,
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
  }: TDeleteIngredientVariantRepoInput): Promise<TDeleteIngredientVariantResponse['data']> {
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
  override async findMany({
    data: { page, perPage, ingredient_id },
  }: TFindManyIngredientVariantsRepoInput): Promise<TFindManyIngredientVariantsRepoOutput> {
    const where = {
      ...(ingredient_id ? { ingredient_id } : {}),
      is_deleted: false,
    };
    const [variants, total] = await Promise.all([
      db.ingredientVariant.findMany({
        where,
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: {
          created_at: 'desc',
        },
        include: {
          images: true,
        },
      }),
      db.ingredientVariant.count({ where }),
    ]);
    return {
      data: variants,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }
  override async findById({
    data: { id },
  }: TFindIngredientVariantByIdRepoInput): Promise<TGetIngredientVariantByIdResponse['data'] | null> {
    return await db.ingredientVariant.findFirst({
      where: {
        id,
        is_deleted: false,
      },
      include: {
        images: true,
      },
    });
  }
}
