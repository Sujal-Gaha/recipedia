import {
  RecipeFavouriteRepo,
  TCreateRecipeFavouriteRepoInput,
  TDeleteManyRecipeFavouritesRepoOuput,
  TDeleteRecipeFavouriteRepoInput,
  TFindManyRecipeFavouritesRepoInput,
  TFindRecipeFavouriteByIdRepoInput,
  TRecipeFavourite,
} from '@libs/quasar';
import { db } from '../../prisma/client';

export class PrismaRecipeFavouriteRepo extends RecipeFavouriteRepo {
  override async create({ data: { recipe_id, user_id } }: TCreateRecipeFavouriteRepoInput): Promise<TRecipeFavourite> {
    return await db.recipeFavourite.create({
      data: {
        recipe_id,
        user_id,
      },
    });
  }

  override async delete({ data: { id } }: TDeleteRecipeFavouriteRepoInput): Promise<TRecipeFavourite> {
    return await db.recipeFavourite.delete({
      where: {
        id,
      },
    });
  }

  override async findById({ data: { id } }: TFindRecipeFavouriteByIdRepoInput): Promise<TRecipeFavourite | null> {
    return await db.recipeFavourite.findUnique({
      where: {
        id,
      },
    });
  }

  override async findMany({
    data: { recipe_id, user_id },
  }: TFindManyRecipeFavouritesRepoInput): Promise<TRecipeFavourite[]> {
    return await db.recipeFavourite.findMany({
      where: {
        recipe_id,
        user_id,
      },
    });
  }

  override async deleteMany({
    data: { recipe_id },
  }: TDeleteManyRecipeFavouritesRepoOuput): Promise<TRecipeFavourite[]> {
    const favourites = db.recipeFavourite.findMany({
      where: {
        recipe_id,
      },
    });

    await db.recipeFavourite.deleteMany({
      where: {
        recipe_id,
      },
    });

    return favourites;
  }
}
