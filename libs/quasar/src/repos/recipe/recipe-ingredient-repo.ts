import { logger } from '../../logger';
import { BaseRepo } from '../../domain/base-repo';
import {
  RecipeIngredient,
  TCreateManyRecipeIngredientsInput,
  TCreateRecipeIngredientInput,
  TDeleteRecipeIngredientInput,
  TGetAllRecipeIngredientsInput,
  TGetRecipeIngredientByIdInput,
} from '@libs/contract';

export type TRecipeIngredient = RecipeIngredient;

export type TCreateRecipeIngredientRepoInput = {
  data: TCreateRecipeIngredientInput;
};

export type TCreateManyRecipeIngredientsRepoInput = {
  data: TCreateManyRecipeIngredientsInput;
};

export type TFindRecipeIngredientByIdRepoInput = {
  data: TGetRecipeIngredientByIdInput;
};

export type TFindManyRecipeIngredientsRepoInput = {
  data: TGetAllRecipeIngredientsInput;
};

export type TDeleteRecipeIngredientRepoInput = {
  data: TDeleteRecipeIngredientInput;
};

export abstract class RecipeIngredientRepo implements BaseRepo {
  log(): void {
    logger.info('Recipe Ingredient Repo initialized...');
  }

  abstract create(input: TCreateRecipeIngredientRepoInput): Promise<TRecipeIngredient>;
  abstract findById(input: TFindRecipeIngredientByIdRepoInput): Promise<TRecipeIngredient | null>;
  abstract findMany(input: TFindManyRecipeIngredientsRepoInput): Promise<TRecipeIngredient[]>;
  abstract delete(input: TDeleteRecipeIngredientRepoInput): Promise<TRecipeIngredient>;

  abstract createMany(input: TCreateManyRecipeIngredientsRepoInput): Promise<TRecipeIngredient[]>;
}
