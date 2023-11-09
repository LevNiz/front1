import { useEffect } from 'react';
import { GBFranchiseForm, GBFranchiseItem } from '../../components';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';

const GBFranchise = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='pt-[70px]'>
      <GBFranchiseItem />
      <GBFranchiseForm />
    </div>
  );
};

export default GBFranchise;
