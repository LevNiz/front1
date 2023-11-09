import { useEffect } from 'react';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';
import { GBFranchiseForm, GBFranchiseItem } from '../../components';

const GBFranchises = () => {
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

export default GBFranchises;
