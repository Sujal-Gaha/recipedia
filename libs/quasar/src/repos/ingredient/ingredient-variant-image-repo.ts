import {
  IngredientVariantImage,
  TCreateIngredientVariantImageInput,
  TDeleteIngredientVariantImageInput,
  TGetAllIngredientVariantImagesInput,
  TGetAllIngredientVariantImagesOutput,
  TGetIngredientVariantImageByIdInput,
  TPaginationOutput,
  TUpdateIngredientVariantImageInput,
} from '@libs/contract';
import { BaseRepo } from '../../domain/base-repo';
import { logger } from '../../logger';

export type TIngredientVariantImage = IngredientVariantImage;

export type TCreateIngredientVariantImageRepoInput = {
  data: TCreateIngredientVariantImageInput;
};

export type TDeleteIngredientVariantImageRepoInput = {
  data: TDeleteIngredientVariantImageInput;
};

export type TUpdateIngredientVariantImageRepoInput = {
  id: string;
  data: TUpdateIngredientVariantImageInput;
};

export type TFindIngredientVariantImageByIdRepoInput = {
  data: TGetIngredientVariantImageByIdInput;
};

export type TFindManyIngredientVariantImagesRepoInput = {
  data: TGetAllIngredientVariantImagesInput;
};

export type TFindManyIngredientVariantImagesRepoOutput = {
  data: TGetAllIngredientVariantImagesOutput[];
  pagination: TPaginationOutput;
};

export abstract class IngredientVariantImageRepo implements BaseRepo {
  log(): void {
    logger.info('Ingredient Variant Image Repo initialized...');
  }

  abstract create(input: TCreateIngredientVariantImageRepoInput): Promise<TIngredientVariantImage>;
  abstract delete(input: TDeleteIngredientVariantImageRepoInput): Promise<TIngredientVariantImage>;
  abstract update(input: TUpdateIngredientVariantImageRepoInput): Promise<TIngredientVariantImage>;
  abstract findById(input: TFindIngredientVariantImageByIdRepoInput): Promise<TIngredientVariantImage | null>;
  abstract findMany(
    input: TFindManyIngredientVariantImagesRepoInput
  ): Promise<TFindManyIngredientVariantImagesRepoOutput>;
}
