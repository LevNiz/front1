import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

const OrderDeliverySender = ({ register, errors, control }) => {
  return (
    <div className='pl-10'>
      <div className='grid grid-cols-2 gap-6 max-w-[768px]'>
        <div>
          <p className='font-medium mb-2'>ФИО отправителя</p>
          <input
            className='w-full border border-colGray2 p-4 rounded-lg focus:border-black focus:outline-none'
            placeholder='Имя отправителя'
            {...register('senderName', {
              required: 'Поле обязательно к заполнению!',
            })}
          />
          {errors?.senderName && (
            <p className='text-red-500 mt-1 text-sm'>
              {errors?.senderName?.message || 'Поле обязательно к заполнению!'}
            </p>
          )}
        </div>
        <div>
          <p className='font-medium mb-2'>Номер отправителя</p>
          <Controller
            name='senderPhone'
            className='w-full'
            control={control}
            defaultValue=''
            rules={{
              required: 'Поле обязательно к заполнению!',
              validate: (value) => value !== '996',
            }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                placeholder='Введите номер телефона'
                country={'kg'}
                specialLabel={false}
                inputProps={{
                  className:
                    'w-full border border-colGray2 p-4 pl-[56px] rounded-lg focus:border-black focus:outline-none',
                }}
              />
            )}
          />
          {errors?.senderPhone && (
            <p className='text-red-500 mt-1 text-sm'>
              {errors?.senderPhone?.message || 'Поле обязательно к заполнению!'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDeliverySender;
