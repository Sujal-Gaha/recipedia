import {
  RecipeStep,
  TCreateRecipeStepInput,
  TDeleteRecipeStepInput,
  TGetAllRecipeStepsInput,
  TGetRecipeStepByIdInput,
  TDeleteManyRecipeStepsInput,
} from '@libs/contract';
import { BaseRepo } from '../domain/base-repo';
import { logger } from '../logger';

export type TRecipeStep = RecipeStep;

export type TCreateRecipeStepRepoInput = {
  data: TCreateRecipeStepInput;
};

export type TDeleteRecipeStepRepoInput = {
  data: TDeleteRecipeStepInput;
};

export type TFindRecipeStepByIdRepoInput = {
  data: TGetRecipeStepByIdInput;
};

export type TFindManyRecipeStepsRepoInput = {
  data: TGetAllRecipeStepsInput;
};

export type TDeleteManyRecipeStepsRepoOuput = {
  data: TDeleteManyRecipeStepsInput;
};

export abstract class RecipeStepRepo implements BaseRepo {
  log(): void {
    logger.info('Recipe Step Repo initialized...');
  }

  abstract create(input: TCreateRecipeStepRepoInput): Promise<TRecipeStep>;
  abstract delete(input: TDeleteRecipeStepRepoInput): Promise<TRecipeStep>;
  abstract findById(input: TFindRecipeStepByIdRepoInput): Promise<TRecipeStep | null>;
  abstract findMany(input: TFindManyRecipeStepsRepoInput): Promise<TRecipeStep[]>;

  abstract deleteMany(input: TDeleteManyRecipeStepsRepoOuput): Promise<TRecipeStep[]>;
}
