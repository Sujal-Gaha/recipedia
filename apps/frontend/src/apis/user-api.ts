import { env } from '@/lib/env';
import { userContract } from '@libs/contract';
import { initQueryClient } from '@ts-rest/react-query';

export const userApi = initQueryClient(userContract, {
  baseUrl: env.VITE_BACKEND_URL,
  baseHeaders: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});
