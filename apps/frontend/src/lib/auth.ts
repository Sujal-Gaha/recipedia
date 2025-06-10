import { authClient } from '@libs/auth';

export const getSession = async () => {
  const { data } = await authClient.getSession();

  if (!data) {
    return null;
  }

  return data.session;
};
