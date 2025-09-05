import {
  RecipeTip,
  TCreateRecipeTipInput,
  TDeleteRecipeTipInput,
  TGetAllRecipeTipsInput,
  TGetRecipeTipByIdInput,
  TDeleteManyRecipeTipsInput,
} from '@libs/contract';
import { BaseRepo } from '../../domain/base-repo';
import { logger } from '../../logger';

export type TRecipeTip = RecipeTip;

export type TCreateRecipeTipRepoInput = {
  data: TCreateRecipeTipInput;
};

export type TDeleteRecipeTipRepoInput = {
  data: TDeleteRecipeTipInput;
};

export type TFindRecipeTipByIdRepoInput = {
  data: TGetRecipeTipByIdInput;
};

export type TFindManyRecipeTipsRepoInput = {
  data: TGetAllRecipeTipsInput;
};

export type TDeleteManyRecipeTipsRepoOuput = {
  data: TDeleteManyRecipeTipsInput;
};

export type TCreateManyRecipeTipsRepoInput = {
  data: TCreateRecipeTipInput[];
};

export abstract class RecipeTipRepo implements BaseRepo {
  log(): void {
    logger.info('Recipe Tip Repo initialized...');
  }

  abstract create(input: TCreateRecipeTipRepoInput): Promise<TRecipeTip>;
  abstract delete(input: TDeleteRecipeTipRepoInput): Promise<TRecipeTip>;
  abstract findById(input: TFindRecipeTipByIdRepoInput): Promise<TRecipeTip | null>;
  abstract findMany(input: TFindManyRecipeTipsRepoInput): Promise<TRecipeTip[]>;

  abstract deleteMany(input: TDeleteManyRecipeTipsRepoOuput): Promise<TRecipeTip[]>;
  abstract createMany(input: TCreateManyRecipeTipsRepoInput): Promise<TRecipeTip[]>;
}
