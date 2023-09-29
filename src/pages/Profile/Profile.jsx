import { Outlet } from 'react-router-dom';
import { ProfileSidebar } from '../../components';

const Profile = () => {
  return (
    <div className='px-3 sm:content pt-24 md:pt-32 pb-12 flex relative'>
      <ProfileSidebar />
      <Outlet />
    </div>
  );
};

export default Profile;
