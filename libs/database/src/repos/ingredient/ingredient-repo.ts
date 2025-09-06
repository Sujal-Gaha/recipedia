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
import slugify from 'react-slugify';
import { Prisma } from '@prisma/client';

export class PrismaIngredientRepo extends IngredientRepo {
  private getSlugForIngredient({ name }: { name: string }) {
    return slugify(name);
  }

  override async create({
    data: { image, name, category, description, calories, carbohydrates, fat, fiber, protein, sugar },
  }: TCreateIngredientRepoInput): Promise<TIngredient> {
    const slug = this.getSlugForIngredient({ name });

    return await db.ingredient.create({
      data: {
        image,
        name,
        slug,
        category,
        description,
        calories,
        carbohydrates,
        fat,
        fiber,
        protein,
        sugar,
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
        variants: true,
      },
    });

    if (!ingredient) return null;

    return {
      data: {
        id: ingredient.id,
        name: ingredient.name,
        image: ingredient.image,
        slug: ingredient.slug,
        category: ingredient.category,
        description: ingredient.description,
        calories: ingredient.calories,
        carbohydrates: ingredient.carbohydrates,
        fat: ingredient.fat,
        protein: ingredient.protein,
        fiber: ingredient.fiber,
        sugar: ingredient.sugar,
        created_at: ingredient.created_at,
        updated_at: ingredient.updated_at,
        ingredient_variants: ingredient.variants
          ? ingredient.variants.map((variant) => ({
              name: variant.name,
              image: variant.image,
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
    data: { page, perPage, global_filter },
  }: TFindManyIngredientsRepoInput): Promise<TFindManyIngredientsRepoOutput> {
    const whereInput: Prisma.IngredientWhereInput = {
      ...(global_filter ? { name: { contains: global_filter, mode: 'insensitive' } } : null),
    };

    const ingredients = await db.ingredient.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        created_at: 'desc',
      },
      where: whereInput,
      include: {
        variants: true,
      },
    });
    const count = await db.ingredient.count({
      where: whereInput,
    });

    return {
      data: ingredients.map((ingredient) => ({
        id: ingredient.id,
        name: ingredient.name,
        slug: ingredient.slug,
        image: ingredient.image,
        category: ingredient.category,
        calories: ingredient.calories,
        carbohydrates: ingredient.carbohydrates,
        fat: ingredient.fat,
        fiber: ingredient.fiber,
        protein: ingredient.protein,
        sugar: ingredient.sugar,
        description: ingredient.description,
        created_at: ingredient.created_at,
        updated_at: ingredient.updated_at,
        ingredient_variants: ingredient.variants ? ingredient.variants : [],
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
