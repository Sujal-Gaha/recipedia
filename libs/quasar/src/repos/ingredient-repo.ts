import {
  TCreateIngredientInput,
  TCreateIngredientResponse,
  TDeleteIngredientInput,
  TDeleteIngredientResponse,
  TGetAllIngredientsInput,
  TGetAllIngredientsOutput,
  TGetAllIngredientsResponse,
  TGetIngredientBySlugResponse,
  TGetIngredientSlugInput,
  TUpdateIngredientInput,
  TUpdateIngredientResponse,
} from '@libs/contract';
import { BaseRepo } from '../domain/base-repo';
import { logger } from '../logger';

/**-------Input types----------- */
export type TCreateIngredientRepoInput = {
  data: TCreateIngredientInput;
};

export type TUpdateIngredientRepoInput = {
  slug: string;
  data: TUpdateIngredientInput;
};

export type TDeleteIngredientRepoInput = {
  data: TDeleteIngredientInput;
};

export type TFindIngredientBySlugRepoInput = {
  data: TGetIngredientSlugInput;
};

export type TFindManyIngredientsRepoInput = {
  data: TGetAllIngredientsInput;
};

/**----------- OUtput  Types --------- */

export type TFindManyIngredientsRepoOutput = {
  data: TGetAllIngredientsOutput[];
  pagination: TGetAllIngredientsResponse['pagination'];
};

/**-------------- Abstract Repo ------------- */

export abstract class IngredientRepo implements BaseRepo {
  log(): void {
    logger.info('Ingredient Repo initialized...');
  }
  abstract create(input: TCreateIngredientRepoInput): Promise<TCreateIngredientResponse['data']>;
  abstract update(input: TUpdateIngredientRepoInput): Promise<TUpdateIngredientResponse['data']>;
  abstract delete(input: TDeleteIngredientRepoInput): Promise<TDeleteIngredientResponse['data']>;
  abstract findBySlug(input: TFindIngredientBySlugRepoInput): Promise<TGetIngredientBySlugResponse['data'] | null>;
  abstract findMany(input: TFindManyIngredientsRepoInput): Promise<TFindManyIngredientsRepoOutput>;
}
