import {
  IngredientVariant,
  TCreateIngredientVariantInput,
  TDeleteIngredientVariantInput,
  TGetAllIngredientVariantsInput,
  TGetAllIngredientVariantsOutput,
  TGetIngredientVariantByIdInput,
  TPaginationOutput,
  TUpdateIngredientVariantInput,
} from '@libs/contract';
import { BaseRepo } from '../../domain/base-repo';
import { logger } from '../../logger';

export type TIngredientVariant = IngredientVariant;

export type TCreateIngredientVariantRepoInput = {
  data: TCreateIngredientVariantInput;
};

export type TDeleteIngredientVariantRepoInput = {
  data: TDeleteIngredientVariantInput;
};

export type TUpdateIngredientVariantRepoInput = {
  id: string;
  data: TUpdateIngredientVariantInput;
};

export type TFindIngredientVariantByIdRepoInput = {
  data: TGetIngredientVariantByIdInput;
};

export type TFindManyIngredientVariantsRepoInput = {
  data: TGetAllIngredientVariantsInput;
};

export type TFindManyIngredientVariantsRepoOutput = {
  data: TGetAllIngredientVariantsOutput[];
  pagination: TPaginationOutput;
};

export abstract class IngredientVariantRepo implements BaseRepo {
  log(): void {
    logger.info('Ingredient Variant Repo initialized...');
  }

  abstract create(input: TCreateIngredientVariantRepoInput): Promise<TIngredientVariant>;
  abstract delete(input: TDeleteIngredientVariantRepoInput): Promise<TIngredientVariant>;
  abstract update(input: TUpdateIngredientVariantRepoInput): Promise<TIngredientVariant>;
  abstract findById(input: TFindIngredientVariantByIdRepoInput): Promise<TIngredientVariant | null>;
  abstract findMany(input: TFindManyIngredientVariantsRepoInput): Promise<TFindManyIngredientVariantsRepoOutput>;
}
