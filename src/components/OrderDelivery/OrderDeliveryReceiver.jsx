import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

const OrderDeliveryReceiver = ({ register, errors, control }) => {
  return (
    <div className='md:pl-5 lg:pl-10'>
      <div className='grid mm:grid-cols-2 gap-6 max-w-[768px]'>
        <div>
          <p className='font-medium mb-2'>ФИО получателя</p>
          <input
            className='w-full border border-colGray2 p-4 rounded-lg focus:border-black focus:outline-none'
            placeholder='Имя получателя'
            {...register('receiverName', {
              required: 'Поле обязательно к заполнению!',
            })}
          />
          {errors?.receiverName && (
            <p className='text-red-500 mt-1 text-sm'>
              {errors?.receiverName.message || 'Error!'}
            </p>
          )}
        </div>
        <div>
          <p className='font-medium mb-2'>Номер получателя</p>
          <Controller
            name='receiverPhone'
            className='w-full'
            control={control}
            defaultValue=''
            rules={{
              required: 'Поле обязательно к заполнению!',
            }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                placeholder='Введите номер телефона'
                country={'kg'}
                countryCodeEditable={false}
                specialLabel={false}
                onChange={(value) => {
                  field.onChange(`+${value}`);
                }}
                value={field.value}
                inputProps={{
                  className:
                    'w-full border border-colGray2 p-4 pl-[56px] rounded-lg focus:border-black focus:outline-none',
                }}
              />
            )}
          />
          {errors?.receiverPhone && (
            <p className='text-red-500 mt-1 text-sm'>
              {errors?.receiverPhone?.message ||
                'Поле обязательно к заполнению!'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDeliveryReceiver;
