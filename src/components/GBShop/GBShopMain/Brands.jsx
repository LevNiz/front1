import brand1 from '../../../assets/gb-shop/brands/brand1.svg';
import brand2 from '../../../assets/gb-shop/brands/brand2.svg';
import brand3 from '../../../assets/gb-shop/brands/brand3.svg';
import brand4 from '../../../assets/gb-shop/brands/brand4.svg';
import brand5 from '../../../assets/gb-shop/brands/brand5.svg';

const Brands = () => {
  return (
    <div className='py-10'>
      <div className='flex justify-between items-center bg-[#FBFBFB] py-2 px-5 mt-7 mb-12'>
        <h3 className='font-bold font-ubuntu text-[#030303] text-3xl'>
          Бренды
        </h3>
      </div>
      <div className='flex flex-row items-center justify-center space-x-10 shadow-[0_0_28px_#edebeb] rounded-md px-5 py-8 min-h-[200px]'>
        <img src={brand1} alt='*' />
        <img src={brand2} alt='*' />
        <img src={brand3} alt='*' />
        <img src={brand4} alt='*' />
        <img src={brand5} alt='*' />
      </div>
    </div>
  );
};

export default Brands;
