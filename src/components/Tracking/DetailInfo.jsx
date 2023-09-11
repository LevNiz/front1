import nounBox from './../../assets/icons/noun-box.svg';
import mapImg from './../../assets/images/map.png';
import sender from './../../assets/icons/sender.svg';
import reciever from './../../assets/icons/reciever.svg';
import cargo from './../../assets/icons/cargo.svg';
import dollar from './../../assets/icons/dollar.svg';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchParcelDetail } from '../../api/parcels';
import { ContentLoading } from '../../helpers/Loader/Loader';

const DetailInfo = () => {
  const { id } = useParams();
  const [parcelDetail, setParcelDetail] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { success, data } = await fetchParcelDetail(id);
      if (success) {
        setParcelDetail(data);
        setLoading(false);
      }
      setLoading(false);
    })();
  }, [id]);

  return (
    <div className='bg-colBgGray2'>
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
            <div className='w-full mm:w-3/6 lg:w-3/5 grid lg:grid-cols-2 gap-8'>
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
                      , {parcelDetail?.senderCity?.nameRu ?? 'город не указан'},{' '}
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
                      <img src={reciever} alt='*' />
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
                      {parcelDetail?.receiverCity?.nameRu ?? 'город не указан'},{' '}
                      {parcelDetail?.client?.address ?? 'Не указано'}
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
                    <p className='text-xs mb-2'>{parcelDetail?.costPerKg} $</p>
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
                    <p className='text-xs mb-2'>{parcelDetail?.costPerKg} $</p>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailInfo;
