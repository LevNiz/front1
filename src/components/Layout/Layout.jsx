import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className='content h-[63vh]'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
