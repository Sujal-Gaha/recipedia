import { ingredientContract } from '@libs/contract';
import { initQueryClient } from '@ts-rest/react-query';
import { env } from '../lib/env';

export const ingredientApi = initQueryClient(ingredientContract, {
  baseUrl: env.BACKEND_URL,
  baseHeaders: {
    'content-type': 'application/json',
  },
  credentials: 'include',
});
