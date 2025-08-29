import {
  IngredientVariantImageRepo,
  TCreateIngredientVariantImageRepoInput,
  TDeleteIngredientVariantImageRepoInput,
  TFindIngredientVariantImageByIdRepoInput,
  TFindManyIngredientVariantImagesRepoInput,
  TFindManyIngredientVariantImagesRepoOutput,
  TIngredientVariantImage,
  TUpdateIngredientVariantImageRepoInput,
} from '@libs/quasar';
import { db } from '../../prisma/client';

export class PrismaIngredientVariantImageRepo extends IngredientVariantImageRepo {
  override async create({
    data: { ingredient_variant_id, is_primary, url },
  }: TCreateIngredientVariantImageRepoInput): Promise<TIngredientVariantImage> {
    return await db.ingredientVariantImage.create({
      data: {
        url,
        is_primary,
        ingredient_variant_id,
      },
    });
  }

  override async delete({ data: { id } }: TDeleteIngredientVariantImageRepoInput): Promise<TIngredientVariantImage> {
    return await db.ingredientVariantImage.delete({
      where: {
        id,
      },
    });
  }

  override async update({
    id,
    data: { is_primary, url },
  }: TUpdateIngredientVariantImageRepoInput): Promise<TIngredientVariantImage> {
    return await db.ingredientVariantImage.update({
      where: {
        id,
      },
      data: {
        url,
        is_primary,
      },
    });
  }

  override async findById({
    data: { id },
  }: TFindIngredientVariantImageByIdRepoInput): Promise<TIngredientVariantImage | null> {
    return await db.ingredientVariantImage.findUnique({
      where: {
        id,
      },
    });
  }

  override async findMany({
    data: { page, perPage },
  }: TFindManyIngredientVariantImagesRepoInput): Promise<TFindManyIngredientVariantImagesRepoOutput> {
    const ingredientVariantImages = await db.ingredientVariantImage.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        created_at: 'desc',
      },
    });
    const count = await db.file.count();

    return {
      data: ingredientVariantImages,
      pagination: {
        page,
        perPage,
        total: count,
        totalPages: Math.ceil(count / perPage),
      },
    };
  }
}
