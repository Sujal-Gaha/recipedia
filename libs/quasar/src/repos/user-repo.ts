import {
  TCreateUserInput,
  TGetUserByEmailInput,
  TGetUserByIdInput,
  TPaginationOutput,
  TSignUpUserInput,
  TSuspendUserInput,
  TTrueOrFalseInput,
  TUpdateUserByEmailInput,
  TUpdateUserByIdInput,
  User,
  UserTypeType,
} from '@libs/contract';
import { BaseRepo } from '../domain/base-repo';

export type TUser = User;

export type TCreateUserRepoInput = {
  data: TCreateUserInput;
};

export type TSignUpUserRepoInput = {
  data: TSignUpUserInput;
};

export type TUpdateUserByIdRepoInput = {
  id: string;
  data: TUpdateUserByIdInput;
};

export type TFindUserByIdRepoInput = {
  data: TGetUserByIdInput;
};

export type TUpdateUserByEmailRepoInput = {
  email: string;
  data: TUpdateUserByEmailInput;
};

export type TFindUserByEmailRepoInput = {
  data: TGetUserByEmailInput;
};

export type TVerifyEmailRepoInput = {
  data: {
    email: string;
  };
};

export type TSuspendUserRepoInput = {
  data: TSuspendUserInput;
};

export type TFindManyUsersRepoInput = {
  data: {
    page: number;
    perPage: number;
    global_filter?: string;
    user_type?: UserTypeType;
    is_email_verified?: TTrueOrFalseInput;
    is_suspended?: TTrueOrFalseInput;
  };
};

export type TFindManyUsersRepoOutput = {
  data: TUser[];
  pagination: TPaginationOutput;
};

export abstract class UserRepo implements BaseRepo {
  log(): void {
    console.log('User Repo initialized...');
  }

  abstract create(input: TCreateUserRepoInput): Promise<TUser>;
  abstract signUp(input: TSignUpUserRepoInput): Promise<TUser>;
  abstract updateById(input: TUpdateUserByIdRepoInput): Promise<TUser>;
  abstract findById(input: TFindUserByIdRepoInput): Promise<TUser | null>;

  abstract updateByEmail(input: TUpdateUserByEmailRepoInput): Promise<TUser>;
  abstract findByEmail(input: TFindUserByEmailRepoInput): Promise<TUser | null>;
  abstract verify(input: TVerifyEmailRepoInput): Promise<TUser>;

  abstract suspend(input: TSuspendUserInput): Promise<TUser>;
  abstract findMany(input: TFindManyUsersRepoInput): Promise<TFindManyUsersRepoOutput>;
}
