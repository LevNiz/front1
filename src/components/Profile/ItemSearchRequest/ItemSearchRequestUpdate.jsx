import { useNavigate, useParams } from 'react-router-dom';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FetchSearchRequestsDetail,
  updateSearchRequest,
} from '../../../api/searchRequest';
import imgFile from '../../../assets/icons/photo.svg';

const ItemSearchRequestUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [fileValue, setFileValue] = useState(null);
  const [defaultPhoto, setDefaultPhoto] = useState(null);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    mode: 'onChange',
    defaultValues: async () => {
      setIsLoading(true);
      const { success, data } = await FetchSearchRequestsDetail(id);
      if (success) {
        setIsLoading(false);
        setDefaultPhoto(data?.photo);
        return {
          name: data?.name,
          phone: data?.phone,
          description: data?.description,
        };
      }
      setIsLoading(false);
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { success } = await updateSearchRequest(data, id, fileValue);
    if (success) {
      setIsLoading(false);
      navigate(-1);
    }
    setIsLoading(false);
  };

  return (
    <div className='w-full pt-8 md:p-4'>
      <h1 className='font-medium text-xl mb-7'>Редактировать</h1>
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
            <div className='mt-3 ld:mt-0'>
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
              {fileValue || defaultPhoto ? (
                <div className='mt-5 h-48 overflow-hidden'>
                  <img
                    className='w-full h-full object-contain'
                    src={
                      fileValue ? URL.createObjectURL(fileValue) : defaultPhoto
                    }
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
            className='mt-8 font-medium hover:opacity-80 p-3 rounded-lg bg-black text-white duration-150 max-w-sm w-full flex justify-center ml-auto'
          >
            Cохранить
          </button>
        </form>
      )}
    </div>
  );
};

export default ItemSearchRequestUpdate;
