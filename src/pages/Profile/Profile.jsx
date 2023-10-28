import { Outlet, useLocation } from 'react-router-dom';
import { ProfileSidebar } from '../../components';

const Profile = () => {
  const { pathname } = useLocation();
  const pathParts = pathname.split('/');

  const firstPathSegment = pathParts[2];

  return (
    <div
      className={`${
        firstPathSegment === 'tech-chat' ? '' : 'md:px-3 pb-12'
      } sm:content pt-[70px] md:pt-24 flex relative`}
    >
      <ProfileSidebar />
      <Outlet />
    </div>
  );
};

export default Profile;
