import { Outlet } from 'react-router-dom';
import { ProfileSidebar } from '../../components';

const Profile = () => {
  return (
    <div className='px-3 sm:content pt-20 md:pt-24 pb-12 flex relative'>
      <ProfileSidebar />
      <Outlet />
    </div>
  );
};

export default Profile;
