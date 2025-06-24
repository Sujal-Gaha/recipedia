import { db } from 'src/prisma/client';
import slugify from 'react-slugify';
import {
  IngredientRepo,
  TCreateIngredientRepoInput,
  TDeleteIngredientRepoInput,
  TFindIngredientBySlugRepoInput,
  TFindManyIngredientsRepoInput,
  TFindManyIngredientsRepoOutput,
  TUpdateIngredientRepoInput,
} from '@libs/quasar';

import {
  TCreateIngredientResponse,
  TDeleteIngredientResponse,
  TGetAllIngredientsOutput,
  TGetIngredientBySlugResponse,
  TUpdateIngredientResponse,
} from '@libs/contract';
import { Prisma } from '@prisma/client';

export class PrismaIngredientRepo extends IngredientRepo {
  getSlugForIngredient({ name }: { name: string }) {
    return slugify(name);
  }

  override async create({
    data: { name, slug, image },
  }: TCreateIngredientRepoInput): Promise<TCreateIngredientResponse['data']> {
    const finalSlug = slug || this.getSlugForIngredient({ name });
    return await db.ingredient.create({
      data: {
        name,
        slug: finalSlug,
        image,
      },
    });
  }
  override async update({
    slug,
    data: { name, image },
  }: TUpdateIngredientRepoInput): Promise<TUpdateIngredientResponse['data']> {
    return await db.ingredient.update({
      where: {
        slug,
      },
      data: {
        name,
        image,
        slug: this.getSlugForIngredient({ name }),
      },
    });
  }

  override async delete({ data: { id } }: TDeleteIngredientRepoInput): Promise<TDeleteIngredientResponse['data']> {
    return await db.ingredient.update({
      where: {
        id,
      },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    });
  }
  override async findBySlug({
    data: { slug },
  }: TFindIngredientBySlugRepoInput): Promise<TGetIngredientBySlugResponse['data'] | null> {
    const ingredient = await db.ingredient.findUnique({
      where: {
        slug,
        is_deleted: false,
      },
      include: {
        variants: true,
      },
    });
    return ingredient;
  }

  override async findMany({
    data: { page, perPage, name },
  }: TFindManyIngredientsRepoInput): Promise<TFindManyIngredientsRepoOutput> {
    const where: Prisma.IngredientWhereInput = {
      is_deleted: false,
      ...(name ? { name: { contains: name, mode: Prisma.QueryMode.insensitive } } : {}),
    };

    const ingredients = await db.ingredient.findMany({
      where,
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

    const total = await db.ingredient.count({ where });

    const data: TGetAllIngredientsOutput[] = ingredients;

    return {
      data,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }
}
