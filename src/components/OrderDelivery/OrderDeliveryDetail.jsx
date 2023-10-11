import { useForm } from 'react-hook-form';

const OrderDeliveryDetail = () => {
  const { register } = useForm();

  return (
    <form className='pl-10'>
      <div className='grid grid-cols-2 gap-6 max-w-[768px]'>
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
            defaultValue='2023-09-11'
            {...register('dateArrival', {
              required: false,
            })}
          />
        </div>
        <div>
          <p className='font-medium mb-2'>
            Через какой сервис доставки будет доставлен ваш заказ на наш склад?
          </p>
          <input
            className='w-full border border-colGray2 p-4 rounded-lg focus:border-black focus:outline-none'
            placeholder='Необязательно'
            {...register('deliveryService', {
              required: false,
            })}
          />
        </div>
      </div>
      <button
        type='submit'
        className='font-medium hover:opacity-80 p-3 flex justify-center items-center ml-auto rounded-lg bg-black text-white duration-150 max-w-[280px] w-full mt-5'
      >
        Далее
      </button>
    </form>
  );
};

export default OrderDeliveryDetail;
