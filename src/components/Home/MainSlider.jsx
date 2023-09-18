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
          className='min-h-[560px] sm:min-h-[625px] flex items-center bg-cover bg-no-repeat'
          style={{ backgroundImage: el?.backgroundImage }}
          effect={'fade'}
          modules={[Navigation, EffectFade]}
        >
          <div className='content'>
            <img
              src={el?.extraImg}
              className='absolute top-0 left-0 z-[-1]'
              alt='*'
            />
            <img
              src={el?.arrowImg}
              className='absolute right-[20px] sm:right-auto sm:left-[35%] bottom-[100px] z-[-1] w-24 sm:w-auto'
              alt='*'
            />
            <div className='mb-5'>
              <h1
                className={`text-4xl sm:text-8xl ${
                  el?.textStyle ? el?.textStyle : 'text-white'
                } font-bold max-w-[265px] sm:max-w-[600px]`}
              >
                {el?.title}
              </h1>
              <p
                className={`${el?.descStyle} w-full text-2xl ${
                  el?.textStyle ? el?.textStyle : 'text-white'
                } my-8`}
              >
                {el?.description}
              </p>
            </div>
            <button
              className={`'ext-[18px] ${
                el?.buttonStyle ? el?.buttonStyle : 'bg-colPurple text-white'
              } rounded-lg px-6 py-2 mt-2`}
            >
              Связаться с нами
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlider;
