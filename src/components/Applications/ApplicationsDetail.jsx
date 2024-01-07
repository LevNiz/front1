import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { fetchApplicationsDetail } from '../../api/applications';
import { ContentLoading } from '../../helpers/Loader/Loader';
import { ErrorServer } from '../../helpers/Errors/ErrorServer';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';
import { useSelector } from 'react-redux';

const ApplicationsDetail = () => {
  const { extraServices } = useSelector((state) => state?.extraServices);
  const [order, setOrder] = useState({});
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { success, data } = await fetchApplicationsDetail(id);
      if (success) {
        setOrder(data);
        setServices(
          extraServices?.filter((service) =>
            data?.extraServices?.includes(service?.id)
          )
        );
        setIsLoading(false);
      } else {
        setOrder('error');
        setIsLoading(false);
      }
    })();
    scrollToTop();
  }, [id, extraServices]);

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
              to={`/applications/update/${order?.id}`}
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
                <div className='mt-4'>
                  <p className='text-lg font-bold'>Информация о посылке:</p>
                  <p>Вес: {order?.weight} кг</p>
                  <p>
                    Размеры: {order?.height}x{order?.width}x{order?.length} см
                  </p>
                  <p>Тариф: {order?.premium ? 'Премиум' : 'Стандартный'}</p>
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
              </div>
              <div>
                <p className='text-lg font-bold'>Получатель:</p>
                <p>{order?.receiverName}</p>
                <p>{order?.receiverPhone}</p>
                <p>
                  {order?.toCountry?.nameRu}, {order?.toCity?.nameRu}
                </p>
                <p className='text-lg font-bold pt-3'>Дополнительные услуги:</p>
                {services &&
                  services?.map((el) => (
                    <div key={el?.id} className='py-2 max-w-xl'>
                      <div className='flex justify-between shadow-[0_0_10px_#e5e3e3] py-2 px-3 rounded-lg'>
                        <div className='flex'>
                          <div className='w-5 mm:w-6 min-w-[20px] mm:min-w-[24px] h-5 mm:h-6 mr-2'>
                            <img src={el?.icon} alt='*' />
                          </div>
                          <div>
                            <h5 className='text-sm mm:text-base font-medium'>
                              {el?.nameRu}
                            </h5>
                            <p className='text-xs mm:text-sm opacity-60'>
                              {el?.infoRu || 'Описание'}
                            </p>
                          </div>
                        </div>
                        <span className='font-bold text-colPurple min-w-[44px] text-right'>
                          {el?.cost + ` $`}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
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
