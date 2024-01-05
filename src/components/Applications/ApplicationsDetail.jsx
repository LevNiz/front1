import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { fetchApplicationsDetail } from '../../api/applications';
import { ContentLoading } from '../../helpers/Loader/Loader';
import { ErrorServer } from '../../helpers/Errors/ErrorServer';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';

const ApplicationsDetail = () => {
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { success, data } = await fetchApplicationsDetail(id);
      if (success) {
        setOrder(data);
        setIsLoading(false);
      } else {
        setOrder('error');
        setIsLoading(false);
      }
    })();
    scrollToTop();
  }, [id]);

  return (
    <div className='content py-20 min-h-[720px]'>
      {isLoading ? (
        <ContentLoading extraStyle={480} />
      ) : order === 'error' ? (
        <ErrorServer />
      ) : (
        <>
          <div className='flex justify-between items-start mm:items-center py-3'>
            <h2 className='text-2xl font-medium pr-3 mm:font-bold break-all'>
              Заявка #{order?.toCountry?.code + order?.toCity?.code + order?.id}
            </h2>
            <NavLink
              // to={`/applications/update/${order?.id}`}
              onClick={() => alert('В процессе разработки!')}
              className='bg-black text-white py-2 ss:py-[10px] px-3 sm:px-5 font-medium rounded-md hover:opacity-70 duration-100 text-xs sm:text-sm'
            >
              Редактировать
            </NavLink>
          </div>
          <div className='mm:p-8 bg-white rounded mm:shadow-xl mt-4'>
            <div className='grid mm:grid-cols-2 gap-4'>
              <div>
                <p className='text-lg font-bold'>Отправитель:</p>
                <p>{order?.senderName}</p>
                <p>{order?.senderPhone}</p>
                <p>
                  {order?.fromCountry?.nameRu}, {order?.fromCity?.nameRu}
                </p>
              </div>
              <div>
                <p className='text-lg font-bold'>Получатель:</p>
                <p>{order?.receiverName}</p>
                <p>{order?.receiverPhone}</p>
                <p>
                  {order?.toCountry?.nameRu}, {order?.toCity?.nameRu}
                </p>
              </div>
            </div>
            <div className='mt-4'>
              <p className='text-lg font-bold'>Информация о посылке:</p>
              <p>Вес: {order?.weight} кг</p>
              <p>
                Размеры: {order?.height}x{order?.width}x{order?.length} см
              </p>
            </div>
            <div className='mt-4'>
              <p className='text-lg font-bold'>Информация о доставке:</p>
              <p>Дата отправки: {order?.dateSending}</p>
              <p>Тип услуги: {order?.serviceName}</p>
              <p>Номер трака: {order?.trackNumbers}</p>
            </div>
            <div className='mt-4'>
              <p className='text-lg font-bold'>Комментарий клиента:</p>
              <p>{order?.comment}</p>
            </div>
            <div className='mt-4'>
              <p className='text-lg font-bold'>Информация о клиенте:</p>
              <p>{order?.client?.fullname}</p>
              <p>Email: {order?.client?.login}</p>
              <p>Телефон: {order?.client?.phone}</p>
              <p>Адрес: {order?.client?.address}</p>
            </div>
            <div className='mt-4'>
              <p className='text-2xl font-bold pt-3 text-right'>
                Стоимость: ${order?.cost}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationsDetail;
