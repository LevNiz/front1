import { useSelector } from 'react-redux';
import { AuthParcel, UnAuthParcel } from '../../components';
const Tracking = () => {
  const user = useSelector((state) => state?.user?.user);

  return (
    <div className='content py-12'>
      {user ? <AuthParcel /> : <UnAuthParcel />}
    </div>
  );
};

export default Tracking;
