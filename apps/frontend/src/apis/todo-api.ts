'use client';

import { initQueryClient } from '@ts-rest/react-query';
import { todoContract } from '@libs/contract';
import { tsRestFetchApi } from '@ts-rest/core';
import { getSession } from '../lib/auth';
import { env } from '@libs/quasar';

export const todoApi = initQueryClient(todoContract, {
  baseUrl: env.BACKEND_URL,
  baseHeaders: {
    'x-tenant-id': 'youroshc_dev',
  },
  api: async (d) => {
    try {
      const session = await getSession();
      if (session) {
        d.headers['authorization'] = `Bearer ${session.token}`;
      }
    } catch (e) {
      console.error(e);
    }

    return tsRestFetchApi(d);
  },
});
