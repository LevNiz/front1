import nounBox from './../../assets/icons/noun-box.svg';
import mapImg from './../../assets/images/map.png';
import sender from './../../assets/icons/sender.svg';
import receiver from './../../assets/icons/location3.svg';
import cargo from './../../assets/icons/cargo.svg';
import dollar from './../../assets/icons/dollar.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  PatchParcelsPaymentStatus,
  fetchParcelDetail,
  fetchSaveParcel,
} from '../../api/parcels';
import { ButtonLoading, ContentLoading } from '../../helpers/Loader/Loader';
import { useSelector } from 'react-redux';
import { parcelStatus } from '../../constants/statusData';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';
import { currency } from '../../constants/currency';

const DetailInfo = (props) => {
  const userID = useSelector((state) => state?.user?.userID);
  const { id } = useParams();
  const navigate = useNavigate();

  const [parcelDetail, setParcelDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const saveParcel = async () => {
    setButtonLoading(true);
    const data = {
      clients: userID,
      package: parseInt(id),
    };
    if (userID !== null) {
      const { success } = await fetchSaveParcel(data);
      if (success) {
        setButtonLoading(false);
        setSaved(true);
      }
    } else {
      navigate('/auth/sign-in');
    }
    setButtonLoading(false);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { success, data } = await fetchParcelDetail(
        id,
        parcelDetail?.client?.id
      );
      if (success) {
        if (data?.clients?.includes(userID)) {
          setSaved(true);
        }
        setParcelDetail(data);
        setLoading(false);
      }
      setLoading(false);
    })();
  }, [id, userID, parcelDetail?.client?.id]);

  useEffect(() => {
    scrollToTop();
  }, []);

  const payForParcel = () => {
    const amount = parcelDetail?.totalCost * currency;
    var data = {
      token: import.meta.env.VITE_REACT_APP_FREE_DOM_PAY_TOKEN,
      payment: {
        order: `${parcelDetail?.id}`,
        amount: amount,
        language: 'ru',
        currency: 'KGS',
        description: `Оплата за услуги доставки (${parcelDetail?.orderNumber})`,
        options: {
          user: {
            email: `${parcelDetail?.client?.login}`,
            phone: `${parcelDetail?.client?.phone}`,
          },
        },
      },
      successCallback: async () => {
        const { success } = await PatchParcelsPaymentStatus(id);
        if (success) {
          setLoading(true);
          const { success, data } = await fetchParcelDetail(
            id,
            parcelDetail?.client?.id
          );
          if (success) {
            if (data?.clients?.includes(userID)) {
              setSaved(true);
            }
            setParcelDetail(data);
            setLoading(false);
          }
          setLoading(false);
        }
      },
      errorCallback: function (payment) {
        console.error(`Error: ${payment}`);
      },
    };

    // eslint-disable-next-line no-undef
    var widget = new PayBox(data);
    widget.create();
  };

  const handlePayForParcel = () => {
    if (parcelDetail?.totalCost > -20) {
      payForParcel();
    } else {
      alert('Минимальная сумма оплаты 20 сомов!');
    }
  };

  return (
    <div className='bg-colBgGray2 pt-20'>
      {loading ? (
        <ContentLoading extraStyle='85vh' />
      ) : (
        <div className='pt-12 pb-20 content'>
          <div className='flex justify-center items-center mb-12'>
            <img className='sm:block hidden sm:w-12' src={nounBox} alt='*' />
            <h2 className='text-xl sm:text-2xl font-medium break-all bg-colPurple sm:bg-transparent text-white sm:text-black p-3 rounded-md'>
              {parcelDetail?.orderNumber}
            </h2>
          </div>
          <div className='flex mm:flex-row flex-col'>
            <div className='w-full mm:w-3/6 lg:w-2/5 mt-8 mm:mt-0 mm:mr-4 lg:mr-8 mm:order-none order-1'>
              <img className='w-full' src={mapImg} alt='*' />
            </div>
            <div className='w-full mm:w-3/6 lg:w-3/5'>
              <div className='grid lg:grid-cols-2 gap-8'>
                <div className='bg-white w-full p-6 sm:p-8 rounded-[20px] col-span-2 lg:col-span-1 flex flex-col justify-between'>
                  <div className='flex relative'>
                    <div className='flex flex-col items-center'>
                      <div className='w-[33px] min-h-[33px] bg-[#EFEFEF] rounded-md flex justify-center items-center'>
                        <img src={sender} alt='*' />
                      </div>
                      <div className='absolute top-[33px] w-[2px] h-full bg-colYellow'></div>
                    </div>
                    <div className='ml-4 pb-7'>
                      <h4 className='text-sm font-medium'>Отправитель</h4>
                      <p className='text-xs mb-2'>
                        {parcelDetail?.senderName ?? 'Не указано'}
                      </p>
                      <p className='text-xs'>
                        {parcelDetail?.senderCountry?.nameRu ??
                          'страна не указана'}
                        ,{' '}
                        {parcelDetail?.senderCity?.nameRu ?? 'город не указан'},{' '}
                        {parcelDetail?.client?.address ?? 'Не указано'}
                      </p>
                      <p className='text-xs'>
                        {parcelDetail?.senderPhone ?? 'Телефон не указан'}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center z-10'>
                    <div className='flex flex-col items-center'>
                      <div className='w-[33px] h-[33px] bg-[#EFEFEF] rounded-md flex justify-center items-center'>
                        <img src={cargo} alt='*' />
                      </div>
                      <div className='w-[2px] h-full bg-colYellow'></div>
                    </div>
                    <div
                      className={`${
                        parcelStatus[parcelDetail?.status]?.statusStyle
                      } px-4 py-1 rounded-lg ml-4`}
                    >
                      <h4 className='text-sm'>
                        {parcelStatus[parcelDetail?.status]?.name ||
                          'Не указан'}
                      </h4>
                    </div>
                  </div>
                  <div className='flex pt-10 relative'>
                    <div className='flex flex-col items-center'>
                      <div className='w-[2px] h-[92px] bg-colGray2 absolute -top-[45%] z-0'></div>
                      <div className='w-[33px] h-[33px] bg-[#EFEFEF] rounded-md flex justify-center items-center'>
                        <img src={receiver} alt='*' />
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h4 className='text-sm font-medium'>Получатель</h4>
                      <p className='text-xs mb-2'>
                        {parcelDetail?.receiverName ?? 'Не указано'}
                      </p>
                      <p className='text-xs'>
                        {parcelDetail?.receiverCountry?.nameRu ??
                          'страна не указана'}
                        ,{' '}
                        {parcelDetail?.receiverCity?.nameRu ??
                          'город не указан'}
                        , {parcelDetail?.client?.address ?? 'Не указано'}
                      </p>
                      <p className='text-xs'>
                        {parcelDetail?.receiverPhone ?? 'Телефон не указан'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='bg-white w-full p-6 sm:p-8 rounded-[20px] col-span-2 lg:col-span-1'>
                  <div className='flex justify-between items-center mb-6'>
                    <h3 className='font-medium'>Квитанция на счет</h3>
                  </div>
                  <div className='flex'>
                    <div className='flex flex-col items-center'>
                      <div className='w-[33px] h-[33px] bg-[#EFEFEF] rounded-md flex justify-center items-center'>
                        <img src={sender} alt='*' />
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h4 className='text-sm font-medium'>Объем посылки</h4>
                      <p className='text-xs mb-2'>{parcelDetail?.weight} кг</p>
                    </div>
                  </div>
                  <div className='flex items-center z-10 mt-4'>
                    <div className='flex flex-col items-center'>
                      <div className='w-[33px] h-[33px] bg-[#EFEFEF] rounded-md flex justify-center items-center'>
                        <img src={dollar} alt='*' />
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h4 className='text-sm font-medium'>Цена за кг</h4>
                      <div className='flex items-center'>
                        <p className='text-xs whitespace-nowrap'>
                          {parcelDetail?.costPerKg} $
                        </p>
                        <span className='text-[10px] font-light pl-1 whitespace-nowrap'>
                          ({parcelDetail?.costPerKg * currency} с)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center z-10 mt-4'>
                    <div className='flex flex-col items-center'>
                      <div className='w-[33px] h-[33px] bg-[#EFEFEF] rounded-md flex justify-center items-center'>
                        <img src={dollar} alt='*' />
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h4 className='text-sm font-medium'>
                        Дополнительная плата
                      </h4>
                      <div className='flex items-center'>
                        <p className='text-xs whitespace-nowrap'>
                          {parcelDetail?.extraCost} $
                        </p>
                        <span className='text-[10px] font-light pl-1 pt-[2px] whitespace-nowrap'>
                          ({parcelDetail?.extraCost * currency} с)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center my-5'>
                    <h4 className='font-medium'>Итого</h4>
                    <div className='flex items-center'>
                      <h4 className='font-bold text-colPurple pr-1 whitespace-nowrap'>
                        {parcelDetail?.totalCost} $
                      </h4>
                      <span className='text-xs text-colPurple whitespace-nowrap pt-[2px]'>
                        ({parcelDetail?.totalCost * currency} c)
                      </span>
                    </div>
                  </div>
                  {parcelDetail?.paymentStatus === 'paid' ? (
                    <div className='font-medium px-4 h-12 flex justify-center items-center text-lg rounded-lg bg-black opacity-50 cursor-not-allowed text-white w-full'>
                      Оплачено
                    </div>
                  ) : (
                    <button
                      onClick={handlePayForParcel}
                      className='hover:opacity-80 font-medium px-4 h-12 text-lg rounded-lg text-white bg-black duration-150 w-full'
                    >
                      Оплатить
                    </button>
                  )}
                </div>
                <div className='bg-white w-full p-6 sm:p-8 rounded-[20px] col-span-2'>
                  <h3 className='mb-2 font-medium'>Комментарии</h3>
                  <p>{parcelDetail?.comment}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-end items-center'>
            <button
              onClick={saveParcel}
              disabled={saved}
              className={`${
                saved
                  ? 'opacity-50 hover:opacity-50 cursor-not-allowed'
                  : 'hover:opacity-80'
              } relative p-4 rounded-lg bg-black text-white flex justify-center items-center sm:max-w-[280px] h-14 sm:h-12 mt-8 w-full font-bold duration-150`}
            >
              {buttonLoading ? (
                <ButtonLoading />
              ) : saved ? (
                'Сохранен'
              ) : (
                'Сохранить'
              )}
              {saved ? (
                <svg
                  className='absolute right-3'
                  xmlns='http://www.w3.org/2000/svg'
                  width={24}
                  height={24}
                  viewBox='0 0 256 256'
                  {...props}
                >
                  <path
                    fill='#fff'
                    strokeMiterlimit={10}
                    d='M6 2a2.002 2.002 0 0 0-2 2v18l8-3 8 3V4a2.003 2.003 0 0 0-2-2z'
                    fontFamily='none'
                    fontSize='none'
                    fontWeight='none'
                    style={{
                      mixBlendMode: 'normal',
                    }}
                    textAnchor='none'
                    transform='scale(10.66667)'
                  />
                </svg>
              ) : (
                <svg
                  className='absolute right-3'
                  xmlns='http://www.w3.org/2000/svg'
                  width={24}
                  height={24}
                  viewBox='0 0 256 256'
                  {...props}
                >
                  <path
                    fill='#fff'
                    strokeMiterlimit={10}
                    d='M16.5 5C12.928 5 10 7.928 10 11.5v30a1.5 1.5 0 0 0 2.377 1.217L24 34.347l11.623 8.37A1.5 1.5 0 0 0 38 41.5v-30C38 7.928 35.072 5 31.5 5zm0 3h15c1.95 0 3.5 1.55 3.5 3.5v27.072l-10.123-7.289a1.5 1.5 0 0 0-1.754 0L13 38.573V11.5C13 9.55 14.55 8 16.5 8z'
                    fontFamily='none'
                    fontSize='none'
                    fontWeight='none'
                    style={{
                      mixBlendMode: 'normal',
                    }}
                    textAnchor='none'
                    transform='scale(5.33333)'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailInfo;
