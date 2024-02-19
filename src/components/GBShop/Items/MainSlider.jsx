import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';

import noImg from '../../../assets/images/no-image.svg';

const MainSlider = ({
  item,
  activeThumb,
  setActiveThumb,
  mainSwiperRef,
  handleSlideChange,
}) => {
  const { images, image, colors, imagelink } = item;

  const allImagesArray = [
    ...(colors && colors?.length > 0
      ? colors
          .map((color) => ({ id: color?.id, image: color?.image }))
          .filter(Boolean)
      : []),
    ...(colors && colors?.length === 0 ? images || [] : []),
    ...(colors && colors?.length === 0 && image ? [image] : []),
    ...(colors && colors?.length === 0 && imagelink ? [imagelink] : []),
  ];

  return (
    <>
      <Swiper
        loop={false}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        onSlideChange={handleSlideChange}
        thumbs={{
          swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null,
        }}
        onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
        className='gb-shop-card-main-slider'
      >
        {allImagesArray?.map((el, index) => (
          <SwiperSlide
            key={index}
            className='relative sm:h-[340px] lg:h-[470px] rounded-lg mx-auto bg-[#f4f4f4]'
          >
            <img
              src={
                el && typeof el === 'object' && el?.image
                  ? el?.image
                  : el
                  ? el
                  : noImg
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = noImg;
              }}
              alt='*'
              className='w-full h-full object-contain'
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {allImagesArray?.length > 1 && (
        <Swiper
          onSwiper={setActiveThumb}
          spaceBetween={14}
          modules={[Thumbs]}
          slidesPerView={4}
          className={`mt-5 gb-shop-card-slider-thumb ${
            allImagesArray?.length < 4 &&
            'gb-shop-card-slider-thumb-two cursor-pointer'
          }`}
        >
          {allImagesArray?.map((el, index) => (
            <SwiperSlide
              key={index}
              className='h-12 xs:h-16 sx:h-20 mm:h-[90px] rounded-lg bg-gray-100 overflow-hidden opacity-50'
            >
              <img
                src={
                  el && typeof el === 'object' && el?.image
                    ? el?.image
                    : el
                    ? el
                    : noImg
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = noImg;
                }}
                alt='*'
                className='w-full h-full object-cover'
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default MainSlider;
