import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const Layout = () => {
  const { pathname } = useLocation();
  const pathParts = pathname.split('/');

  const firstPathSegment = pathParts[1];

  return (
    <>
      <Navbar />
      <Outlet />
      {firstPathSegment === 'profile' ? (
        ''
      ) : firstPathSegment === 'gb-chat' ? (
        ''
      ) : (
        <Footer />
      )}
    </>
  );
};

export default Layout;
