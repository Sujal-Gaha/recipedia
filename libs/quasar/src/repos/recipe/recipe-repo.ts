import {
  Recipe,
  TCreateRecipeInput,
  TUpdateRecipeInput,
  TPaginationOutput,
  TDeleteRecipeInput,
  TGetAllRecipesInput,
  TGetAllRecipesOutput,
  TGetRecipeBySlugInput,
  TGetRecipeBySlugOutput,
} from '@libs/contract';
import { BaseRepo } from '../../domain/base-repo';
import { logger } from '../../logger';

export type TRecipe = Recipe;

export type TCreateRecipeRepoInput = {
  data: TCreateRecipeInput;
};

export type TDeleteRecipeRepoInput = {
  data: TDeleteRecipeInput;
};

export type TUpdateRecipeRepoInput = {
  id: string;
  data: TUpdateRecipeInput;
};

export type TFindRecipeBySlugRepoInput = {
  data: TGetRecipeBySlugInput;
};

export type TFindRecipeBySlugRepoOutput = {
  data: TGetRecipeBySlugOutput;
};

export type TFindManyRecipesRepoInput = {
  data: TGetAllRecipesInput;
};

export type TFindManyRecipesRepoOutput = {
  data: TGetAllRecipesOutput[];
  pagination: TPaginationOutput;
};

export abstract class RecipeRepo implements BaseRepo {
  log(): void {
    logger.info('Recipe Repo initialized...');
  }

  abstract create(input: TCreateRecipeRepoInput): Promise<TRecipe>;
  abstract delete(input: TDeleteRecipeRepoInput): Promise<TRecipe>;
  abstract update(input: TUpdateRecipeRepoInput): Promise<TRecipe>;
  abstract findBySlug(input: TFindRecipeBySlugRepoInput): Promise<TFindRecipeBySlugRepoOutput | null>;
  abstract findMany(input: TFindManyRecipesRepoInput): Promise<TFindManyRecipesRepoOutput>;
}
