import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ProfileSidebar } from '../../components';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';

const Profile = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div
      className={`${
        pathname === '/profile/tech-chat' ? '' : 'px-3 pb-12'
      } sm:content pt-[70px] md:pt-24 flex relative`}
    >
      <ProfileSidebar />
      <Outlet />
    </div>
  );
};

export default Profile;
