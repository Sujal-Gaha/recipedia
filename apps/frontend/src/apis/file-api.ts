import { fileContract } from '@libs/contract';
import { initQueryClient } from '@ts-rest/react-query';
import { env } from '@/lib/env';

export const fileApi = initQueryClient(fileContract, {
  baseUrl: env.VITE_BACKEND_URL,
  baseHeaders: {},
  credentials: 'include',
});
