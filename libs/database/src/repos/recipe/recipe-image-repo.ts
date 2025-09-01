import {
  RecipeImageRepo,
  TCreateManyRecipeImagesRepoInput,
  TCreateRecipeImageRepoInput,
  TDeleteManyRecipeImagesRepoOuput,
  TDeleteRecipeImageRepoInput,
  TFindManyRecipeImagesRepoInput,
  TFindRecipeImageByIdRepoInput,
  TRecipeImage,
} from '@libs/quasar';
import { db } from '../../prisma/client';

export class PrismaRecipeImageRepo extends RecipeImageRepo {
  override async create({ data: { is_primary, recipe_id, url } }: TCreateRecipeImageRepoInput): Promise<TRecipeImage> {
    return await db.recipeImage.create({
      data: {
        recipe_id,
        url,
        is_primary,
      },
    });
  }

  override async delete({ data: { id } }: TDeleteRecipeImageRepoInput): Promise<TRecipeImage> {
    return await db.recipeImage.delete({
      where: {
        id,
      },
    });
  }

  override async findById({ data: { id } }: TFindRecipeImageByIdRepoInput): Promise<TRecipeImage | null> {
    return await db.recipeImage.findUnique({
      where: {
        id,
      },
    });
  }

  override async findMany({ data: { recipe_id } }: TFindManyRecipeImagesRepoInput): Promise<TRecipeImage[]> {
    return await db.recipeImage.findMany({
      where: {
        recipe_id,
      },
    });
  }

  override async deleteMany({ data: { recipe_id } }: TDeleteManyRecipeImagesRepoOuput): Promise<TRecipeImage[]> {
    const images = await db.recipeImage.findMany({
      where: {
        recipe_id,
      },
    });

    await db.recipeImage.deleteMany({
      where: {
        recipe_id,
      },
    });

    return images;
  }

  override async createMany({ data }: TCreateManyRecipeImagesRepoInput): Promise<TRecipeImage[]> {
    return await db.recipeImage.createManyAndReturn({
      data: data.map((recipeImage) => ({
        recipe_id: recipeImage.recipe_id,
        url: recipeImage.url,
        is_primary: recipeImage.is_primary,
      })),
    });
  }
}
