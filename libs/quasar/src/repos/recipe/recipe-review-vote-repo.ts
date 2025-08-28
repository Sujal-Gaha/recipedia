import {
  RecipeReviewVote,
  TCreateRecipeReviewVoteInput,
  TDeleteRecipeReviewVoteInput,
  TGetAllRecipeReviewVotesInput,
  TGetRecipeReviewVoteByIdInput,
  TDeleteManyRecipeReviewVotesInput,
} from '@libs/contract';
import { BaseRepo } from '../../domain/base-repo';
import { logger } from '../../logger';

export type TRecipeReviewVote = RecipeReviewVote;

export type TCreateRecipeReviewVoteRepoInput = {
  data: TCreateRecipeReviewVoteInput;
};

export type TDeleteRecipeReviewVoteRepoInput = {
  data: TDeleteRecipeReviewVoteInput;
};

export type TFindRecipeReviewVoteByIdRepoInput = {
  data: TGetRecipeReviewVoteByIdInput;
};

export type TFindManyRecipeReviewVotesRepoInput = {
  data: TGetAllRecipeReviewVotesInput;
};

export type TDeleteManyRecipeReviewVotesRepoOuput = {
  data: TDeleteManyRecipeReviewVotesInput;
};

export abstract class RecipeReviewVoteRepo implements BaseRepo {
  log(): void {
    logger.info('Recipe Review Vote Repo initialized...');
  }

  abstract create(input: TCreateRecipeReviewVoteRepoInput): Promise<TRecipeReviewVote>;
  abstract delete(input: TDeleteRecipeReviewVoteRepoInput): Promise<TRecipeReviewVote>;
  abstract findById(input: TFindRecipeReviewVoteByIdRepoInput): Promise<TRecipeReviewVote | null>;
  abstract findMany(input: TFindManyRecipeReviewVotesRepoInput): Promise<TRecipeReviewVote[]>;

  abstract deleteMany(input: TDeleteManyRecipeReviewVotesRepoOuput): Promise<TRecipeReviewVote[]>;
}
