// import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';

import noImg from '../../../assets/images/no-image.svg';
import { useSelector } from 'react-redux';

const ItemsSlider = ({ item }) => {
  const { depots } = useSelector((state) => state?.depots);
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

  const handleOpenDepot = (cityID) => {
    const depotID = depots?.filter((depot) => depot?.city?.id == cityID);
    if (depotID?.length) {
      window.open(`/depots/${depotID[0]?.id}`, '_blank');
    } else {
      alert('В этом городе пока нет склада!');
    }
  };

  return (
    <>
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
          className='relative sm:h-[340px] lg:h-[470px] rounded-lg mx-auto bg-[#FBFBFB]'
        >
          {item?.country?.icon && (
            <div
              onClick={() => handleOpenDepot(item?.city?.id)}
              className='absolute top-3 right-3 cursor-pointer w-10 h-10 rounded-full overflow-hidden'
            >
              <img
                className='w-full h-full object-cover'
                src={item?.country?.icon}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = noImg;
                }}
                alt='*'
              />
            </div>
          )}
          <img
            src={item?.image ? item?.image : noImg}
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
    </>
  );
};

export default ItemsSlider;
