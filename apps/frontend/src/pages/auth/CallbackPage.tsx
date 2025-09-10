import { Link, useNavigate } from 'react-router-dom';
import { useMeQuery } from '../../apis/auth/query';
import { Error } from '../../components/error';
import { PageLoader } from '../../components/PageLoader';
import { _FULL_ROUTES } from '../../constants/routes';
import { useEffect } from 'react';
import { useUserStore } from '../../stores/useUserStore';

export const CallbackPage = () => {
  const { setUser } = useUserStore();

  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError } = useMeQuery();

  useEffect(() => {
    if (isSuccess) {
      setUser(data.data.me);
      if (data.data.me.user_type === 'USER' || data.data.me.user_type === 'CHEF') {
        navigate(_FULL_ROUTES.HOME);
      }

      if (data.data.me.user_type === 'ADMIN') {
        navigate(_FULL_ROUTES.ADMIN_DASHBOARD);
      }
    }
  }, [data?.data.me, data?.data.me.user_type, isSuccess, navigate, setUser]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    setUser(null);

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
