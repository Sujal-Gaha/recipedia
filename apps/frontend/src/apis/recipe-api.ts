import { initQueryClient } from '@ts-rest/react-query';
import { env } from '../lib/env';
import { recipeContract } from '@libs/contract';

export const recipeApi = initQueryClient(recipeContract, {
  baseUrl: env.BACKEND_URL,
  baseHeaders: {
    'content-type': 'application/json',
  },
  credentials: 'include',
});
