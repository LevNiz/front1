import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { slidesData } from '../../constants/slidesData';
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
            el?.id === 1 ? '' : 'bg-cover'
          } md:min-h-[740px] pb-20 md:pb-0 flex items-center bg-center bg-no-repeat`}
          modules={[Navigation]}
          style={{
            backgroundImage: size > 768 ? `url('${el?.backgroundImage}')` : '',
            backgroundColor: `${el?.bgColor}`,
          }}
        >
          <div className='content'>
            <div className='mb-5 text-center md:text-left'>
              <div className='md:hidden max-w-[576px] mx-auto w-full overflow-hidden py-8'>
                <img className='mx-auto' src={el?.mobImage} alt='*' />
              </div>
              <h1 className='text-4xl md:text-8xl font-bold'>{el?.title}</h1>
              <p className='max-w-[440px] mx-auto md:mx-0 lg:max-w-[496px] w-full text-lg md:text-2xl my-5 mm:my-8'>
                {el?.description}
              </p>
            </div>
            <button className='text-[18px] bg-colPurple text-white rounded-lg px-6 py-2 mt-2 flex justify-center mx-auto md:mx-0 md:block'>
              Связаться с нами
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlider;
