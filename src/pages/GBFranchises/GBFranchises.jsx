import { useEffect } from 'react';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';
import { GBFranchiseItem } from '../../components';

const GBFranchises = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='pt-14'>
      <GBFranchiseItem />
    </div>
  );
};

export default GBFranchises;
