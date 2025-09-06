import {
  RecipeReview,
  TCreateRecipeReviewInput,
  TDeleteRecipeReviewInput,
  TGetAllRecipeReviewsInput,
  TGetRecipeReviewByIdInput,
  TDeleteManyRecipeReviewsInput,
  TUpdateRecipeReviewInput,
} from '@libs/contract';
import { BaseRepo } from '../../domain/base-repo';
import { logger } from '../../logger';

export type TRecipeReview = RecipeReview;

export type TCreateRecipeReviewRepoInput = {
  data: TCreateRecipeReviewInput;
};

export type TDeleteRecipeReviewRepoInput = {
  data: TDeleteRecipeReviewInput;
};

export type TFindRecipeReviewByIdRepoInput = {
  data: TGetRecipeReviewByIdInput;
};

export type TFindManyRecipeReviewsRepoInput = {
  data: TGetAllRecipeReviewsInput;
};

export type TUpdateRecipeReviewRepoInput = {
  id: string;
  data: TUpdateRecipeReviewInput;
};

export type TDeleteManyRecipeReviewsRepoOuput = {
  data: TDeleteManyRecipeReviewsInput;
};

export abstract class RecipeReviewRepo implements BaseRepo {
  log(): void {
    logger.info('Recipe Review Repo initialized...');
  }

  abstract create(input: TCreateRecipeReviewRepoInput): Promise<TRecipeReview>;
  abstract delete(input: TDeleteRecipeReviewRepoInput): Promise<TRecipeReview>;
  abstract findById(input: TFindRecipeReviewByIdRepoInput): Promise<TRecipeReview | null>;
  abstract findMany(input: TFindManyRecipeReviewsRepoInput): Promise<TRecipeReview[]>;
  abstract update(input: TUpdateRecipeReviewRepoInput): Promise<TRecipeReview>;

  abstract deleteMany(input: TDeleteManyRecipeReviewsRepoOuput): Promise<TRecipeReview[]>;
}
