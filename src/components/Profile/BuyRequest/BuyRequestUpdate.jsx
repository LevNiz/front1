import { useForm } from 'react-hook-form';
import {
  FetchBuyRequestsDetail,
  updateBuyRequest,
} from '../../../api/buyRequests';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContentLoading } from '../../../helpers/Loader/Loader';

const BuyRequestUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [size, setSize] = useState(window.innerWidth);

  window.addEventListener('resize', function () {
    setSize(window.innerWidth);
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: async () => {
      setIsLoading(true);
      const { success, data } = await FetchBuyRequestsDetail(id);
      if (success) {
        setIsLoading(false);
        setBlocks(data?.cart_request);
        return {
          name: data?.name,
          phone: data?.phone,
          info: data?.info,
        };
      }
    },
  });

  const handleLinkValue = (index, value) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].link = value;
    setBlocks(updatedBlocks);
  };

  const handleCommentValue = (index, value) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].comment = value;
    setBlocks(updatedBlocks);
  };

  const handleAddBlock = () => {
    setBlocks([...blocks, { link: '', comment: '' }]);
    setValue(`link${blocks.length}`, '');
    setValue(`comment${blocks.length}`, '');
  };

  const handleDeleteBlock = (index) => {
    const updatedBlocks = blocks?.filter((_, i) => i !== index);
    setBlocks(updatedBlocks);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { success } = await updateBuyRequest(data, blocks, id);
    if (success) {
      setIsLoading(false);
      navigate(-1);
    }
    setIsLoading(false);
  };

  return (
    <div className='w-full pt-5 md:p-4'>
      <h3 className='text-lg ss:text-xl font-medium pb-5'>Редактировать</h3>
      {isLoading ? (
        <ContentLoading extraStyle='480px' />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid mm:grid-cols-2 gap-5'>
            <div className='space-y-2'>
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
              <div>
                <p className='font-medium mb-2 pt-[2px]'>Номер телефона</p>
                <input
                  className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
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
            </div>
            <div>
              <p className='font-medium mb-2'>Описание</p>
              <textarea
                className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none resize-none'
                placeholder='Описание'
                rows={size > 576 ? 5 : 2}
                {...register('info')}
              />
            </div>
          </div>
          <p className='font-medium mb-2 mt-4'>Товары</p>
          {blocks?.map((el, index) => (
            <div
              key={index}
              className='grid mm:grid-cols-2 relative gap-5 mt-3 p-3 border border-gray-300 rounded-md'
            >
              {index !== 0 && (
                <span
                  className='absolute top-3 right-3 text-2xl font-medium text-red-500 flex justify-end items-center h-3 cursor-pointer'
                  onClick={() => handleDeleteBlock(index)}
                >
                  &times;
                </span>
              )}
              <div>
                <p className='font-medium mb-2'>Ссылка</p>
                <input
                  className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
                  placeholder='Ссылка'
                  {...register(`link${index}`, {
                    required: 'Поле обязательно к заполнению!',
                  })}
                  value={el?.link}
                  onChange={(e) => handleLinkValue(index, e.target.value)}
                />
                {errors?.[`link${index}`] && (
                  <p className='text-red-500 mt-1 text-sm'>
                    {errors?.[`link${index}`]?.message ||
                      `Поле "Ссылка" обязательно к заполнению!`}
                  </p>
                )}
              </div>
              <div>
                <p className='font-medium mb-2'>Комментарий</p>
                <textarea
                  className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none resize-none'
                  placeholder='Комментарий'
                  {...register(`comment${index}`)}
                  onChange={(e) => handleCommentValue(index, e.target.value)}
                  value={el?.comment}
                />
              </div>
            </div>
          ))}
          {blocks[0]?.link && (
            <div
              onClick={handleAddBlock}
              className='bg-green-500 text-white font-medium rounded-md px-5 py-[2px] mt-3 flex ml-auto text-xl hover:opacity-80 duration-150 w-max cursor-pointer'
            >
              +
            </div>
          )}
          <button
            type='submit'
            className='mt-8 font-medium hover:opacity-80 p-3 rounded-lg bg-black text-white duration-150 mm:max-w-xs w-full'
          >
            Cохранить
          </button>
        </form>
      )}
    </div>
  );
};

export default BuyRequestUpdate;
