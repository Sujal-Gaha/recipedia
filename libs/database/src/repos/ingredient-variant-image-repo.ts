import {
  TCreateIngredientVariantImageResponse,
  TDeleteIngredientVariantImageResponse,
  TGetIngredientVariantImageByIdResponse,
  TUpdateIngredientVariantImageResponse,
} from '@libs/contract';
import {
  IngredientVariantImageRepo,
  TCreateIngredientVariantImageRepoInput,
  TDeleteIngredientVariantImageRepoInput,
  TFindIngredientVariantImageByIdRepoInput,
  TFindManyIngredientVariantImagesRepoInput,
  TFindManyIngredientVariantImagesRepoOutput,
  TUpdateIngredientVariantImageRepoInput,
} from '@libs/quasar';
import { db } from '../prisma/client';

export class PrismaIngredientVariantImageRepo extends IngredientVariantImageRepo {
  override async create({
    data: { url, is_primary, ingredient_variant_id },
  }: TCreateIngredientVariantImageRepoInput): Promise<TCreateIngredientVariantImageResponse['data']> {
    return await db.ingredientVariantImage.create({
      data: {
        url,
        is_primary,
        ingredient_variant_id,
      },
    });
  }
  override async update({
    id,
    data: { url, is_primary, ingredient_variant_id },
  }: TUpdateIngredientVariantImageRepoInput): Promise<TUpdateIngredientVariantImageResponse['data']> {
    return await db.ingredientVariantImage.update({
      where: { id },
      data: {
        url,
        is_primary,
        ingredient_variant_id,
      },
    });
  }
  override async delete({
    data: { id },
  }: TDeleteIngredientVariantImageRepoInput): Promise<TDeleteIngredientVariantImageResponse['data']> {
    return await db.ingredientVariantImage.update({
      where: { id },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    });
  }
  override async findById({
    data: { id },
  }: TFindIngredientVariantImageByIdRepoInput): Promise<TGetIngredientVariantImageByIdResponse['data'] | null> {
    return await db.ingredientVariantImage.findUnique({
      where: { id },
    });
  }
  override async findMany({
    data: { page, perPage, ingredient_variant_id },
  }: TFindManyIngredientVariantImagesRepoInput): Promise<TFindManyIngredientVariantImagesRepoOutput> {
    const where = ingredient_variant_id ? { ingredient_variant_id } : {};

    const [images, total] = await Promise.all([
      db.ingredientVariantImage.findMany({
        where,
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: {
          created_at: 'desc',
        },
      }),
      db.ingredientVariantImage.count({ where }),
    ]);

    return {
      data: images,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }
}
