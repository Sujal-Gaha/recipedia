import { ReactNode } from 'react';
import { useMeQuery } from '@/apis/auth/query';
import { Error } from './error';
import { Link } from 'react-router-dom';
import { PageLoader } from './PageLoader';
import { _FULL_ROUTES } from '@/constants/routes';
import { useUserStore } from '@/stores/useUserStore';

export const WithAuth = ({ children }: { children: ReactNode }) => {
  const meQuery = useMeQuery();

  if (meQuery.isLoading) return <PageLoader />;

  if (meQuery.data?.code !== 'ME_SUCCESS') {
    return (
      <Error
        message="You are not logged in!"
        actionNode={
          <Link to={_FULL_ROUTES.LOGIN} className="text-blue-500 underline">
            Go to login
          </Link>
        }
      />
    );
  }

  return children;
};

export const AdminWithAuth = ({ children }: { children: ReactNode }) => {
  const meQuery = useMeQuery();

  if (meQuery.isLoading) return <PageLoader />;

  if (meQuery.data?.code !== 'ME_SUCCESS') {
    return (
      <Error
        message="You are not logged in!"
        actionNode={
          <Link to={_FULL_ROUTES.LOGIN} className="text-blue-500 underline">
            Go to login
          </Link>
        }
      />
    );
  }

  if (meQuery.data.data.me.user_type !== 'ADMIN') {
    return (
      <Error
        message="You are not authorized!"
        actionNode={
          <Link to={_FULL_ROUTES.LOGIN} className="text-blue-500 underline">
            Go to login
          </Link>
        }
      />
    );
  }

  return children;
};

export const UserWithAuthStore = ({ children }: { children: ReactNode }) => {
  const meQuery = useMeQuery();

  const { setUser } = useUserStore();

  if (meQuery.isLoading) return <PageLoader />;

  if (meQuery.data?.code !== 'ME_SUCCESS') {
    setUser(null);
  }

  return children;
};
