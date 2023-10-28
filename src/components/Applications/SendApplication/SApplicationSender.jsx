const SApplicationSender = ({ register, errors }) => {
  return (
    <div className='md:pl-5 lg:pl-10'>
      <div className='grid mm:grid-cols-2 gap-6 max-w-[768px]'>
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
          <input
            className='w-full border border-colGray2 p-[16px] mm:p-[15px_20px_15px_44px] rounded-lg focus:border-black focus:outline-none'
            placeholder='Номер телефона'
            type='tel'
            {...register('senderPhone', {
              required: 'Поле обязательно к заполнению!',
              pattern: {
                value: /^[\d()+ -]+$/,
                message: 'Введите только цифры!',
              },
            })}
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

export default SApplicationSender;
