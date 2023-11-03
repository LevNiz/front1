import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import { fetchDepotsDetail } from '../../api/depots';
import { ContentLoading } from '../../helpers/Loader/Loader';
import { DepotMap } from './DepotMap';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';
import 'swiper/css';
import location from './../../assets/icons/location.svg';
import clock from './../../assets/icons/clock.svg';
import call from './../../assets/icons/call.svg';
import boxIcon from './../../assets/icons/package.svg';
import noImg from './../../assets/images/no-image.svg';

const DepotDetail = () => {
  const [depotItem, setDepotItem] = useState();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState();
  const { id } = useParams();

  const [mainImg, setMainImg] = useState();

  const handleClick = (index) => {
    const main = images[index];
    setMainImg(main);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

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
    <div className='pt-28 pb-12 mm:content'>
      {loading ? (
        <ContentLoading extraStyle='85vh' />
      ) : (
        <>
          <h1 className='text-2xl sm:text-4xl font-semibold text-center sm:mt-4 mb-6 sm:mb-14'>
            {depotItem?.nameRu}
          </h1>
          <div className='md:flex pb-12 min-h-[576px]'>
            <div className='w-full md:w-3/6 xl:w-2/5 mb-5 mm:mb-12 md:mb-0 px-4 mm:px-0'>
              <div className='md:max-w-[472px] h-[320px] sm:h-[400px] overflow-hidden rounded-lg mx-auto bg-colBgGray'>
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
                wrapperClass='swiper-wrapper justify-center sm:space-x-4 space-x-3 lg:space-x-8'
                className='flex justify-around mt-5'
              >
                {depotItem?.images !== null
                  ? images?.map((el, index) => (
                      <SwiperSlide
                        key={index}
                        className='sm:max-w-[80px] !w-[22%] h-[50px] bg-colBgGray xs:h-[60px] sm:w-full sm:h-[75px] rounded-lg overflow-hidden cursor-pointer'
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
              <div className='max-w-[630px] w-full mx-auto mm:px-5 pb-5 flex mm:block flex-col'>
                <div className='order-1 mt-10 mm:mt-0'>
                  <DepotMap
                    center={{ lat: depotItem?.lat, lng: depotItem?.lon }}
                  />
                  <p className='text-center mt-4 mb-8 flex justify-center items-center px-4 mm:px-0'>
                    <span className='mr-1 opacity-60'>Тип склада:</span>
                    <span className='font-medium'>
                      {depotItem?.types === 'both'
                        ? 'Отправка / Приём'
                        : depotItem?.types === 'in'
                        ? 'Приём'
                        : 'Отправка'}
                    </span>
                  </p>
                </div>
                <div className='rounded-2xl grid lg:grid-cols-2 gap-5 mt-8 px-4 mm:px-0'>
                  <div className='flex items-start'>
                    <span className='w-6 min-w-[24px] rounded-xl flex items-center justify-center mt-0'>
                      <img src={call} alt='*' />
                    </span>
                    <p className='text-base sm:text-xl xl:text-2xl font-medium ml-3'>
                      {depotItem?.contacts?.phone}
                    </p>
                  </div>
                  <div className='flex items-start'>
                    <span className='w-6 min-w-[24px] rounded-xl flex items-center justify-center mt-1'>
                      <img src={boxIcon} alt='*' />
                    </span>
                    <p className='text-base sm:text-xl xl:text-2xl font-medium ml-3'>
                      {depotItem?.maxAmount} кг
                    </p>
                  </div>
                  <div className='flex items-start'>
                    <span className='w-6 min-w-[24px] rounded-xl flex items-center justify-center mt-1'>
                      <img src={location} alt='*' />
                    </span>
                    <p className='text-base sm:text-xl xl:text-2xl font-medium ml-3'>
                      {`${depotItem?.address}, ${depotItem?.city?.nameRu}, ${depotItem?.country?.nameRu}`}
                    </p>
                  </div>
                  <div className='flex items-start'>
                    <span className='w-6 min-w-[24px] rounded-xl flex items-center justify-center mt-1'>
                      <img src={clock} alt='*' />
                    </span>
                    <div className='text-base sm:text-xl xl:text-2xl font-medium ml-3'>
                      {depotItem?.workingHours?.map((el, index) => (
                        <div key={index}>
                          <div className='flex'>
                            <span className='mr-2'>Пн: </span>
                            <span>
                              {el?.mondayStart} - {el?.mondayEnd}
                            </span>
                          </div>
                          <div className='flex'>
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
                          <div className='flex'>
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
                          <div className='flex'>
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
          </div>
        </>
      )}
    </div>
  );
};

export default DepotDetail;
