import {
  Ingredient,
  TCreateIngredientInput,
  TDeleteIngredientInput,
  TGetAllIngredientsInput,
  TGetAllIngredientsOutput,
  TGetIngredientByIdInput,
  TGetIngredientBySlugInput,
  TPaginationOutput,
  TUpdateIngredientInput,
} from '@libs/contract';
import { BaseRepo } from '../../domain/base-repo';
import { logger } from '../../logger';

export type TIngredient = Ingredient;

export type TCreateIngredientRepoInput = {
  data: TCreateIngredientInput;
};

export type TDeleteIngredientRepoInput = {
  data: TDeleteIngredientInput;
};

export type TUpdateIngredientRepoInput = {
  id: string;
  data: TUpdateIngredientInput;
};

export type TFindIngredientByIdRepoInput = {
  data: TGetIngredientByIdInput;
};

export type TFindIngredientBySlugRepoInput = {
  data: TGetIngredientBySlugInput;
};

export type TFindManyIngredientsRepoInput = {
  data: TGetAllIngredientsInput;
};

export type TFindManyIngredientsRepoOutput = {
  data: TGetAllIngredientsOutput[];
  pagination: TPaginationOutput;
};

export abstract class IngredientRepo implements BaseRepo {
  log(): void {
    logger.info('Ingredient Repo initialized...');
  }

  abstract create(input: TCreateIngredientRepoInput): Promise<TIngredient>;
  abstract delete(input: TDeleteIngredientRepoInput): Promise<TIngredient>;
  abstract update(input: TUpdateIngredientRepoInput): Promise<TIngredient>;
  abstract findById(input: TFindIngredientByIdRepoInput): Promise<TIngredient | null>;
  abstract findBySlug(input: TFindIngredientBySlugRepoInput): Promise<TIngredient | null>;
  abstract findMany(input: TFindManyIngredientsRepoInput): Promise<TFindManyIngredientsRepoOutput>;
}
