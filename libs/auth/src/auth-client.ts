import { adminClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { env } from '@libs/quasar';

export const authClient = createAuthClient({
  baseURL: env.BACKEND_URL,
  plugins: [adminClient()],
});
