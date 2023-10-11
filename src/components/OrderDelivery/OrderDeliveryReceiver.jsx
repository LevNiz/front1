import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

const OrderDeliveryReceiver = () => {
  const { register } = useForm();

  return (
    <form className='pl-10'>
      <div className='grid grid-cols-2 gap-6 max-w-[768px]'>
        <div>
          <p className='font-medium mb-2'>ФИО получателя</p>
          <input
            className='w-full border border-colGray2 p-4 rounded-lg focus:border-black focus:outline-none'
            placeholder='Имя получателя'
            {...register('receiverName', {
              required: 'Поле обязательно к заполнению!',
            })}
          />
        </div>
        <div>
          <p className='font-medium mb-2'>Номер получателя</p>
          <PhoneInput
            country={'kg'}
            specialLabel={false}
            inputProps={{
              name: 'receiverPhone',
              required: true,
              className:
                'w-full border border-colGray2 p-4 pl-[56px] rounded-lg focus:border-black focus:outline-none',
            }}
            {...register('receiverPhone', {
              required: 'Поле обязательно к заполнению!',
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

export default OrderDeliveryReceiver;
