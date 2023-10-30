import { Outlet, useLocation } from 'react-router-dom';
import { ProfileSidebar } from '../../components';

const Profile = () => {
  const { pathname } = useLocation();
  const parts = pathname.split('/');
  const desiredPath = `/${parts[1]}/${parts[2]}/`;

  return (
    <div
      className={`${
        pathname === '/profile/tech-chat' || desiredPath === '/profile/gb-chat/'
          ? ''
          : 'px-3 pb-12'
      } sm:content pt-[70px] md:pt-24 flex relative`}
    >
      <ProfileSidebar />
      <Outlet />
    </div>
  );
};

export default Profile;
