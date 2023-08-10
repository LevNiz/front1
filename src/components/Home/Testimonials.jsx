import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { testimonials } from '../../constants/testimonialData';
import quotes from './../../assets/images/testimonial.png';

const Testimonials = () => {
  return (
    <div className='py-16 testimonials slider'>
      <h1 className='text-[40px] font-medium text-center px-4'>[ Отзывы ]</h1>
      <h4 className='text-2xl font-medium text-center mt-3 px-4'>
        Отзывы наших постоянных клиентов
      </h4>
      <Swiper navigation={true} modules={[Navigation]} slidesPerView={1}>
        {testimonials?.map((el, index) => (
          <SwiperSlide
            key={index}
            className='flex items-center'
          >
            <div className='max-w-[1120px] w-full mx-auto text-center py-12'>
              <div className='max-w-[168px] min-w-[168px] h-[168px] rounded-full overflow-hidden mx-auto'>
                <img
                  className='w-full h-full object-cover'
                  src={el?.avatar}
                  alt='*'
                />
              </div>
              <p className='text-xl px-5 xl:text-2xl font-medium my-12 relative'>{el?.desc}
              <img className='absolute w-12 md:w-auto top-[-50px] xl:left-[-40px]' src={quotes} alt='*' />
              </p>
              <div className='max-w-[338px] w-full h-3 md:h-5 bg-colPurple mx-auto'></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
