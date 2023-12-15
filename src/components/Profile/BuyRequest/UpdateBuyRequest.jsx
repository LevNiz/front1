import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FetchBuyRequestsDetail,
  updateBuyRequest,
} from '../../../api/buyRequests';
import { useForm } from 'react-hook-form';
import { ContentLoading } from '../../../helpers/Loader/Loader';

const UpdateBuyRequest = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    mode: 'onChange',
    defaultValues: async () => {
      setIsLoading(true);
      const { success, data } = await FetchBuyRequestsDetail(id);
      if (success) {
        setIsLoading(false);
        return {
          name: data?.name,
          phone: data?.phone,
          link: data?.link,
          comment: data?.comment,
        };
      } else {
        setIsLoading(false);
      }
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { success } = await updateBuyRequest(data, id);
    if (success) {
      setIsLoading(false);
      navigate(-1);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full pt-5 md:p-4'>
      <h3 className='text-lg ss:text-xl mb-6 font-medium'>Редактировать</h3>
      {isLoading ? (
        <ContentLoading extraStyle='480px' />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='max-w-md'>
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
              <p className='font-medium mb-2'>Ссылка</p>
              <input
                className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
                placeholder='Ссылка'
                {...register('link', {
                  required: 'Поле обязательно к заполнению!',
                })}
              />
              {errors?.link && (
                <p className='text-red-500 mt-1 text-sm'>
                  {errors?.link?.message || 'Поле обязательно к заполнению!'}
                </p>
              )}
            </div>
            <div className='mt-4'>
              <p className='font-medium mb-2'>Комментарий</p>
              <textarea
                className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none resize-none'
                placeholder='Комментарий'
                {...register('comment')}
              />
            </div>
            <button
              type='submit'
              className='mt-8 font-medium hover:opacity-80 p-3 rounded-lg bg-black text-white duration-150 w-full'
            >
              Cохранить
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateBuyRequest;
