import { useSelector } from 'react-redux';
import { AuthParcel, UnAuthParcel } from '../../components';
const Tracking = () => {
  const user = useSelector((state) => state?.user?.user);

  return (
    <div className='content pt-32 pb-12 min-h-[768px]'>
      {user ? <AuthParcel /> : <UnAuthParcel />}
    </div>
  );
};

export default Tracking;
