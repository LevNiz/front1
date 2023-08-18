import { Outlet } from 'react-router-dom';
import { ProfileSidebar } from '../../components';

const Profile = () => {
  return (
    <div className='px-3 sm:content py-12 lg:py-24 flex'>
      <ProfileSidebar />
      <Outlet />
    </div>
  );
};

export default Profile;
