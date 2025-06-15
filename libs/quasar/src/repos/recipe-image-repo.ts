import {
  RecipeImage,
  TCreateRecipeImageInput,
  TDeleteRecipeImageInput,
  TGetAllRecipeImagesInput,
  TGetAllRecipeImagesOutput,
  TGetRecipeImageByIdInput,
  TDeleteManyRecipeImagesInput,
} from '@libs/contract';
import { BaseRepo } from '../domain/base-repo';
import { logger } from '../logger';

export type TRecipeImage = RecipeImage;

export type TCreateRecipeImageRepoInput = {
  data: TCreateRecipeImageInput;
};

export type TDeleteRecipeImageRepoInput = {
  data: TDeleteRecipeImageInput;
};

export type TFindRecipeImageByIdRepoInput = {
  data: TGetRecipeImageByIdInput;
};

export type TFindManyRecipeImagesRepoInput = {
  data: TGetAllRecipeImagesInput;
};

export type TDeleteManyRecipeImagesRepoOuput = {
  data: TDeleteManyRecipeImagesInput;
};

export abstract class RecipeImageRepo implements BaseRepo {
  log(): void {
    logger.info('Recipe Image Repo initialized...');
  }

  abstract create(input: TCreateRecipeImageRepoInput): Promise<TRecipeImage>;
  abstract delete(input: TDeleteRecipeImageRepoInput): Promise<TRecipeImage>;
  abstract findById(input: TFindRecipeImageByIdRepoInput): Promise<TRecipeImage | null>;
  abstract findMany(input: TFindManyRecipeImagesRepoInput): Promise<TGetAllRecipeImagesOutput[]>;

  abstract deleteMany(input: TDeleteManyRecipeImagesRepoOuput): Promise<TRecipeImage[]>;
}
