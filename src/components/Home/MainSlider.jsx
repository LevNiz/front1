import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { slidesData } from '../../constants/slidesData';
import vector from './../../assets/images/vector.png';

const MainSlider = () => {
  return (
    <Swiper navigation={true} modules={[Navigation]} slidesPerView={1}>
      {slidesData?.map((el, index) => (
        <SwiperSlide
          key={index}
          className='min-h-[560px] sm:min-h-[625px] flex items-center'
          style={{ backgroundImage: el?.backgroundImage }}
        >
          <div className='content'>
            <div className='relative mb-5'>
              <img src={vector} alt='*' />
              <h1 className='text-4xl sm:text-5xl text-white font-semibold max-w-[265px] sm:max-w-[310px] absolute top-[40px] sm:top-[60px] left-[40px] sm:left-[60px]'>
                {el?.title}
              </h1>
            </div>
            <button className='text-[18px] bg-black text-white rounded-lg px-6 py-2'>
              Связаться с нами
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlider;
