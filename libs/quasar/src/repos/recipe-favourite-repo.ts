import {
  RecipeFavourite,
  TCreateRecipeFavouriteInput,
  TDeleteRecipeFavouriteInput,
  TGetAllRecipeFavouritesInput,
  TGetRecipeFavouriteByIdInput,
  TDeleteManyRecipeFavouritesInput,
} from '@libs/contract';
import { BaseRepo } from '../domain/base-repo';
import { logger } from '../logger';

export type TRecipeFavourite = RecipeFavourite;

export type TCreateRecipeFavouriteRepoInput = {
  data: TCreateRecipeFavouriteInput;
};

export type TDeleteRecipeFavouriteRepoInput = {
  data: TDeleteRecipeFavouriteInput;
};

export type TFindRecipeFavouriteByIdRepoInput = {
  data: TGetRecipeFavouriteByIdInput;
};

export type TFindManyRecipeFavouritesRepoInput = {
  data: TGetAllRecipeFavouritesInput;
};

export type TDeleteManyRecipeFavouritesRepoOuput = {
  data: TDeleteManyRecipeFavouritesInput;
};

export abstract class RecipeFavouriteRepo implements BaseRepo {
  log(): void {
    logger.info('Recipe Favourite Repo initialized...');
  }

  abstract create(input: TCreateRecipeFavouriteRepoInput): Promise<TRecipeFavourite>;
  abstract delete(input: TDeleteRecipeFavouriteRepoInput): Promise<TRecipeFavourite>;
  abstract findById(input: TFindRecipeFavouriteByIdRepoInput): Promise<TRecipeFavourite | null>;
  abstract findMany(input: TFindManyRecipeFavouritesRepoInput): Promise<TRecipeFavourite[]>;

  abstract deleteMany(input: TDeleteManyRecipeFavouritesRepoOuput): Promise<TRecipeFavourite[]>;
}
