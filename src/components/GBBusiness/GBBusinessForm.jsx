import { useForm } from 'react-hook-form';

const GBBusinessForm = () => {
  const {
    // handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  return (
    <div className='content py-8'>
      <h2 className='text-2xl font-medium mb-8 text-center'>Напишите нам:</h2>
      <form className='shadow-[0_8px_34px_#00000026] rounded-lg p-8 mb-12'>
        <div className='grid grid-cols-2 gap-6'>
          <div>
            <p className='font-medium mb-2'>Контактное лицо</p>
            <input
              className='w-full border border-colGray2 p-[16px] mm:p-[14px] rounded-[4px] focus:border-black focus:outline-none'
              {...register('name', {
                required: 'Поле обязательно к заполнению!',
              })}
            />
            {errors?.name && (
              <p className='text-red-500 mt-1 text-sm'>
                {errors?.name?.message || 'Поле обязательно к заполнению!'}
              </p>
            )}
          </div>
          <div>
            <p className='font-medium mb-2'>E-mail</p>
            <input
              className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
              type='email'
              {...register('email', {
                required: 'Поле обязательно к заполнению!',
              })}
            />
            {errors?.email && (
              <p className='text-red-500 mt-1 text-sm'>
                {errors?.email?.message || 'Поле обязательно к заполнению!'}
              </p>
            )}
          </div>
          <div>
            <p className='font-medium mb-2'>Телефона</p>
            <input
              className='w-full border border-colGray2 p-[16px] mm:p-[14px] rounded-[4px] focus:border-black focus:outline-none'
              type='tel'
              {...register('phone', {
                required: 'Поле обязательно к заполнению!',
                pattern: {
                  value: /^[\d()+ -]+$/,
                  message: 'Введите только цифры!',
                },
              })}
            />
            {errors?.phone && (
              <p className='text-red-500 mt-1 text-sm'>
                {errors?.phone?.message || 'Поле обязательно к заполнению!'}
              </p>
            )}
          </div>
          <div>
            <p className='font-medium mb-2'>Описание</p>
            <input
              className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
              {...register('comment', {
                required: 'Поле обязательно к заполнению!',
              })}
            />
            {errors?.comment && (
              <p className='text-red-500 mt-1 text-sm'>
                {errors?.comment?.message || 'Поле обязательно к заполнению!'}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default GBBusinessForm;
