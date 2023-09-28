import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import { slidesData } from '../../constants/slidesData';

const MainSlider = () => {
  return (
    <Swiper
      navigation={true}
      modules={[EffectFade, Navigation, Autoplay]}
      effect='fade'
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
      slidesPerView={1}
    >
      {slidesData?.map((el, index) => (
        <SwiperSlide
          key={index}
          className={`${el?.backgroundImage} min-h-[560px] sm:min-h-[625px] flex items-center bg-right bg-auto bg-no-repeat`}
          effect={'fade'}
          modules={[Navigation, EffectFade]}
        >
          <div className='content'>
            <div className='mb-5'>
              <h1
                className={`text-4xl sm:text-8xl ${
                  el?.textStyle ? el?.textStyle : ''
                } font-bold max-w-[265px] sm:max-w-[600px]`}
              >
                {el?.title}
              </h1>
              <p
                className={`${
                  el?.descStyle
                } max-w-[440px] lg:max-w-[540px] w-full text-2xl ${
                  el?.textStyle ? el?.textStyle : ''
                } my-8`}
              >
                {el?.description}
              </p>
            </div>
            <button className='text-[18px] bg-colPurple text-white rounded-lg px-6 py-2 mt-2'>
              Связаться с нами
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlider;
