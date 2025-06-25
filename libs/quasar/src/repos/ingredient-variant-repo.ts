import {
  TCreateIngredientVariantInput,
  TCreateIngredientVariantResponse,
  TDeleteIngredientVariantInput,
  TDeleteIngredientVariantResponse,
  TGetAllIngredientVariantInput,
  TGetAllIngredientVariantOutput,
  TGetAllIngredientVariantsResponse,
  TGetIngredientVariantByIdInput,
  TGetIngredientVariantByIdResponse,
  TUpdateIngredientVariantInput,
  TUpdateIngredientVariantResponse,
} from '@libs/contract';

import { BaseRepo } from '../domain/base-repo';
import { logger } from '../logger';

/**------- Input Types --------- */

export type TCreateIngredientVariantRepoInput = {
  data: TCreateIngredientVariantInput;
};

export type TUpdateIngredientVariantRepoInput = {
  id: string;
  data: TUpdateIngredientVariantInput;
};

export type TDeleteIngredientVariantRepoInput = {
  data: TDeleteIngredientVariantInput;
};

export type TFindIngredientVariantByIdRepoInput = {
  data: TGetIngredientVariantByIdInput;
};

export type TFindManyIngredientVariantsRepoInput = {
  data: TGetAllIngredientVariantInput;
};

/**------- Output Types --------- */

export type TFindManyIngredientVariantsRepoOutput = {
  data: TGetAllIngredientVariantOutput[];
  pagination: TGetAllIngredientVariantsResponse['pagination'];
};

/**------------ Abstract Repo --------- */

export abstract class IngredientVariantRepo implements BaseRepo {
  log(): void {
    logger.info('Ingredient Variant Repo initialized...');
  }

  abstract create(input: TCreateIngredientVariantRepoInput): Promise<TCreateIngredientVariantResponse['data']>;

  abstract update(input: TUpdateIngredientVariantRepoInput): Promise<TUpdateIngredientVariantResponse['data']>;

  abstract delete(input: TDeleteIngredientVariantRepoInput): Promise<TDeleteIngredientVariantResponse['data']>;

  abstract findById(
    input: TFindIngredientVariantByIdRepoInput
  ): Promise<TGetIngredientVariantByIdResponse['data'] | null>;

  abstract findMany(input: TFindManyIngredientVariantsRepoInput): Promise<TFindManyIngredientVariantsRepoOutput>;
}
