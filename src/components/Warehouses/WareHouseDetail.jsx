import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import { warehouses } from '../../constants/wareHouseData';
import location from './../../assets/icons/location.svg';
import clock from './../../assets/icons/clock.svg';
import call from './../../assets/icons/call.svg';
import boxIcon from './../../assets/icons/package.svg';

const WareHouseDetail = () => {
  const images = warehouses[0]?.images;

  const [mainIMG, setMainIMG] = useState(images[0].image);
  const [fade, setFade] = useState(true);

  const handleClick = (index) => {
    const main = images[index]?.image;
    setMainIMG(main);
  };

  return (
    <div className='py-12 content'>
      <h1 className='text-4xl font-semibold text-center mt-4 mb-16'>
        Склад №1
      </h1>
      <div className='flex'>
        <div className='w-2/5'>
          <div className='max-w-[472px] min-w-[472px] h-[413px] overflow-hidden rounded-lg mx-auto'>
            <img src={mainIMG} alt='*' className='w-full h-full object-cover' />
          </div>
          <Swiper
            direction={'horizontal'}
            slidesPerView={4}
            mousewheel={true}
            modules={[Mousewheel]}
            noSwiping={true}
            wrapperClass='swiper-wrapper justify-center space-x-8'
            className='flex justify-around mt-5'
          >
            {images?.map((el, index) => (
              <SwiperSlide
                key={el.id}
                className='max-w-[80px] w-full h-[80px] rounded-lg overflow-hidden'
                onClick={() => {
                  handleClick(index);
                  setFade(!fade);
                }}
              >
                <img
                  src={el.image}
                  alt='*'
                  className='w-full h-full object-cover'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='w-3/5'>
          <div className='bg-colBgGray p-12 rounded-2xl ml-10'>
            <div className='flex items-center mb-8'>
              <span className='w-[50px] h-[50px] rounded-xl flex items-center justify-center bg-white'>
                <img src={location} alt='*' />
              </span>
              <p className='text-2xl font-medium ml-5'>
                ул. Советская, 123, Бишкек, Кыргызстан
              </p>
            </div>
            <div className='flex items-center my-8'>
              <span className='w-[50px] h-[50px] rounded-xl flex items-center justify-center bg-white'>
                <img src={clock} alt='*' />
              </span>
              <p className='text-2xl font-medium ml-5'>09:00 - 19:00</p>
            </div>
            <div className='flex items-center my-8'>
              <span className='w-[50px] h-[50px] rounded-xl flex items-center justify-center bg-white'>
                <img src={call} alt='*' />
              </span>
              <p className='text-2xl font-medium ml-5'>+996 123 456 678</p>
            </div>
            <div className='flex items-center mt-8'>
              <span className='w-[50px] h-[50px] rounded-xl flex items-center justify-center bg-white'>
                <img src={boxIcon} alt='*' />
              </span>
              <p className='text-2xl font-medium ml-5'>300 кг </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WareHouseDetail;
