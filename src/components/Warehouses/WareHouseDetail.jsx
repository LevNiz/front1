import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { warehouses } from '../../constants/wareHouseData';

const WareHouseDetail = () => {
  const images = warehouses[0]?.images;
  return (
    <div className='py-12 content'>
      <h1 className='text-4xl font-semibold text-center mt-4 mb-16'>
        Склад №1
      </h1>
      <div className='flex'>
        <div className='w-2/5'>
          <Swiper
            moduls={[Pagination]}
            pagination={{
              clickable: true,
              renderBullet: (index, className) =>
                `<div class="${className}"><img src="${images[index]?.image}" alt="*"></div>`,
            }}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
          >
            {images.map((el, index) => (
              <SwiperSlide
                key={index}
                className='w-[472px] h-[413px overflow-hidden] !rounded-[9px]'
              >
                <img
                  className='w-full h-full object-cover'
                  src={el?.image}
                  alt='*'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='w-3/5'>Content</div>
      </div>
    </div>
  );
};

export default WareHouseDetail;
