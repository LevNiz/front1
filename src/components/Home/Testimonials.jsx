import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { testimonials } from '../../constants/testimonialData';
import quotes from './../../assets/images/testimonial.png';

const Testimonials = () => {
  return (
    <div className='py-16 testimonials slider'>
      <h1 className='text-[40px] font-medium text-center'>[ Отзывы ]</h1>
      <h4 className='text-2xl font-medium text-center mt-3'>
        Отзывы наших постоянных клиентов
      </h4>
      <Swiper navigation={true} modules={[Navigation]} slidesPerView={1}>
        {testimonials?.map((el, index) => (
          <SwiperSlide
            key={index}
            className='flex items-center'
          >
            <div className='max-w-[1120px] w-full mx-auto text-center py-12'>
              <div className='max-w-[168px] min-w-[168px] max-h-[168px] min-h-[168px] rounded-full overflow-hidden mx-auto'>
                <img
                  className='w-full h-full object-cover'
                  src={el?.avatar}
                  alt='*'
                />
              </div>
              <p className='text-2xl font-medium my-12 relative'>{el?.desc}
              <img className='absolute top-[-40px] left-[-65px]' src={quotes} alt='*' />
              </p>
              <div className='max-w-[338px] w-full h-5 bg-colPurple mx-auto'></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
