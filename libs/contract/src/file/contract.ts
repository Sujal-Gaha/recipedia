import { initContract } from '@ts-rest/core';
import { BASE_API_PATH, ErrorSchema } from '../lib/schema';
import {
  CreateFileResponseSchema,
  DeleteFileInputSchema,
  DeleteFileResponseSchema,
  GetAllFilesResponseSchema,
  GetFileByIdResponseSchema,
  UpdateFileInputSchema,
  UpdateFileResponseSchema,
} from './schema';
import { z } from 'zod';

const c = initContract();

export const fileContract = c.router({
  createFile: {
    method: 'POST',
    path: `${BASE_API_PATH}/file/createFile`,
    contentType: 'multipart/form-data',
    body: z.object({
      file: z.any(),
    }),
    responses: {
      201: CreateFileResponseSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Create a file',
  },
  getFileById: {
    method: 'GET',
    path: `${BASE_API_PATH}/file/getFileById/:id`,
    responses: {
      200: GetFileByIdResponseSchema,
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get a file by id',
  },
  getAllFiles: {
    method: 'GET',
    path: `${BASE_API_PATH}/file/getAllFiles`,
    query: z.object({
      page: z.string(),
      perPage: z.string(),
    }),
    responses: {
      200: GetAllFilesResponseSchema,
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get all todos',
  },
  updateFile: {
    method: 'PUT',
    path: `${BASE_API_PATH}/file/updateFile/:id`,
    body: UpdateFileInputSchema,
    responses: {
      200: UpdateFileResponseSchema,
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Updated a file',
  },
  deleteFile: {
    method: 'POST',
    path: `${BASE_API_PATH}/file/deleteFile`,
    body: DeleteFileInputSchema,
    responses: {
      200: DeleteFileResponseSchema,
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Delete a file',
  },
});
