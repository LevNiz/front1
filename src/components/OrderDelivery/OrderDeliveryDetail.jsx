const OrderDeliveryDetail = ({ register, errors }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
  const day = String(today.getDate()).padStart(2, '0');

  const todayDate = `${year}-${month}-${day}`;

  return (
    <div className='md:pl-5 lg:pl-10'>
      <div className='grid md:grid-cols-2 gap-6 max-w-[768px]'>
        <div>
          <p className='font-medium mb-2'>Трекинг номер</p>
          <input
            className='w-full border border-colGray2 p-4 rounded-lg focus:border-black focus:outline-none'
            placeholder='Необязательно'
            {...register('orderNumber', {
              required: false,
            })}
          />
        </div>
        <div>
          <p className='font-medium mb-2'>
            Дата прибытия вашей посылки в наш склад
          </p>
          <input
            className='w-full border border-colGray2 p-4 rounded-lg focus:border-black focus:outline-none'
            placeholder='Необязательно'
            type='date'
            defaultValue={todayDate}
            {...register('dateArrival', {
              required: 'Поле обязательно к заполнению!',
            })}
          />
          {errors?.dateArrival && (
            <p className='text-red-500 mt-1 text-sm'>
              {errors?.dateArrival?.message || 'Поле обязательно к заполнению!'}
            </p>
          )}
        </div>
        <div>
          <p className='font-medium mb-2'>
            Через какой сервис доставки будет доставлен ваш заказ на наш склад?
          </p>
          <input
            className='w-full border border-colGray2 p-4 rounded-lg focus:border-black focus:outline-none'
            placeholder='Необязательно'
            {...register('serviceName', {
              required: false,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDeliveryDetail;
