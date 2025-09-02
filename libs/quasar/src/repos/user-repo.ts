import {
  TCreateUserInput,
  TGetUserByEmailInput,
  TGetUserByIdInput,
  TSignUpUserInput,
  TUpdateUserByEmailInput,
  TUpdateUserByIdInput,
  User,
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
}
