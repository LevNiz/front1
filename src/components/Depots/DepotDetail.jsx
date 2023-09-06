import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import location from './../../assets/icons/location.svg';
import clock from './../../assets/icons/clock.svg';
import call from './../../assets/icons/call.svg';
import boxIcon from './../../assets/icons/package.svg';
import noImg from './../../assets/images/no-image.svg';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchDepotsDetail } from '../../api/depots';
import { ContentLoading } from '../../helpers/Loader/Loader';

const DepotDetail = () => {
  const [depotItem, setDepotItem] = useState();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState();
  const { id } = useParams();

  const [mainImg, setMainImg] = useState();

  const handleClick = (index) => {
    const main = images[index];
    setMainImg(main);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { success, data } = await fetchDepotsDetail(id);
      if (success) {
        setDepotItem(data);
        setLoading(false);
        setMainImg(data?.images[0]);
        setImages(data?.images);
      }
      setLoading(false);
    })();
  }, [id]);

  return (
    <div className='py-12 content'>
      {loading ? (
        <ContentLoading />
      ) : (
        <>
          <h1 className='text-2xl sm:text-4xl font-semibold text-center mt-4 mb-16'>
            {depotItem?.nameRu}
          </h1>

          <div className='md:flex pb-12 min-h-[576px]'>
            <div className='w-full md:w-3/6 xl:w-2/5 mb-12 md:mb-0'>
              <div className='md:max-w-[472px] h-[320px] sm:h-[400px] overflow-hidden rounded-lg mx-auto'>
                <img
                  src={depotItem?.images == null ? noImg : mainImg}
                  alt='*'
                  className='w-full h-full object-cover'
                />
              </div>
              <Swiper
                direction={'horizontal'}
                slidesPerView={4}
                mousewheel={true}
                modules={[Mousewheel]}
                noSwiping={true}
                wrapperClass='swiper-wrapper justify-between sm:justify-center sm:space-x-4 lg:space-x-8'
                className='flex justify-around mt-5'
              >
                {depotItem?.images !== null
                  ? images?.map((el, index) => (
                      <SwiperSlide
                        key={index}
                        className='sm:max-w-[80px] !w-[22%] h-[50px] bg-gray-300 xs:h-[70px] sm:w-full sm:h-[80px] rounded-lg overflow-hidden cursor-pointer'
                        onClick={() => {
                          handleClick(index);
                        }}
                      >
                        <img
                          src={el}
                          alt='*'
                          className='w-full h-full object-cover'
                        />
                      </SwiperSlide>
                    ))
                  : ''}
              </Swiper>
            </div>
            <div className='md:w-3/6 xl:w-3/5'>
              <div className='bg-colBgGray p-6 xl:p-12 rounded-2xl md:ml-4 xl:ml-10'>
                <div className='flex items-center mb-8'>
                  <span className='min-w-[40px] md:min-w-[50px] h-[40px] md:h-[50px] rounded-xl flex items-center justify-center bg-white'>
                    <img src={location} alt='*' />
                  </span>
                  <p className='text-base sm:text-xl xl:text-2xl font-medium ml-5'>
                    {`${depotItem?.address}, ${depotItem?.city?.nameRu}, ${depotItem?.country?.nameRu}`}
                  </p>
                </div>
                <div className='flex items-center my-8'>
                  <span className='min-w-[40px] md:min-w-[50px] h-[40px] md:h-[50px] rounded-xl flex items-center justify-center bg-white'>
                    <img src={call} alt='*' />
                  </span>
                  <p className='text-base sm:text-xl xl:text-2xl font-medium ml-5'>
                    {depotItem?.contacts?.phone}
                  </p>
                </div>
                <div className='flex items-center mt-8'>
                  <span className='min-w-[40px] md:min-w-[50px] h-[40px] md:h-[50px] rounded-xl flex items-center justify-center bg-white'>
                    <img src={boxIcon} alt='*' />
                  </span>
                  <p className='text-base sm:text-xl xl:text-2xl font-medium ml-5'>
                    {depotItem?.maxAmount} кг
                  </p>
                </div>
                <div className='flex my-8'>
                  <span className='min-w-[40px] md:min-w-[50px] h-[40px] md:h-[50px] rounded-xl flex items-center justify-center bg-white'>
                    <img src={clock} alt='*' />
                  </span>
                  <div className='text-base sm:text-xl xl:text-2xl font-medium ml-5'>
                    {depotItem?.workingHours?.map((el, index) => (
                      <div className='grid grid-cols-2' key={index}>
                        <div className='flex'>
                          <span className='mr-2'>Пн: </span>
                          <span>
                            {el?.mondayStart} - {el?.mondayEnd}
                          </span>
                        </div>
                        <div className='flex ml-4'>
                          <span className='mr-2'>Вт: </span>
                          <span>
                            {el?.tuesdayStart} - {el?.tuesdayEnd}
                          </span>
                        </div>
                        <div className='flex'>
                          <span className='mr-2'>Ср: </span>
                          <span>
                            {el?.wednesdayStart} - {el?.wednesdayEnd}
                          </span>
                        </div>
                        <div className='flex ml-4'>
                          <span className='mr-2'>Чт: </span>
                          <span>
                            {el?.thursdayStart} - {el?.thursdayEnd}
                          </span>
                        </div>
                        <div className='flex'>
                          <span className='mr-2'>Пт: </span>
                          <span>
                            {el?.fridayStart} - {el?.fridayEnd}
                          </span>
                        </div>
                        <div className='flex ml-4'>
                          <span className='mr-2'>Сб: </span>
                          <span>
                            {el?.satStart} - {el?.satEnd}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DepotDetail;
