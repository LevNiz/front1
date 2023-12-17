import { useEffect } from 'react';
import { GBBusinessForm, GBBusinessItem } from '../../components';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';

const GBBusiness = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='pt-16 content'>
      <GBBusinessItem />
      <GBBusinessForm />
    </div>
  );
};

export default GBBusiness;
