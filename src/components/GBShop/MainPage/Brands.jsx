import brand1 from '../../../assets/gb-shop/brands/brand1.svg';
import brand2 from '../../../assets/gb-shop/brands/brand2.svg';
import brand3 from '../../../assets/gb-shop/brands/brand3.svg';
import brand4 from '../../../assets/gb-shop/brands/brand4.svg';
import brand5 from '../../../assets/gb-shop/brands/brand5.svg';

const Brands = () => {
  return (
    <div className='py-10 content'>
      <div className='flex justify-between items-center bg-[#FBFBFB] py-2 px-5 mt-7 mb-12'>
        <h3 className='font-bold font-ubuntu text-[#030303] text-xl md:text-2xl lg:text-3xl'>
          Бренды
        </h3>
      </div>
      <div className='grid grid-cols-2 ld:grid-cols-3 xl:grid-cols-5 gap-5 shadow-[0_0_28px_#edebeb] rounded-lg p-5'>
        <img
          className='w-32 mm:w-40 min-h-[70px] sm:min-h-[90px] xl:min-h-[200px] mx-auto'
          src={brand1}
          alt='*'
        />
        <img
          className='w-32 mm:w-40 min-h-[70px] sm:min-h-[90px] xl:min-h-[200px] mx-auto'
          src={brand2}
          alt='*'
        />
        <img
          className='w-32 mm:w-40 min-h-[70px] sm:min-h-[90px] xl:min-h-[200px] mx-auto'
          src={brand3}
          alt='*'
        />
        <img
          className='w-32 mm:w-40 min-h-[70px] sm:min-h-[90px] xl:min-h-[200px] mx-auto'
          src={brand4}
          alt='*'
        />
        <img
          className='w-32 mm:w-40 min-h-[70px] sm:min-h-[90px] xl:min-h-[200px] mx-auto col-span-2 ld:col-span-1'
          src={brand5}
          alt='*'
        />
      </div>
    </div>
  );
};

export default Brands;
