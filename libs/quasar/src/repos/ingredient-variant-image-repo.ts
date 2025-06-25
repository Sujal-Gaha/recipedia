import {
  TCreateIngredientVariantImageInput,
  TCreateIngredientVariantImageResponse,
  TDeleteIngredientVariantImageInput,
  TDeleteIngredientVariantImageResponse,
  TGetAllIngredientVariantImagesInput,
  TGetAllIngredientVariantImagesResponse,
  TGetIngredientVariantImageByIdInput,
  TGetIngredientVariantImageByIdResponse,
  TUpdateIngredientVariantImageInput,
  TUpdateIngredientVariantImageResponse,
} from '@libs/contract';

import { BaseRepo } from '../domain/base-repo';
import { logger } from '../logger';

/** -------- Input Types -------- */

export type TCreateIngredientVariantImageRepoInput = {
  data: TCreateIngredientVariantImageInput;
};

export type TUpdateIngredientVariantImageRepoInput = {
  id: string;
  data: TUpdateIngredientVariantImageInput;
};

export type TDeleteIngredientVariantImageRepoInput = {
  data: TDeleteIngredientVariantImageInput;
};

export type TFindIngredientVariantImageByIdRepoInput = {
  data: TGetIngredientVariantImageByIdInput;
};

export type TFindManyIngredientVariantImagesRepoInput = {
  data: TGetAllIngredientVariantImagesInput;
};

/** -------- Output Types -------- */

export type TFindManyIngredientVariantImagesRepoOutput = {
  data: TGetAllIngredientVariantImagesResponse['data'];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
};

/** -------- Abstract Repo -------- */

export abstract class IngredientVariantImageRepo implements BaseRepo {
  log(): void {
    logger.info('Ingredient Variant Image Repo initialized...');
  }

  abstract create(
    input: TCreateIngredientVariantImageRepoInput
  ): Promise<TCreateIngredientVariantImageResponse['data']>;

  abstract update(
    input: TUpdateIngredientVariantImageRepoInput
  ): Promise<TUpdateIngredientVariantImageResponse['data']>;

  abstract delete(
    input: TDeleteIngredientVariantImageRepoInput
  ): Promise<TDeleteIngredientVariantImageResponse['data']>;

  abstract findById(
    input: TFindIngredientVariantImageByIdRepoInput
  ): Promise<TGetIngredientVariantImageByIdResponse['data'] | null>;

  abstract findMany(
    input: TFindManyIngredientVariantImagesRepoInput
  ): Promise<TFindManyIngredientVariantImagesRepoOutput>;
}
