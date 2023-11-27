import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { slidesData } from '../../constants/slidesData';
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';

const MainSlider = () => {
  const [size, setSize] = useState(window.innerWidth);

  window.addEventListener('resize', function () {
    setSize(window.innerWidth);
  });

  return (
    <Swiper
      navigation={true}
      modules={[Navigation, Autoplay]}
      autoplay={{
        delay: 4000,
        disableOnInteraction: true,
      }}
      slidesPerView={1}
    >
      {slidesData?.map((el) => (
        <SwiperSlide
          key={el?.id}
          className={`${
            el?.id === 1 ? 'text-white' : ''
          } min-h-[430px] md:min-h-[740px] pb-20 md:pb-0 flex items-center bg-[80%] mm:bg-center md:bg-[70%] xl:bg-center bg-no-repeat bg-cover`}
          modules={[Navigation]}
          style={{
            backgroundImage:
              size > 768
                ? `url('${el?.backgroundImage}')`
                : size > 576
                ? `url('${
                    el?.tabletImage ? el?.tabletImage : el?.backgroundImage
                  }')`
                : `url('${
                    el?.mobileImage ? el?.mobileImage : el?.backgroundImage
                  }')`,
          }}
        >
          <div className='content md:pt-0 mm:pt-16 pt-28'>
            <div className='mb-5 text-center mm:text-left'>
              <h1 className='text-4xl ss:text-5xl md:text-6xl xl:text-8xl font-bold'>
                {el?.title}
              </h1>
              <p className='mx-auto mm:mx-0 max-w-[300px] md:max-w-[380px] lg:max-w-[496px] w-full text-base md:text-2xl my-5 md:my-8'>
                {el?.description}
              </p>
            </div>
            <button className='text-[18px] bg-colPurple text-white rounded-lg px-6 py-2 mt-8 sm:mt-2 flex justify-center mx-auto mm:mx-0 md:block'>
              Связаться с нами
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlider;
