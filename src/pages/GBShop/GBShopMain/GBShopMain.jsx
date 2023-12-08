import { Brands, Catalog, Electronics, MainBlock } from '../../../components';

const GBShopMain = () => {
  return (
    <div className='pt-28 pb-10 content'>
      <MainBlock />
      <Catalog />
      <Brands />
      <Electronics />
    </div>
  );
};

export default GBShopMain;
