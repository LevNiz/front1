import { Outlet } from "react-router-dom";
import { ProfileSidebar } from "../../components";

const Profile = () => {
  return (
    <div className='content py-12 flex'>
      <ProfileSidebar />
      <Outlet />
    </div>
  );
};

export default Profile;
