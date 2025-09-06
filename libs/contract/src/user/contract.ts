import { initContract } from '@ts-rest/core';
import {
  GetAllUsersInputSchema,
  GetAllUsersResponseSchema,
  GetUserByIdResponseSchema,
  SuspendUserInputSchema,
  SuspendUserResponseSchema,
} from './schema';
import { BASE_API_PATH, ErrorSchema } from '../lib/schema';

const c = initContract();

export const userContract = c.router({
  getAllUsers: {
    method: 'GET',
    path: `${BASE_API_PATH}/user/getAllUsers`,
    query: GetAllUsersInputSchema,
    responses: {
      200: GetAllUsersResponseSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get all users',
  },

  getUserById: {
    method: 'GET',
    path: `${BASE_API_PATH}/user/getUserById/:id`,
    responses: {
      200: GetUserByIdResponseSchema,
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get a user by id',
  },

  suspendUser: {
    method: 'POST',
    path: `${BASE_API_PATH}/user/suspendUser`,
    body: SuspendUserInputSchema,
    responses: {
      200: SuspendUserResponseSchema,
      400: ErrorSchema,
      500: ErrorSchema,
    },
  },
});
