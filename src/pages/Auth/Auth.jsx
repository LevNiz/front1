import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/logo2.svg';
import back from '../../assets/icons/back.svg';
import { useSelector } from 'react-redux';
import { Loading } from '../../helpers/Loader/Loader';

const Auth = () => {
  const { loading } = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className='flex w-full mm:h-screen'>
      <div className='hidden mm:w-2/5 lg:w-2/6 bg-black mm:flex justify-center items-center'>
        <div onClick={() => navigate(-1)}>
          <img
            className='absolute top-10 left-10 cursor-pointer'
            src={back}
            alt='*'
          />
        </div>
        <NavLink to='/'>
          <img src={logo} alt='*' />
        </NavLink>
      </div>
      <div
        className={`${
          pathname !== '/auth/sign-up'
            ? 'mm:static mm:-translate-y-0 mm:top-0 absolute top-1/2 -translate-y-1/2 justify-around mm:py-20 h-full'
            : ''
        } w-full mm:w-3/5 lg:w-4/6 flex flex-col items-center py-12  px-4 overflow-y-scroll`}
      >
        <Outlet />
      </div>
      {loading ? <Loading /> : ''}
    </div>
  );
};

export default Auth;
