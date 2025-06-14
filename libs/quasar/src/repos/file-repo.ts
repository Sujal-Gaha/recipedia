import {
  TCreateFileInput,
  TDeleteFileInput,
  TUpdateFileInput,
  TGetFileByIdInput,
  TGetAllFilesInput,
  TGetAllFilesOutput,
  TPaginationOutput,
} from '@libs/contract';
import { BaseRepo } from '../domain/base-repo';
import { logger } from '../logger';
import { z } from 'zod';
import { FileSchema } from '@libs/contract';
export type TFile = z.infer<typeof FileSchema>;

export type TCreateFileRepoInput = {
  data: TCreateFileInput;
};

export type TDeleteFileRepoInput = {
  data: TDeleteFileInput;
};

export type TUpdateFileRepoInput = {
  id: string;
  data: TUpdateFileInput;
};

export type TFindFileByIdRepoInput = {
  data: TGetFileByIdInput;
};

export type TFindManyFilesRepoInput = {
  data: TGetAllFilesInput;
};

export type TFindManyFilesRepoOutput = {
  data: TGetAllFilesOutput[];
  pagination: TPaginationOutput;
};

export abstract class FileRepo implements BaseRepo {
  log(): void {
    logger.info('Todo Repo initialized...');
  }

  abstract create(input: TCreateFileRepoInput): Promise<TFile>;
  abstract delete(input: TDeleteFileRepoInput): Promise<TFile>;
  abstract update(input: TUpdateFileRepoInput): Promise<TFile>;
  abstract findById(input: TFindFileByIdRepoInput): Promise<TFile | null>;
  abstract findMany(input: TFindManyFilesRepoInput): Promise<TFindManyFilesRepoOutput>;
}
