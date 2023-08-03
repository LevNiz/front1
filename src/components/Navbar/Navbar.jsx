import { NavLink } from 'react-router-dom';
import logo from './../../assets/icons/logo.svg';

const Navbar = () => {
  return (
    <header className='bg-black py-2'>
      <div className='container flex justify-between items-center'>
        <NavLink to='/'>
          <img src={logo} alt='*' />
        </NavLink>
        <ul className='flex space-x-5 items-center text-white navbar'>
          <li>
            <NavLink to='/'>Главная</NavLink>
          </li>
          <li>
            <NavLink to='tracking'>Трекинг посылок</NavLink>
          </li>
          <li>
            <NavLink to='warehouses'>Наши склады</NavLink>
          </li>
        </ul>
        <button className='bg-colYellow w-24 h-10 rounded-lg hover:bg-colYellowHover duration-100'>
          Войти
        </button>
      </div>
    </header>
  );
};

export default Navbar;
