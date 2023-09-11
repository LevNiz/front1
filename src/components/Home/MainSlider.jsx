import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-cube';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { slidesData } from '../../constants/slidesData';

const MainSlider = () => {
  return (
    <Swiper navigation={true} modules={[Navigation]} slidesPerView={1}>
      {slidesData?.map((el, index) => (
        <SwiperSlide
          key={index}
          className='min-h-[560px] sm:min-h-[625px] flex items-center bg-no-repeat'
          style={{ backgroundImage: el?.backgroundImage }}
        >
          <div className='content'>
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
