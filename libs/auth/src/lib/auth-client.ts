import { adminClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4321';

export const authClient = createAuthClient({
  baseURL: BACKEND_URL,
  plugins: [
    adminClient()
  ]
});