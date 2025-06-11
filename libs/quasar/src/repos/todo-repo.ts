import {
  Todo,
  TCreateTodoInput,
  TUpdateTodoInput,
  TPaginationOutput,
  TDeleteTodoInput,
  TGetAllTodosInput,
  TGetAllTodosOutput,
  TGetTodoByIdInput,
} from '@libs/contract';
import { BaseRepo } from '../domain/base-repo';
import { logger } from '../logger';

export type TTodo = Todo;

export type TCreateTodoRepoInput = {
  data: TCreateTodoInput;
};

export type TDeleteTodoRepoInput = {
  data: TDeleteTodoInput;
};

export type TUpdateTodoRepoInput = {
  id: string;
  data: TUpdateTodoInput;
};

export type TFindTodoByIdRepoInput = {
  data: TGetTodoByIdInput;
};

export type TFindManyTodosRepoInput = {
  data: TGetAllTodosInput;
};

export type TFindManyTodosRepoOutput = {
  data: TGetAllTodosOutput[];
  pagination: TPaginationOutput;
};

export abstract class TodoRepo implements BaseRepo {
  log(): void {
    logger.info('Todo Repo initialized...');
  }

  abstract create(input: TCreateTodoRepoInput): Promise<TTodo>;
  abstract delete(input: TDeleteTodoRepoInput): Promise<TTodo>;
  abstract update(input: TUpdateTodoRepoInput): Promise<TTodo>;
  abstract findById(input: TFindTodoByIdRepoInput): Promise<TTodo | null>;
  abstract findMany(input: TFindManyTodosRepoInput): Promise<TFindManyTodosRepoOutput>;
}
