import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { NavLink } from 'react-router-dom';
import rightArrow from '../../../assets/gb-shop/icons/right.svg';
import shopingCart from '../../../assets/gb-shop/icons/shopping-cart.svg';
import favourite from '../../../assets/gb-shop/icons/favourite.svg';
import share from '../../../assets/gb-shop/icons/share.svg';
import { shoes } from '../../../constants/gb-shop/shoes.js';

const Shoes = () => {
  return (
    <div className='py-10 gb-shop slider'>
      <div className='flex justify-between items-center bg-[#FBFBFB] py-2 px-5 my-7'>
        <h3 className='font-bold font-ubuntu text-[#030303] text-3xl'>Обувь</h3>
        <NavLink className='flex items-center justify-end' to='catalog'>
          <span className='font-medium text-xl mr-2 text-[#FEDE2B]'>Все</span>
          <img src={rightArrow} alt='*' />
        </NavLink>
      </div>
      <div className='pt-7'>
        <Swiper
          modules={[Navigation]}
          slidesPerView={5}
          navigation={true}
          className='min-h-[400px]'
          spaceBetween={20}
        >
          {shoes?.map((el) => (
            <SwiperSlide modules={[Navigation]} key={el?.id}>
              <div className='overflow-hidden rounded-xl shadow-lg relative'>
                <NavLink to='#'>
                  <div className='h-[210px] overflow-hidden'>
                    <img
                      className='w-full h-full object-cover'
                      src={el?.image}
                      alt='*'
                    />
                  </div>
                </NavLink>
                <img
                  className='absolute top-4 left-4 rounded-full'
                  src={el?.countryFlag}
                  alt='*'
                />
                <div className='absolute top-4 right-4 w-8 h-8 cursor-pointer rounded-full bg-gray-300 bg-opacity-50 flex justify-center items-center'>
                  <img src={share} alt='*' />
                </div>
                <div className='p-3'>
                  <NavLink
                    to='#'
                    className='font-bold text-sm line-clamp-1 break-all hover:underline pb-2'
                  >
                    {el?.name}
                  </NavLink>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center pt-1'>
                      <img className='w-[15px]' src={el?.storeLogo} alt='*' />
                      <p className='text-xs text-[#A7A9B7] ml-1 line-clamp-1 break-all'>
                        {el?.storeName}
                      </p>
                    </div>
                    <div className='flex justify-end items-center space-x-3'>
                      <div className='flex justify-center items-center w-8 h-8 min-w-[32px] bg-[#f0efef] rounded-full cursor-pointer'>
                        <img className='w-5' src={favourite} alt='*' />
                      </div>
                      <div className='flex justify-center items-center w-8 h-8 min-w-[32px] bg-[#f0efef] rounded-full cursor-pointer'>
                        <img className='w-5' src={shopingCart} alt='*' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Shoes;
