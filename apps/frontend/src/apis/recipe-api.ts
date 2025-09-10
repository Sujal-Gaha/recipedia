import { initQueryClient } from '@ts-rest/react-query';
import { env } from '@/lib/env';
import { recipeContract } from '@libs/contract';

export const recipeApi = initQueryClient(recipeContract, {
  baseUrl: env.VITE_BACKEND_URL,
  baseHeaders: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});
