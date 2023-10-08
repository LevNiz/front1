import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loading } from '../../helpers/Loader/Loader';

const Auth = () => {
  const { loading } = useSelector((state) => state?.user);

  return (
    <>
      <Outlet />
      {loading ? <Loading /> : ''}
    </>
  );
};

export default Auth;
