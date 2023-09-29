import nounBox from './../../assets/icons/noun-box.svg';
import mapImg from './../../assets/images/map.png';
import sender from './../../assets/icons/sender.svg';
import receiver from './../../assets/icons/receiver.svg';
import cargo from './../../assets/icons/cargo.svg';
import dollar from './../../assets/icons/dollar.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchParcelDetail, fetchSaveParcel } from '../../api/parcels';
import { ButtonLoading, ContentLoading } from '../../helpers/Loader/Loader';
import { useSelector } from 'react-redux';

const DetailInfo = (props) => {
  const userID = useSelector((state) => state?.user?.userID);
  const { id } = useParams();
  const navigate = useNavigate();

  const [parcelDetail, setParcelDetail] = useState();
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
  }, [id]);

  return (
    <div className='bg-colBgGray2 pt-20'>
      {loading ? (
        <ContentLoading extraStyle='85vh' />
      ) : (
        <div className='pt-12 pb-20 content'>
          <div className='flex justify-center items-center mb-12'>
            <img src={nounBox} alt='*' />
            <h2 className='text-2xl font-medium ml-6'>
              {parcelDetail?.orderNumber}
            </h2>
          </div>
          <div className='mm:flex'>
            <div className='w-full mm:w-3/6 lg:w-2/5 mb-8 mm:mb-0 mm:mr-4 lg:mr-8'>
              <img className='w-full' src={mapImg} alt='*' />
            </div>
            <div className='w-full mm:w-3/6 lg:w-3/5'>
              <div className='grid lg:grid-cols-2 gap-8'>
                <div className='bg-white w-full p-6 sm:p-10 rounded-[20px] col-span-2 lg:col-span-1 flex flex-col justify-between'>
                  <div className='flex'>
                    <div className='flex flex-col items-center'>
                      <div className='w-[33px] h-[33px] bg-[#EFEFEF] rounded-md flex justify-center items-center'>
                        <img src={sender} alt='*' />
                      </div>
                      <div className='w-[2px] h-full bg-colYellow'></div>
                    </div>
                    <div className='ml-4 pb-10'>
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
                    <div className='ml-4'>
                      <h4 className='text-sm font-medium'>
                        {parcelDetail?.status == 'done'
                          ? 'Готово'
                          : parcelDetail?.status == 'on_way'
                          ? 'В пути'
                          : parcelDetail?.status == 'arrived'
                          ? 'Получено'
                          : parcelDetail?.status == 'created'
                          ? 'Создан'
                          : 'Не указано'}
                      </h4>
                    </div>
                  </div>
                  <div className='flex pt-16'>
                    <div className='flex flex-col items-center relative'>
                      <div className='w-[2px] h-full bg-colGray2 absolute -top-[100%] z-0'></div>
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
                <div className='bg-white w-full p-6 sm:p-10 rounded-[20px] col-span-2 lg:col-span-1'>
                  <h3 className='mb-6 max-w-[420px] mx-auto font-medium'>
                    Квитанция на счет
                  </h3>
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
                  <div className='flex items-center z-10 mt-5'>
                    <div className='flex flex-col items-center'>
                      <div className='w-[33px] h-[33px] bg-[#EFEFEF] rounded-md flex justify-center items-center'>
                        <img src={dollar} alt='*' />
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h4 className='text-sm font-medium'>Цена за кг</h4>
                      <p className='text-xs mb-2'>
                        {parcelDetail?.costPerKg} $
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center z-10 mt-5'>
                    <div className='flex flex-col items-center'>
                      <div className='w-[33px] h-[33px] bg-[#EFEFEF] rounded-md flex justify-center items-center'>
                        <img src={dollar} alt='*' />
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h4 className='text-sm font-medium'>
                        Дополнительная плата
                      </h4>
                      <p className='text-xs mb-2'>
                        {parcelDetail?.costPerKg} $
                      </p>
                    </div>
                  </div>
                  <div className='flex justify-between items-center my-5'>
                    <h4 className='font-medium'>Итого</h4>
                    <span className='font-medium'>
                      {parcelDetail?.extraCost} $
                    </span>
                  </div>
                  <div className='flex justify-end mt-2'>
                    <span className='colGreen2 rounded-[10px] bg-colGreen2 px-6 py-2 font-medium'>
                      {parcelDetail?.paymentStatus == 'paid'
                        ? 'Оплачено'
                        : 'Не оплачено'}
                    </span>
                  </div>
                </div>
                <div className='bg-white w-full p-6 sm:p-10 rounded-[20px] col-span-2'>
                  <h3 className='mb-2 font-medium'>Комментарии</h3>
                  <p>{parcelDetail?.comment}</p>
                </div>
              </div>
              <div className='flex justify-end items-center'>
                <button
                  onClick={saveParcel}
                  disabled={saved}
                  className={`${
                    saved
                      ? 'opacity-50 hover:opacity-50 cursor-not-allowed'
                      : ''
                  } relative p-4 rounded-lg bg-black text-white flex justify-center items-center max-w-[280px] h-12 mt-8 w-full font-bold hover:opacity-80 duration-150`}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailInfo;
