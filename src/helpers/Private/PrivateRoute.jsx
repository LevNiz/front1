import { useSelector } from 'react-redux';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

const PrivateRoute = () => {
  const hasNotification = useOutletContext();
  const { user } = useSelector((state) => state?.user);

  return user ? (
    <Outlet context={{ hasNotification }} />
  ) : (
    <Navigate to='/auth/sign-in' />
  );
};

export default PrivateRoute;
