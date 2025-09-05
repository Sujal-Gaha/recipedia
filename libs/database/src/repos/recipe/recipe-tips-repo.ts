import {
  RecipeTipRepo,
  TCreateManyRecipeTipsRepoInput,
  TCreateRecipeTipRepoInput,
  TDeleteManyRecipeTipsRepoOuput,
  TDeleteRecipeTipRepoInput,
  TFindManyRecipeTipsRepoInput,
  TFindRecipeTipByIdRepoInput,
  TRecipeTip,
} from '@libs/quasar';
import { db } from '../../prisma/client';

export class PrismaRecipeTipRepo extends RecipeTipRepo {
  override async create({ data: { recipe_id, content } }: TCreateRecipeTipRepoInput): Promise<TRecipeTip> {
    return await db.recipeTip.create({
      data: {
        recipe_id,
        content,
      },
    });
  }

  override async delete({ data: { id } }: TDeleteRecipeTipRepoInput): Promise<TRecipeTip> {
    return await db.recipeTip.delete({
      where: {
        id,
      },
    });
  }

  override async findById({ data: { id } }: TFindRecipeTipByIdRepoInput): Promise<TRecipeTip | null> {
    return await db.recipeTip.findUnique({
      where: {
        id,
      },
    });
  }

  override async findMany({ data: { recipe_id } }: TFindManyRecipeTipsRepoInput): Promise<TRecipeTip[]> {
    return await db.recipeTip.findMany({
      where: {
        recipe_id,
      },
    });
  }

  override async deleteMany({ data: { recipe_id } }: TDeleteManyRecipeTipsRepoOuput): Promise<TRecipeTip[]> {
    const tips = db.recipeTip.findMany({
      where: {
        recipe_id,
      },
    });

    await db.recipeTip.deleteMany({
      where: {
        recipe_id,
      },
    });

    return tips;
  }

  override async createMany({ data }: TCreateManyRecipeTipsRepoInput): Promise<TRecipeTip[]> {
    return await db.recipeTip.createManyAndReturn({
      data: data.map((recipeTip) => ({
        recipe_id: recipeTip.recipe_id,
        content: recipeTip.content,
      })),
    });
  }
}
