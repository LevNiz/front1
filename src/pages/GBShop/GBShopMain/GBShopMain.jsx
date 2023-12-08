import { useEffect } from 'react';
import {
  Brands,
  Catalog,
  Electronics,
  Appliances,
  MainBlock,
  Garments,
  Shoes,
} from '../../../components';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';

const GBShopMain = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='pt-28 pb-10 content'>
      <MainBlock />
      <Catalog />
      <Brands />
      <Electronics />
      <Appliances />
      <Garments />
      <Shoes />
    </div>
  );
};

export default GBShopMain;
