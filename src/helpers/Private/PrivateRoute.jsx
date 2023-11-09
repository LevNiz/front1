import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

const PrivateRoute = () => {
  const hasNotification = useOutletContext();
  const token = localStorage.getItem('accessToken');

  return token ? (
    <Outlet context={{ hasNotification }} />
  ) : (
    <Navigate to='/auth/sign-in' />
  );
};

export default PrivateRoute;
