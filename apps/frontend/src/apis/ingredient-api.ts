import { initQueryClient } from '@ts-rest/react-query';
import { env } from '@/lib/env';
import { ingredientContract } from '@libs/contract';

export const ingredientApi = initQueryClient(ingredientContract, {
  baseUrl: env.VITE_BACKEND_URL,
  baseHeaders: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});
