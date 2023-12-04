import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../../api/client';
import { postSearchRequest } from '../../../api/searchRequest';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import imgFile from '../../../assets/icons/photo.svg';

const ItemSearchRequestNew = () => {
  const { userID } = useSelector((state) => state?.user);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [fileValue, setFileValue] = useState(null);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    mode: 'onChange',
    defaultValues: async () => {
      setIsLoading(true);
      const { success, data } = await fetchUser(userID);
      if (success) {
        setIsLoading(false);
        return {
          name: data?.fullname,
          phone: data?.phone,
        };
      }
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { success } = await postSearchRequest(data, userID, fileValue);
    if (success) {
      setIsLoading(false);
      navigate(-1);
    }
    setIsLoading(false);
  };

  return (
    <div className='w-full pt-8 md:p-4'>
      <h3 className='text-lg ss:text-xl'>Заполните форму для заявки.</h3>
      <p className='text-sm opacity-70 mb-6'>
        Наши менеджеры скоро свяжутся с вами.
      </p>
      {isLoading ? (
        <ContentLoading extraStyle='480px' />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid ld:grid-cols-2 ld:gap-5'>
            <div>
              <div>
                <p className='font-medium mb-2'>ФИО</p>
                <input
                  className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
                  placeholder='ФИО'
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
              <div className='mt-4'>
                <p className='font-medium mb-2'>Номер телефона</p>
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
              <div className='mt-4'>
                <p className='font-medium mb-2'>Доп. информация</p>
                <textarea
                  className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none resize-none'
                  placeholder='Дополнительная информация'
                  {...register('description')}
                />
              </div>
            </div>
            <div className='mt-2 ld:mt-0'>
              <p className='font-medium mb-2'>Фото товара</p>
              <label htmlFor='fileVal'>
                <input
                  className='hidden'
                  id='fileVal'
                  type='file'
                  onChange={(e) => setFileValue(e.target.files[0])}
                  accept='image/*'
                />
                <div className='border-dashed border-2 ld:min-h-[155px] border-colGray2 p-5 flex justify-center items-center cursor-pointer rounded-md'>
                  <div className='py-2'>
                    <img className='mx-auto' src={imgFile} alt='*' />
                    <p className='opacity-50 pt-2'>Загрузить фото</p>
                  </div>
                </div>
              </label>
              {fileValue ? (
                <div className='mt-5 h-48 overflow-hidden'>
                  <img
                    className='w-full h-full object-contain'
                    src={URL.createObjectURL(fileValue)}
                    alt='*'
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <button
            type='submit'
            className='mt-8 font-medium hover:opacity-80 p-3 rounded-lg bg-black text-white duration-150 max-w-sm ml-auto w-full flex justify-center'
          >
            Cохранить
          </button>
        </form>
      )}
    </div>
  );
};

export default ItemSearchRequestNew;
