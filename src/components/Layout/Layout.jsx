import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import MobileNavbar from '../Navbar/MobileNavbar';
import Navbar from '../Navbar/Navbar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <MobileNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
