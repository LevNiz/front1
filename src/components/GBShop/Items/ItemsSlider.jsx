// import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';

import noImg from '../../../assets/images/no-image.svg';

const ItemsSlider = ({ slideImg }) => {
  // const images = [
  //   {
  //     id: 1,
  //     image:
  //       'https://i.natgeofe.com/n/874df281-d3e0-489a-98c0-6b840023b828/newyork_NationalGeographic_2328428_square.jpg',
  //   },
  //   {
  //     id: 2,
  //     image:
  //       'https://images.unsplash.com/photo-1699694927472-46a4fcf68973?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw1NDA2MjN8fGVufDB8fHx8fA%3D%3D',
  //   },
  //   {
  //     id: 3,
  //     image:
  //       'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg',
  //   },
  //   {
  //     id: 4,
  //     image:
  //       'https://images.unsplash.com/photo-1587483283491-40b2af304d7f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fDUwMHxlbnwwfHwwfHx8MA%3D%3D',
  //   },
  //   {
  //     id: 5,
  //     image:
  //       'https://thumbs.dreamstime.com/b/cold-snowy-winter-road-16246084.jpg',
  //   },
  //   {
  //     id: 6,
  //     image:
  //       'https://images.unsplash.com/photo-1587483283491-40b2af304d7f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fDUwMHxlbnwwfHwwfHx8MA%3D%3D',
  //   },
  //   {
  //     id: 7,
  //     image:
  //       'https://thumbs.dreamstime.com/b/cold-snowy-winter-road-16246084.jpg',
  //   },
  // ];
  // const [activeThumb, setActiveThumb] = useState('');

  return (
    <div className='w-full mb-5 mm:mb-12 md:mb-0 px-4 mm:px-0'>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        // thumbs={{
        //   swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null,
        // }}
        className='gb-shop-card-main-slider'
      >
        {/* {images?.map((el, index) => ( */}
        <SwiperSlide
          // key={index}
          className='h-[470px] rounded-lg mx-auto bg-[#FBFBFB]'
        >
          <img
            src={slideImg}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = noImg;
            }}
            alt='*'
            className='w-full h-full object-contain'
          />
        </SwiperSlide>
        {/* ))} */}
      </Swiper>
      {/* <Swiper
        onSwiper={setActiveThumb}
        spaceBetween={14}
        modules={[Thumbs]}
        slidesPerView={4}
        className='mt-5 gb-shop-card-slider-thumb'
      >
        {images?.map((el, index) => (
          <SwiperSlide
            key={index}
            className={`${
              images?.length > 3 ? '' : '!mx-auto'
            } h-[90px] rounded-lg bg-gray-100 overflow-hidden opacity-50`}
          >
            <img
              src={el?.image}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = noImg;
              }}
              alt='*'
              className='w-full h-full object-cover'
            />
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
};

export default ItemsSlider;
