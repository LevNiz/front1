import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepotsDetail } from '../../api/depots';
import { ContentLoading } from '../../helpers/Loader/Loader';
import { DepotMap } from './DepotMap';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';
import { fetchCosts } from '../../api/costs';
import { fetchExtraServices } from '../../api/extraServices';
import location from '../../assets/icons/new-location.svg';
import clock from '../../assets/icons/timeSvg.svg';
import call from '../../assets/icons/new-call.svg';
import userIcon from '../../assets/icons/new-profile.svg';
import arrow from '../../assets/icons/down.svg';
import arrowWhite from '../../assets/icons/arrow-white.svg';
import noImg from '../../assets/images/no-image.svg';
import parcel from '../../assets/icons/my-parcel.svg';
import attention from '../../assets/icons/attention3.svg';
import infoIcon1 from '../../assets/icons/depot-info1.svg';
import infoIcon2 from '../../assets/icons/depot-info2.svg';
import box from '../../assets/icons/noun-box.svg';
import copy from '../../assets/icons/copy.svg';
import instruction from '../../assets/icons/instruction.svg';

const DepotDetail = () => {
  const [depotItem, setDepotItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [mainImg, setMainImg] = useState(null);
  const [openTariff, setOpenTariff] = useState(false);
  const [openExtraTariff, setOpenExtraTariff] = useState(false);

  const { costs } = useSelector((state) => state?.costs);
  const { extraServices } = useSelector((state) => state?.extraServices);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredTariffs = costs?.filter(
    (el) => el?.fromCity?.id === depotItem?.city?.id
  );

  const handleClick = (index) => {
    const main = images[index];
    setMainImg(main);
  };

  const copyToClipboard = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    alert('Текст скопирован!');
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
          <h1 className='text-2xl sm:text-4xl font-medium text-center sm:mt-4 mb-6 sm:mb-14'>
            {depotItem?.nameRu}
          </h1>
          <div className='dd:flex pb-12 min-h-[576px]'>
            <div className='w-full dd:w-3/6 xl:w-2/5 mb-5 mm:mb-12 dd:mb-0 px-4 mm:px-0'>
              <div className='dd:max-w-[472px] h-[320px] sm:h-[400px] overflow-hidden rounded-lg mx-auto bg-colBgGray'>
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
              <div className='flex justify-center space-x-3 mt-5'>
                {depotItem?.images !== null
                  ? images?.map((el, index) => (
                      <div
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
                      </div>
                    ))
                  : ''}
              </div>
            </div>
            <div className='dd:w-3/6 xl:w-3/5'>
              <div className='dd:max-w-[630px] w-full mx-auto mm:px-5 pb-5'>
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
                <div className='rounded-xl bg-gray-100 mt-6 px-2 py-3 sm:p-4 space-y-3 mx-4 mm:mx-0'>
                  <div className='flex justify-between'>
                    <span className='w-9 h-9 min-w-[36px] mt-6 rounded-md flex items-center justify-center bg-white p-1'>
                      <img src={userIcon} alt='*' />
                    </span>
                    <div className='w-full space-y-2'>
                      <div className='ml-3'>
                        <p className='text-sm pb-1'>Имя</p>
                        <div className='bg-white rounded-md py-1.5 pl-3 pr-1.5 flex justify-between items-start'>
                          <p>{depotItem?.nameStr || 'Не указано'}</p>
                          <img
                            className='cursor-pointer'
                            onClick={() => copyToClipboard(depotItem?.nameStr)}
                            src={copy}
                            alt='*'
                          />
                        </div>
                      </div>
                      <div className='ml-3'>
                        <p className='text-sm pb-1'>Фамилия</p>
                        <div className='bg-white rounded-md py-1.5 pl-3 pr-1.5 flex justify-between items-start'>
                          <p>{depotItem?.surnameStr || 'Не указано'}</p>
                          <img
                            className='cursor-pointer'
                            onClick={() =>
                              copyToClipboard(depotItem?.surnameStr)
                            }
                            src={copy}
                            alt='*'
                          />
                        </div>
                      </div>
                      <div className='flex items-start pt-1'>
                        <img className='w-6 h-6' src={instruction} alt='*' />
                        <span className='text-xs font-light italic pl-2'>
                          {depotItem?.instructionsRu || 'Не указано'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-start'>
                    <span className='w-9 h-9 min-w-[36px] mt-6 rounded-md flex items-center justify-center bg-white p-1'>
                      <img src={location} alt='*' />
                    </span>
                    <div className='w-full space-y-2'>
                      <div className='ml-3'>
                        <p className='text-sm pb-1'>Адрес</p>
                        <div className='bg-white rounded-md py-1.5 pl-3 pr-1.5 flex justify-between items-start break-all'>
                          <p>{depotItem?.address || 'Не указано'}</p>
                          <img
                            className='cursor-pointer'
                            onClick={() => copyToClipboard(depotItem?.address)}
                            src={copy}
                            alt='*'
                          />
                        </div>
                      </div>
                      <div className='ml-3'>
                        <p className='text-sm pb-1'>Zip код</p>
                        <div className='bg-white rounded-md py-1.5 pl-3 pr-1.5 flex justify-between items-start'>
                          <p>{depotItem?.link_zip || 'Не указано'}</p>
                          <img
                            className='cursor-pointer'
                            onClick={() => copyToClipboard(depotItem?.link_zip)}
                            src={copy}
                            alt='*'
                          />
                        </div>
                      </div>
                      <div className='ml-3'>
                        <p className='text-sm pb-1'>Город</p>
                        <div className='bg-white rounded-md py-1.5 pl-3 pr-1.5 flex justify-between items-start'>
                          <p>{depotItem?.cityStr || 'Не указано'}</p>
                          <img
                            className='cursor-pointer'
                            onClick={() => copyToClipboard(depotItem?.cityStr)}
                            src={copy}
                            alt='*'
                          />
                        </div>
                      </div>
                      <div className='ml-3'>
                        <p className='text-sm pb-1'>Штат / Регион</p>
                        <div className='bg-white rounded-md py-1.5 pl-3 pr-1.5 flex justify-between items-start'>
                          <p>{depotItem?.stateStr || 'Не указано'}</p>
                          <img
                            className='cursor-pointer'
                            onClick={() => copyToClipboard(depotItem?.stateStr)}
                            src={copy}
                            alt='*'
                          />
                        </div>
                      </div>
                      <div className='ml-3'>
                        <p className='text-sm pb-1'>Страна</p>
                        <div className='bg-white rounded-md py-1.5 pl-3 pr-1.5 flex justify-between items-start'>
                          <p>{depotItem?.country?.nameRu || 'Не указано'}</p>
                          <img
                            className='cursor-pointer'
                            onClick={() =>
                              copyToClipboard(depotItem?.country?.nameRu)
                            }
                            src={copy}
                            alt='*'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-end'>
                    <span className='w-9 h-9 min-w-[36px] rounded-md flex items-center justify-center mt-1 bg-white p-1'>
                      <img src={call} alt='*' />
                    </span>
                    <div className='ml-3 w-full'>
                      <p className='text-sm pb-1'>Номер телефона</p>
                      <div className='bg-white rounded-md py-1.5 pl-3 pr-1.5 flex justify-between items-start'>
                        <p>{depotItem?.contacts?.phone}</p>
                        <img
                          className='cursor-pointer'
                          onClick={() =>
                            copyToClipboard(depotItem?.contacts?.phone)
                          }
                          src={copy}
                          alt='*'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='flex items-start pt-2'>
                    <span className='w-9 h-9 min-w-[36px] rounded-md flex items-center justify-center mt-1 bg-white p-1'>
                      <img src={clock} alt='*' />
                    </span>
                    <div className='ml-3 w-full'>
                      {depotItem?.workingHours?.map((el, index) => (
                        <div
                          className='grid grid-cols-2 gap-4 bg-white rounded-md py-2 pl-3 pr-2 text-sm sm:text-base'
                          key={index}
                        >
                          <div>
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
                          </div>
                          <div>
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
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='flex items-start py-3'>
                    <img className='w-6 h-6' src={instruction} alt='*' />
                    <span className='text-xs font-light italic pl-2'>
                      Уважаемые клиенты просьба заполнять адрес строго в
                      соответствии с нашими инструкциями , при неправильно
                      заполненном адресе за поиск ваших отправлений будет
                      взыматься дополнительная плата!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='text-center pb-10 text-xl content'>
            <h4>У вас коммерческий груз?</h4>
            <h4 className='font-bold'>Не проблема!</h4>
            <h4>
              Отправьте заявку прямо сейчас в разделе{' '}
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
                } p-3 mm:p-5 bg-gray-50 flex-col space-y-4`}
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
                          className='bg-black text-white rounded-md px-3 py-1 text-sm hover:opacity-80 duration-150 mt-4 lg:mt-0 flex ml-auto'
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
                } p-3 mm:p-5 bg-gray-50 flex-col space-y-4`}
              >
                <p className='opacity-70'>
                  Вы можете закзать следующие SMART услуги до того, как ваша
                  посылка постуи пить в наш склад.
                </p>
                {extraServices?.map((el) => (
                  <div key={el?.id} className='flex justify-between'>
                    <div className='flex'>
                      <img
                        className='min-w-[24px] w-6 h-6 mr-2 mt-1'
                        src={el?.icon}
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
          <div className='flex items-center pt-16 px-3'>
            <img src={attention} alt='*' />
            <span className='ml-2 text-xl'>Внимание</span>
          </div>
          <div className='lg:flex lg:space-x-5 pt-5'>
            <div className='lg:w-3/5 rounded-2xl bg-[#FBFBFB] p-5'>
              <div className='flex items-center pb-3'>
                <img src={infoIcon1} alt='*' />
                <span className='font-medium text-xl pl-2 pt-1'>
                  Негабаритный груз
                </span>
              </div>
              <p>
                <strong>Негабаритный груз</strong> - это посылки, где длина
                одной из сторон превышает 150 см. Такие посылки авиакомпания
                принимает, как правило, с дополнительной доплатой на всем пути
                следования груза.
                <br />
                <br />
                Если одна из сторое вашей посылки после упаковки будет более 150
                см., расчет стоимости доставки будет производиться{' '}
                <strong>с доплатой 60% от вашего тарифа</strong>.
              </p>
              <div className='flex items-center pt-8 pb-3'>
                <img src={infoIcon2} alt='*' />
                <span className='font-medium text-xl pl-2 pt-1'>
                  Хранение посылок
                </span>
              </div>
              <div className='border-b-2 border-gray-300 pb-5'>
                <p className='text-colYellow font-medium'>
                  Входящие - 45 дней бесплатно
                </p>
                <p className='text-sm font-medium py-4'>
                  Далее 130 р. в день, максимальный срок хранения - 75 дней.
                </p>
                <div className='relative w-full h-7'>
                  <span className='absolute top-0 font-medium left-0'>
                    0 дн.
                  </span>
                  <span className='absolute top-0 font-medium left-[65%]'>
                    45 дн.
                  </span>
                  <span className='absolute top-0 font-medium right-0'>
                    75 дн.
                  </span>
                </div>
                <div className='relative h-1 w-full bg-colYellow mt-5'>
                  <span className='absolute w-2/6 h-1 bg-black top-0 right-0'></span>
                  <span className='absolute -top-2 left-0 h-5 w-5 bg-colYellow rounded-full'></span>
                  <span className='absolute -top-2 left-[65%] h-5 w-5 bg-black rounded-full'></span>
                  <span className='absolute -top-2 right-0 h-5 w-5 bg-black rounded-full'></span>
                </div>
                <div className='relative w-full h-7 mt-6'>
                  <span className='absolute top-0 font-medium left-[30%]'>
                    0 дн.
                  </span>
                  <span className='absolute top-0 font-medium right-5'>
                    130 дн.
                  </span>
                </div>
                <p className='py-3'>
                  Хранение входящих посылок на складе 45 дней бесплатно, на
                  следующий день и далее 130 р в день за одну посылку.
                  Максимальный срок хранения груза - 75 дней. Далее посылка
                  утилизируется.
                </p>
              </div>
              <div className='pt-8'>
                <p className='text-colYellow font-medium'>
                  Исходящие - 10 дней бесплатно
                </p>
                <p className='text-sm font-medium py-4'>
                  Далее 130 р. в день, максимальный срок хранения - 30 дней.
                </p>
                <div className='relative w-full h-7'>
                  <span className='absolute top-0 font-medium left-0'>
                    0 дн.
                  </span>
                  <span className='absolute top-0 font-medium left-[65%]'>
                    10 дн.
                  </span>
                  <span className='absolute top-0 font-medium right-0'>
                    30 дн.
                  </span>
                </div>
                <div className='relative h-1 w-full bg-colYellow mt-5'>
                  <span className='absolute w-2/6 h-1 bg-black top-0 right-0'></span>
                  <span className='absolute -top-2 left-0 h-5 w-5 bg-colYellow rounded-full'></span>
                  <span className='absolute -top-2 left-[65%] h-5 w-5 bg-black rounded-full'></span>
                  <span className='absolute -top-2 right-0 h-5 w-5 bg-black rounded-full'></span>
                </div>
                <div className='relative w-full h-7 mt-6'>
                  <span className='absolute top-0 font-medium left-[30%]'>
                    0 дн.
                  </span>
                  <span className='absolute top-0 font-medium right-5'>
                    130 дн.
                  </span>
                </div>
                <p className='py-3'>
                  Срок исходящей посылки по статусом “ожидает оплаты”: 10 дней
                  бесплатно, на следующий день и далее 130 р. в день за одну
                  посылку. Максимальный срок хранения груза - 30 дней. Далее
                  посылка утилизируется.
                </p>
              </div>
            </div>
            <div className='lg:w-2/5 h-max rounded-2xl bg-[#FBFBFB] p-5'>
              <div className='flex items-center pb-3'>
                <img className='w-7' src={box} alt='*' />
                <span className='font-medium text-xl pl-2'>Объемный вес</span>
              </div>
              <p className='py-4'>
                Мы знаем как важны правила расчета объемного веса, поэтому
                постараемся максимально подробно рассказать в каких случаях мы
                его считаем
              </p>
              <ul className='pl-2 space-y-2'>
                <li className='font-medium flex text-sm'>
                  <span className='mr-1'>1.</span>
                  <span>
                    Физический вес превышает объемный вес = расчет по
                    физическому весу.
                  </span>
                </li>
                <li className='font-medium flex text-sm'>
                  <span className='mr-1'>2.</span>
                  <span>
                    Объемный вес превышает физический не более, чем на 170% =
                    расчет по физическому весу.
                  </span>
                </li>
                <li className='font-medium flex text-sm'>
                  <span className='mr-1'>3.</span>
                  <span>
                    Объемный вес превышает физический более, чем на 170% =
                    расчет по объемному весу.
                  </span>
                </li>
              </ul>
              <p className='font-medium py-5'>
                Объемный вес будет считаться со скидкой 50% от вашего тарифа.
              </p>
              <div className='p-5 bg-[#F6F6F6] rounded-lg'>
                <p className='font-medium pb-3'>Примеры</p>
                <ul className='space-y-3'>
                  <li>
                    Физический вес посылки <strong>3кг.</strong>, объемный вес
                    <strong>4кг.</strong>, = расчет стоимости как за 3 кг
                  </li>
                  <li>
                    Физический вес посылки <strong>3кг.</strong>, объемный вес
                    <strong>1кг.</strong> = расчет стоимости как за{' '}
                    <strong>3кг.</strong>
                  </li>
                  <li>
                    Физический вес посылки <strong>3кг.</strong>, объемный вес
                    <strong>10кг.</strong> = расчет стоимости{' '}
                    <strong>3кг</strong> по физическому весу, объемный вес{' '}
                    <strong>10кг - 3 кг = 7кг.*50%</strong> от вашего тарифа.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DepotDetail;
