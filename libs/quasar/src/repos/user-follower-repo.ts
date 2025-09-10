import { TToggleUserFollowerInput, UserFollower } from '@libs/contract';
import { BaseRepo } from '../domain/base-repo';

export type TUserFollower = UserFollower;

export type TToggleRepoInput = {
  data: TToggleUserFollowerInput;
};

export abstract class UserFollowerRepo implements BaseRepo {
  log(): void {
    console.log('User Follower Repo initialized...');
  }

  abstract toggle(input: TToggleRepoInput): Promise<TUserFollower>;
}
