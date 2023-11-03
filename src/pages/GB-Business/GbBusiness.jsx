import { useEffect } from 'react';
import { GBBusinessForm, GBBusinessItem } from '../../components';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';

const GbBusiness = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='pt-[70px]'>
      <GBBusinessItem />
      <GBBusinessForm />
    </div>
  );
};

export default GbBusiness;
