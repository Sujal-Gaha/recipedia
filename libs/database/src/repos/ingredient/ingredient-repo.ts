import {
  IngredientRepo,
  TCreateIngredientRepoInput,
  TDeleteIngredientRepoInput,
  TFindIngredientByIdRepoInput,
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

  override async findById({ data: { id } }: TFindIngredientByIdRepoInput): Promise<TIngredient | null> {
    return await db.ingredient.findUnique({
      where: {
        id,
      },
    });
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
    });
    const count = await db.file.count();

    return {
      data: ingredients,
      pagination: {
        page,
        perPage,
        total: count,
        totalPages: Math.ceil(count / perPage),
      },
    };
  }
}
