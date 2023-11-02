import { useForm } from 'react-hook-form';
import imgFile from '../../assets/icons/photo.svg';

const GBBusinessForm = () => {
  const {
    // handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  return (
    <div className='content py-8'>
      <h2 className='text-2xl font-medium mb-8 text-center'>Напишите нам:</h2>
      <form className='shadow-[0_8px_34px_#00000026] rounded-lg p-6 sm:p-10 mb-12 max-w-4xl mx-auto'>
        <div className='grid md:grid-cols-2 gap-6'>
          <div>
            <p className='font-medium mb-2'>Контактное лицо</p>
            <input
              className='w-full border border-colGray2 p-[16px] mm:p-[14px] rounded-[4px] focus:border-black focus:outline-none'
              placeholder='Контактное лицо'
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
              placeholder='E-mail'
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
              placeholder='Номер телефона'
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
              placeholder='Описание'
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
        <p className='font-medium mb-2 pt-4'>Прикрепите фото</p>
        <label htmlFor='fileVal'>
          <input className='hidden' id='fileVal' type='file' accept='image/*' />
          <div className='border-dashed border-2 border-[#07AFE3] p-5 flex justify-center items-center cursor-pointer rounded-md'>
            <div className='py-2'>
              <img className='mx-auto' src={imgFile} alt='*' />
              <p className='opacity-50 pt-2'>Загрузить фото</p>
            </div>
          </div>
        </label>
        <div className='flex justify-end'>
          <button
            onClick={() => alert('Эта функция скоро будет доступна!')}
            type='submit'
            className='mt-10 ml-auto font-medium hover:opacity-80 p-3 rounded-lg bg-black text-white duration-150 sm:max-w-[280px] w-full'
          >
            Cохранить
          </button>
        </div>
      </form>
    </div>
  );
};

export default GBBusinessForm;
