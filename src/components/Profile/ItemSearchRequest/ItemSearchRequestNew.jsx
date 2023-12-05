import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../../api/client';
import { postSearchRequest, uploadPhotos } from '../../../api/searchRequest';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import noImg from '../../../assets/images/no-image.svg';

const ItemSearchRequestNew = () => {
  const { userID } = useSelector((state) => state?.user);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [blocks, setBlocks] = useState([{ photo: null, description: '' }]);

  const handleFileChange = (index, file) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].photo = file;
    setBlocks(updatedBlocks);
  };

  const handleDescriptionChange = (index, value) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].description = value;
    setBlocks(updatedBlocks);
  };

  const handleAddBlock = () => {
    setBlocks([...blocks, { photo: null, description: '' }]);
  };

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
    try {
      const wantedItems = await uploadPhotos(blocks);
      const { success } = await postSearchRequest(data, userID, wantedItems);
      if (success) {
        setIsLoading(false);
        navigate(-1);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
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
            <div className='mt-3 ld:mt-0'>
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
          </div>
          <h3 className='pt-4 pb-2 font-medium text-lg'>Товары</h3>
          {blocks.map((block, index) => (
            <div
              key={index}
              className='grid ld:grid-cols-2 ld:gap-5 border border-gray-400 p-3 rounded-md'
            >
              <div className='mt-3 ld:mt-0'>
                <p className='font-medium mb-2'>Фото товара</p>
                <div className='flex items-center'>
                  <label className='w-4/5' htmlFor={`photo-${index}`}>
                    <input
                      className='hidden'
                      id={`photo-${index}`}
                      type='file'
                      onChange={(e) =>
                        handleFileChange(index, e.target.files[0])
                      }
                      accept='image/jpeg, image/jpg, image/png, image/webp'
                    />
                    <div className='border-dashed border-2 h-[78px] border-colGray2 flex flex-col justify-center items-center cursor-pointer rounded-md'>
                      <p className='opacity-70'>Загрузить фото</p>
                      <span className='text-[10px] opacity-40'>
                        (jpeg, jpg, png, webp)
                      </span>
                    </div>
                  </label>
                  <div className='ml-3 overflow-hidden w-1/5 h-[78px] bg-gray-100 rounded-md'>
                    <img
                      className='w-full h-full object-contain'
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = noImg;
                      }}
                      src={block.photo ? URL.createObjectURL(block.photo) : ''}
                      alt='*'
                    />
                  </div>
                </div>
              </div>
              <div className='mt-3 ld:mt-0'>
                <p className='font-medium mb-2'>Доп. информация</p>
                <textarea
                  className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none resize-none'
                  placeholder='Дополнительная информация'
                  value={block.description}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value)
                  }
                />
              </div>
            </div>
          ))}
          <div
            onClick={handleAddBlock}
            className='bg-green-500 text-white font-medium rounded-md px-5 py-[2px] mt-3 flex ml-auto text-xl hover:opacity-80 duration-150 w-max cursor-pointer'
          >
            +
          </div>
          <button
            type='submit'
            className='mt-8 font-medium hover:opacity-80 p-3 rounded-lg bg-black text-white duration-150 max-w-xs ml-auto w-full flex justify-center'
          >
            Cохранить
          </button>
        </form>
      )}
    </div>
  );
};

export default ItemSearchRequestNew;
