import {
  Brands,
  Catalog,
  Electronics,
  Appliances,
  MainBlock,
  Garments,
  Shoes,
} from '../../../components';

const GBShopMain = () => {
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
