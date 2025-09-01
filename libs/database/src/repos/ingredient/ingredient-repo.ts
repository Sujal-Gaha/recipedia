import {
  IngredientRepo,
  TCreateIngredientRepoInput,
  TDeleteIngredientRepoInput,
  TFindIngredientByIdRepoInput,
  TFindIngredientByIdRepoOutput,
  TFindIngredientBySlugRepoInput,
  TFindManyIngredientsRepoInput,
  TFindManyIngredientsRepoOutput,
  TIngredient,
  TUpdateIngredientRepoInput,
} from '@libs/quasar';
import { db } from '../../prisma/client';

export class PrismaIngredientRepo extends IngredientRepo {
  override async create({ data: { image, name, slug } }: TCreateIngredientRepoInput): Promise<TIngredient> {
    return await db.ingredient.create({
      data: {
        image,
        name,
        slug,
      },
    });
  }

  override async delete({ data: { id } }: TDeleteIngredientRepoInput): Promise<TIngredient> {
    return await db.ingredient.delete({
      where: {
        id,
      },
    });
  }

  override async update({ id, data: { image, name, slug } }: TUpdateIngredientRepoInput): Promise<TIngredient> {
    return await db.ingredient.update({
      where: { id },
      data: { image, name, slug },
    });
  }

  override async findById({
    data: { id },
  }: TFindIngredientByIdRepoInput): Promise<TFindIngredientByIdRepoOutput | null> {
    const ingredient = await db.ingredient.findUnique({
      where: {
        id,
      },
      include: {
        variants: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!ingredient) return null;

    return {
      data: {
        name: ingredient.name,
        image: ingredient.image,
        slug: ingredient.slug,
        ingredient_variants: ingredient.variants
          ? ingredient.variants.map((variant) => ({
              name: variant.name,
              ingredient_variant_images: variant.images
                ? variant.images.map((image) => ({
                    url: image.url,
                    is_primary: image.is_primary,
                  }))
                : [],
            }))
          : [],
      },
    };
  }

  override async findBySlug({ data: { slug } }: TFindIngredientBySlugRepoInput): Promise<TIngredient | null> {
    return db.ingredient.findUnique({
      where: {
        slug,
      },
    });
  }

  override async findMany({
    data: { page, perPage },
  }: TFindManyIngredientsRepoInput): Promise<TFindManyIngredientsRepoOutput> {
    const ingredients = await db.ingredient.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        created_at: 'desc',
      },
      include: {
        variants: {
          include: {
            images: true,
          },
        },
      },
    });
    const count = await db.ingredient.count();

    return {
      data: ingredients.map((ingredient) => ({
        name: ingredient.name,
        slug: ingredient.slug,
        image: ingredient.image,
        ingredient_variants: ingredient.variants
          ? ingredient.variants.map((variant) => ({
              name: variant.name,
              ingredient_variant_images: variant.images
                ? variant.images.map((image) => ({
                    url: image.url,
                    is_primary: image.is_primary,
                  }))
                : [],
            }))
          : [],
      })),
      pagination: {
        page,
        perPage,
        total: count,
        totalPages: Math.ceil(count / perPage),
      },
    };
  }
}
