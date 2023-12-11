import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepotsDetail } from '../../api/depots';
import { ContentLoading } from '../../helpers/Loader/Loader';
import { DepotMap } from './DepotMap';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';
import { fetchCosts } from '../../api/costs';
import { fetchExtraServices } from '../../api/extraServices';
import 'swiper/css';
import location from './../../assets/icons/new-location.svg';
import clock from './../../assets/icons/timeSvg.svg';
import call from './../../assets/icons/new-call.svg';
import boxIcon from './../../assets/icons/mobile-menu/profile-box.svg';
import arrow from './../../assets/icons/down.svg';
import arrowWhite from './../../assets/icons/arrow-white.svg';
import noImg from './../../assets/images/no-image.svg';
import parcel from './../../assets/icons/my-parcel.svg';
import extraServiceIcon from './../../assets/icons/extra-service.svg';

const DepotDetail = () => {
  const [depotItem, setDepotItem] = useState();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState();
  const [mainImg, setMainImg] = useState();
  const [openTariff, setOpenTariff] = useState(false);
  const [openExtraTariff, setOpenExtraTariff] = useState(false);

  const { costs } = useSelector((state) => state?.costs);
  const { extraServices } = useSelector((state) => state?.extraServices);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredTariffs = costs?.filter(
    (el) => el?.fromCity?.id === Number(id)
  );

  const handleClick = (index) => {
    const main = images[index];
    setMainImg(main);
  };

  useEffect(() => {
    scrollToTop();
    (async () => {
      await fetchCosts(dispatch);
    })();

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
  }, [id, dispatch]);

  useEffect(() => {
    (async () => {
      await fetchExtraServices(dispatch);
    })();
  }, [dispatch]);

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
                  src={mainImg ? mainImg : noImg}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = noImg;
                  }}
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
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = noImg;
                          }}
                          alt='*'
                          className='w-full h-full object-cover'
                        />
                      </SwiperSlide>
                    ))
                  : ''}
              </Swiper>
            </div>
            <div className='md:w-3/6 xl:w-3/5'>
              <div className='max-w-[630px] w-full mx-auto mm:px-5 pb-5'>
                <div className='mt-10 mm:mt-0 md:block flex flex-col'>
                  <div className='order-1 pt-5 md:pt-0'>
                    <DepotMap
                      center={{ lat: depotItem?.lat, lng: depotItem?.lon }}
                    />
                    <p className='text-center my-3 flex justify-center items-center px-4 mm:px-0'>
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
                  <p className='font-medium px-4 mm:px-0'>
                    {depotItem?.infoRu}
                  </p>
                </div>
                <div className='rounded-2xl grid lg:grid-cols-2 gap-5 mt-8 px-4 mm:px-0'>
                  <div className='flex items-start'>
                    <span className='w-6 min-w-[24px] rounded-xl flex items-center justify-center mt-0'>
                      <img src={call} alt='*' />
                    </span>
                    <p className='text-base sm:text-xl font-medium ml-3'>
                      {depotItem?.contacts?.phone}
                    </p>
                  </div>
                  <div className='flex items-start'>
                    <span className='w-6 min-w-[24px] rounded-xl flex items-center justify-center mt-1'>
                      <img src={boxIcon} alt='*' />
                    </span>
                    <p className='text-base sm:text-xl font-medium ml-3'>
                      {depotItem?.maxAmount} кг
                    </p>
                  </div>
                  <div className='flex items-start'>
                    <span className='w-6 min-w-[24px] rounded-xl flex items-center justify-center mt-1'>
                      <img src={location} alt='*' />
                    </span>
                    <p className='text-base sm:text-xl font-medium ml-3'>
                      {`${depotItem?.address}, ${depotItem?.city?.nameRu}, ${depotItem?.country?.nameRu}`}
                    </p>
                  </div>
                  <div className='flex items-start'>
                    <span className='w-6 min-w-[24px] rounded-xl flex items-center justify-center mt-1'>
                      <img src={clock} alt='*' />
                    </span>
                    <div className='text-base sm:text-xl font-medium ml-3'>
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
          <div className='text-center pb-10 text-xl font-medium content'>
            <h4>У вас коммерческий груз?</h4>
            <h4 className='text-[#da47ff]'>Не проблема!</h4>
            <h4>
              Отпрравьте заявку прямо сейчас в разделе{' '}
              <NavLink to='/gb-business' className='text-blue-500 underline'>
                GB-Business
              </NavLink>
            </h4>
          </div>
          <div className='md:flex justify-between md:space-x-4 lg:space-x-7 content'>
            <div className='w-full lg:w-1/2'>
              <div
                onClick={() => setOpenTariff(!openTariff)}
                className='flex justify-between items-center bg-black py-4 px-5 rounded-md cursor-pointer'
              >
                <h3 className='ss:text-xl font-medium text-white'>Тарифы</h3>
                <img
                  className={`${
                    openTariff ? 'rotate-[180deg]' : ''
                  } rounded-md w-5`}
                  src={arrowWhite}
                  alt='*'
                />
              </div>
              <div
                className={`${
                  openTariff ? 'flex' : 'hidden'
                } p-3 mm:p-5 bg-gray-100 flex-col space-y-4`}
              >
                {filteredTariffs?.length ? (
                  filteredTariffs?.map((el) => (
                    <div key={el?.id} className='bg-white p-2'>
                      <div className='flex items-center'>
                        <img
                          className='w-8 rounded-sm mr-2'
                          src={el?.toCity?.country?.icon}
                          alt='*'
                        />
                        <span className='font-medium'>
                          {el?.toCity?.nameRu}
                        </span>
                      </div>
                      <div className='lg:flex justify-between items-end'>
                        <div>
                          <div className='flex items-center mt-3'>
                            <img className='w-5 mr-2' src={parcel} alt='*' />
                            <span>Стандартный: 1 кг / {el?.costPerKg} $</span>
                          </div>
                          <div className='flex items-center mt-1'>
                            <img className='w-5 mr-2' src={parcel} alt='*' />
                            <span>Премиум: 1 кг / {el?.costPerKgMy} $</span>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            navigate('/applications/send-application', {
                              state: {
                                orderData: {
                                  senderCity: {
                                    value: depotItem?.city?.id,
                                    label: depotItem?.city?.nameRu,
                                  },
                                  receiverCity: {
                                    value: el?.toCity?.id,
                                    label: el?.toCity?.nameRu,
                                  },
                                  parcelSize: {
                                    value: 'custom',
                                    label: 'Точные',
                                  },
                                  depotTariff: true,
                                },
                              },
                            })
                          }
                          className='bg-orange-500 text-white rounded-md px-3 py-1 text-sm hover:opacity-80 duration-150 mt-4 lg:mt-0 flex ml-auto'
                        >
                          Оформить заказ
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='font-medium text-center'>Нет тарифов.</p>
                )}
              </div>
            </div>
            <div className='w-full lg:w-1/2 mt-5 md:mt-0'>
              <div
                onClick={() => setOpenExtraTariff(!openExtraTariff)}
                className='flex justify-between items-center bg-colYellow py-4 px-5 rounded-md cursor-pointer'
              >
                <h3 className='ss:text-xl font-medium'>
                  Дополнительные услуги
                </h3>
                <img
                  className={`${
                    openExtraTariff ? 'rotate-[180deg]' : ''
                  } rounded-md w-4`}
                  src={arrow}
                  alt='*'
                />
              </div>
              <div
                className={`${
                  openExtraTariff ? 'flex' : 'hidden'
                } p-3 mm:p-5 bg-gray-100 flex-col space-y-4`}
              >
                <p className='opacity-70'>
                  Вы можете закзать следующие SMART услуги до того, как ваша
                  посылка постуи пить в наш склад.
                </p>
                {extraServices?.map((el) => (
                  <div key={el?.id} className='flex justify-between'>
                    <div className='flex'>
                      <img
                        className='h-6 mr-2 mt-1'
                        src={extraServiceIcon}
                        alt='*'
                      />
                      <div>
                        <h4 className='font-medium'>{el?.nameRu}</h4>
                        <p className='text-sm opacity-70'>
                          {el?.infoRu || 'Описание'}
                        </p>
                      </div>
                    </div>
                    <span className='text-colPurple font-bold'>
                      {el?.cost} $
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DepotDetail;
