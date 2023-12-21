import { useSelector } from 'react-redux';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

const PrivateRoute = () => {
  const hasNotification = useOutletContext();
  const token = localStorage.getItem('accessToken');
  const { userID } = useSelector((state) => state?.user);

  return token && userID ? (
    <Outlet context={{ hasNotification }} />
  ) : (
    <Navigate to='/auth/sign-in' />
  );
};

export default PrivateRoute;
