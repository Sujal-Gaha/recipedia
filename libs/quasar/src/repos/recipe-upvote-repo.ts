import {
  RecipeUpvote,
  TCreateRecipeUpvoteInput,
  TDeleteRecipeUpvoteInput,
  TGetAllRecipeUpvotesInput,
  TGetRecipeUpvoteByIdInput,
  TDeleteManyRecipeUpvotesInput,
} from '@libs/contract';
import { BaseRepo } from '../domain/base-repo';
import { logger } from '../logger';

export type TRecipeUpvote = RecipeUpvote;

export type TCreateRecipeUpvoteRepoInput = {
  data: TCreateRecipeUpvoteInput;
};

export type TDeleteRecipeUpvoteRepoInput = {
  data: TDeleteRecipeUpvoteInput;
};

export type TFindRecipeUpvoteByIdRepoInput = {
  data: TGetRecipeUpvoteByIdInput;
};

export type TFindManyRecipeUpvotesRepoInput = {
  data: TGetAllRecipeUpvotesInput;
};

export type TDeleteManyRecipeUpvotesRepoOuput = {
  data: TDeleteManyRecipeUpvotesInput;
};

export abstract class RecipeUpvoteRepo implements BaseRepo {
  log(): void {
    logger.info('Recipe Upvote Repo initialized...');
  }

  abstract create(input: TCreateRecipeUpvoteRepoInput): Promise<TRecipeUpvote>;
  abstract delete(input: TDeleteRecipeUpvoteRepoInput): Promise<TRecipeUpvote>;
  abstract findById(input: TFindRecipeUpvoteByIdRepoInput): Promise<TRecipeUpvote | null>;
  abstract findMany(input: TFindManyRecipeUpvotesRepoInput): Promise<TRecipeUpvote[]>;

  abstract deleteMany(input: TDeleteManyRecipeUpvotesRepoOuput): Promise<TRecipeUpvote[]>;
}
