import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import { ErrorEmpty } from '../../../helpers/Errors/ErrorEmpty';
import noImg from '../../../assets/images/no-image.svg';

const HomeBrands = () => {
  const { stores, loading, error } = useSelector((state) => state?.stores);

  return (
    <div className='py-10 content'>
      <div className='flex justify-between items-center bg-[#FBFBFB] py-1 lg:py-2 px-3 lg:px-5 mt-7 mm:mb-12'>
        <h3 className='font-bold font-ubuntu text-[#030303] text-xl md:text-2xl lg:text-3xl'>
          Бренды
        </h3>
      </div>
      {loading ? (
        <ContentLoading extraStyle={240} />
      ) : error ? (
        <ErrorServer />
      ) : stores?.length ? (
        <div className='pt-5 gb-shop'>
          <Swiper
            modules={[Navigation]}
            slidesPerView={7}
            navigation={true}
            className='pb-20'
            breakpoints={{
              260: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
              992: {
                slidesPerView: 6,
                spaceBetween: 16,
              },
              1200: {
                slidesPerView: 7,
                spaceBetween: 16,
              },
            }}
          >
            {stores?.map((el) => (
              <SwiperSlide modules={[Navigation]} key={el?.id}>
                <NavLink
                  to='brands'
                  state={{ from: el?.nameRus, category: el?.id }}
                  className='group p-3'
                  key={el?.id}
                >
                  <div className='h-[92px] md:h-32 xl:h-36 flex justify-center items-center shadow-md group-hover:shadow-xl overflow-hidden duration-150 rounded-xl'>
                    <img
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = noImg;
                      }}
                      className='mx-auto w-full h-full object-contain'
                      src={el?.avatar || noImg}
                      alt='*'
                    />
                  </div>
                </NavLink>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <ErrorEmpty />
      )}
    </div>
  );
};

export default HomeBrands;
