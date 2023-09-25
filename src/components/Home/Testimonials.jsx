import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { testimonials } from '../../constants/testimonialData';
import quotes from './../../assets/images/testimonial.png';

const Testimonials = () => {
  return (
    <div className='py-16 testimonials slider'>
      <div className='flex justify-center mb-5'>
        <div className="flex relative bg-[#E8E8E8] w-max pr-2 rounded-sm">
          <span className='absolute w-1 h-full bg-colYellow'></span>
          <h6 className='ml-3'>Отзывы наших постоянных клиентов</h6>
        </div>
      </div>
      <h1 className='text-3xl sm:text-[40px] font-medium text-center px-4'>
        Отзывы
      </h1>
      <Swiper navigation={true} modules={[Navigation]} slidesPerView={1}>
        {testimonials?.map((el, index) => (
          <SwiperSlide key={index} className='flex items-center'>
            <div className='max-w-[1120px] w-full mx-auto text-center py-12'>
              <div className='max-w-[168px] min-w-[168px] h-[168px] rounded-full overflow-hidden mx-auto'>
                <img
                  className='w-full h-full object-cover'
                  src={el?.avatar}
                  alt='*'
                />
              </div>
              <p className='text-lg px-5 xl:text-2xl font-medium my-12 relative'>
                {el?.desc}
                <img
                  className='absolute w-12 md:w-auto top-[-50px] xl:left-[-40px]'
                  src={quotes}
                  alt='*'
                />
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
