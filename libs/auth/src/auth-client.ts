import { adminClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { env } from '@libs/quasar';

export const authClient = createAuthClient({
  baseURL: env.BACKEND_URL,
  plugins: [adminClient()],
  fetchOptions: {
    onSuccess: (response) => {
      response.request.headers['email'] = response.data.email;
      response.request.headers['id'] = response.data.id;
    },
  },
});
