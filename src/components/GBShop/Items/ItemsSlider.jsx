import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';

import noImg from '../../../assets/images/no-image.svg';
import { useSelector } from 'react-redux';

const ItemsSlider = ({
  item,
  activeThumb,
  setActiveThumb,
  mainSwiperRef,
  handleSlideChange,
}) => {
  const { depots } = useSelector((state) => state?.depots);
  const { images, image, colors, imagelink } = item;

  const allImagesArray = [
    ...(colors
      ? colors
          .map((color) => ({ id: color?.id, image: color?.image }))
          .filter(Boolean)
      : []),
    ...(images || []),
    ...(image ? [image] : []),
    ...(imagelink ? [imagelink] : []),
  ];

  const handleOpenDepot = (cityID) => {
    const depotID = depots?.filter((depot) => depot?.city?.id == cityID);
    if (depotID?.length) {
      window.open(`/depots/${depotID[0]?.id}`, '_blank');
    } else {
      alert('В этом городе пока нет склада!');
    }
  };

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
            {item?.country?.icon && (
              <div
                onClick={() => handleOpenDepot(item?.city?.id)}
                className='absolute top-3 right-3 cursor-pointer w-10 h-10 rounded-full overflow-hidden'
              >
                <img
                  className='w-full h-full object-cover'
                  src={item?.country?.icon}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = noImg;
                  }}
                  alt='*'
                />
              </div>
            )}
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

export default ItemsSlider;
