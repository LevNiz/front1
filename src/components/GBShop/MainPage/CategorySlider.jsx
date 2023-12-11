import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { NavLink } from 'react-router-dom';
import shopingCart from '../../../assets/gb-shop/icons/shopping-cart.svg';
import favourite from '../../../assets/gb-shop/icons/favourite.svg';
import share from '../../../assets/gb-shop/icons/share.svg';
import noImg from '../../../assets/images/no-image.jpeg';
import GBSHopEmpty from '../../../helpers/Errors/GBSHopEmpty';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';

const CategorySlider = ({ items, loading, error }) => {
  
  return (
    <>
      {loading ? (
        <ContentLoading extraStyle={320} />
      ) : error ? (
        <div className='flex justify-center my-8 bg-gray-50 p-3'>
          <ErrorServer />
        </div>
      ) : items?.length ? (
        <div className='pt-5 gb-shop slider'>
          <Swiper
            modules={[Navigation]}
            slidesPerView={5}
            navigation={items?.length > 5 ? true : false}
            className={`${items?.length > 5 ? 'min-h-[400px]' : '360px'} p-4`}
            spaceBetween={20}
          >
            {items?.map((el) => (
              <SwiperSlide modules={[Navigation]} key={el?.id}>
                <div className='overflow-hidden rounded-xl border-2 border-gray-100 relative shadow-[rgba(17,_17,_26,_0.1)_0px_5px_20px]'>
                  <NavLink
                    to={`items/${el?.id}`}
                    state={{
                      from: el?.category?.nameRus,
                      category: el?.category?.id,
                    }}
                  >
                    <div className='h-[210px] overflow-hidden relative bg-gray-50'>
                      <img
                        className='w-full h-full object-cover'
                        src={el?.image}
                        onError={(e) => {
                          e.target.onError = null;
                          e.target.src = noImg;
                        }}
                        alt='*'
                      />
                      <div className='absolute bottom-2 right-2 font-medium text-sm bg-colYellow py-[2px] px-2 rounded-sm z-10'>
                        {el?.cost} $
                      </div>
                      <div className='absolute bottom-0 left-0 w-full h-12 bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0.0)_0%,_rgba(0,_0,_0,_0.50)_200%)]'></div>
                      _{' '}
                    </div>
                  </NavLink>
                  {el?.country && (
                    <img
                      className='absolute top-3 left-3 min-w-[32px] w-8 h-8 object-cover rounded-full'
                      src={el?.country?.icon}
                      onError={(e) => {
                        e.target.onError = null;
                        e.target.src = noImg;
                      }}
                      alt='*'
                    />
                  )}
                  <div className='absolute top-4 right-4 w-8 h-8 cursor-pointer rounded-full bg-gray-300 bg-opacity-50 flex justify-center items-center'>
                    <img src={share} alt='*' />
                  </div>
                  <div className='p-2'>
                    <NavLink
                      to={`items/${el?.id}`}
                      state={{
                        from: el?.category?.nameRus,
                        category: el?.category?.id,
                      }}
                      className='font-bold text-sm line-clamp-1 break-all hover:underline pb-2 w-max'
                    >
                      {el?.name}
                    </NavLink>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center pt-1'>
                        <div className='min-w-[20px] w-5 h-5 rounded-full border border-gray-400'>
                          <img
                            className='w-full h-full object-cover rounded-full'
                            src={el?.supplier?.avatar}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = noImg;
                            }}
                            alt='*'
                          />
                        </div>
                        <p className='text-xs text-[#A7A9B7] ml-1 line-clamp-1 break-all'>
                          {el?.supplier?.fullname}
                        </p>
                      </div>
                      <div className='flex justify-end items-center space-x-2'>
                        <div className='flex justify-center items-center w-8 h-8 min-w-[32px] bg-[#e3e3e3] rounded-full cursor-pointer'>
                          <img className='w-5' src={favourite} alt='*' />
                        </div>
                        <div className='flex justify-center items-center w-8 h-8 min-w-[32px] bg-[#e3e3e3] rounded-full cursor-pointer'>
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
      ) : (
        <div className='flex justify-center my-8 bg-gray-50 p-3'>
          <GBSHopEmpty
            title='Ничего не нашли!'
            desc='В этой категории пока нет товаров.'
          />
        </div>
      )}
    </>
  );
};

export default CategorySlider;
