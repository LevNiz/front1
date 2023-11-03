import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AuthParcel, UnAuthParcel } from '../../components';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';

const Tracking = () => {
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content pt-24 pb-12 min-h-[768px]'>
      {user ? <AuthParcel /> : <UnAuthParcel />}
    </div>
  );
};

export default Tracking;
