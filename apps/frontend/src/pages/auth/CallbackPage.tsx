import { Link, useNavigate } from 'react-router-dom';
import { useMeQuery } from '../../apis/auth/query';
import { Error } from '../../components/error';
import { PageLoader } from '../../components/PageLoader';
import { _FULL_ROUTES } from '../../constants/routes';
import { useEffect } from 'react';

export const CallbackPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError } = useMeQuery();

  useEffect(() => {
    if (isSuccess) {
      if (data.data.me.user_type === 'USER') {
        navigate(_FULL_ROUTES.HOME);
      }

      if (data.data.me.user_type === 'ADMIN') {
        navigate(_FULL_ROUTES.ADMIN_DASHBOARD);
      }
    }
  }, [data?.data.me.user_type, isSuccess, navigate]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return (
      <Error
        message={'You are not logged in!'}
        actionNode={
          <Link to={_FULL_ROUTES.LOGIN} className="text-blue-500 underline">
            Go to login
          </Link>
        }
      />
    );
  }

  return (
    <Error
      message="Something went wrong! Please login again."
      actionNode={
        <Link to={_FULL_ROUTES.LOGIN} className="text-blue-500 underline">
          Go to login
        </Link>
      }
    />
  );
};
