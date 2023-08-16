import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/logo2.svg';
import back from '../../assets/icons/back.svg';

const Auth = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className='flex w-full h-screen'>
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
          pathname !== '/auth/sign-up' ? 'justify-around mm:py-20' : ''
        } w-full mm:w-3/5 lg:w-4/6 flex flex-col items-center py-14  px-4 overflow-y-scroll`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
