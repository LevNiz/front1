import { Outlet } from 'react-router-dom';
import { ProfileSidebar } from '../../components';

const Profile = () => {
  return (
    <div className='px-3 sm:content pt-6 md:pt-12 pb-24 lg:py-24 flex relative'>
      <ProfileSidebar />
      <Outlet />
    </div>
  );
};

export default Profile;
