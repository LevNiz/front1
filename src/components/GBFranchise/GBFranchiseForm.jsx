import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

import { postFranchise } from '../../api/gbFranchise';
import Modal from '../../helpers/Modals/Modal';
import { Loading } from '../../helpers/Loader/Loader';
import { useSelector } from 'react-redux';

const GBFranchiseForm = () => {
  const { user } = useSelector((state) => state?.user);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    register,
    reset,
  } = useForm();

  const privacyPolicy = watch('privacyPolicy', '');
  const navigate = useNavigate();

  const closeModal = () => {
    setModalOpen(false);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (user) {
      const { success } = await postFranchise(data);
      if (success) {
        setModalOpen(true);
        setModalContent('successRequest');
        setIsLoading(false);
        reset();
      }
      setIsLoading(false);
    } else {
      navigate('/auth/sign-in');
    }
  };

  return (
    <div className='content py-8'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='sm:shadow-[0_8px_34px_#00000026] rounded-lg sm:p-10 mb-12 max-w-[820px] mx-auto'
      >
        <div className='max-w-2xl w-full mx-auto pt-4'>
          <div>
            <p className='font-medium mb-2'>Контактное лицо</p>
            <input
              className='w-full border border-[#D660F2] p-[16px] mm:p-[14px] rounded-[4px] focus:border-[#9a44b0] focus:outline-none'
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
          <div className='my-5'>
            <p className='font-medium mb-2'>E-mail</p>
            <input
              className='w-full border border-[#D660F2] p-[14px] rounded-[4px] focus:border-[#9a44b0] focus:outline-none'
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
              className='w-full border border-[#D660F2] p-[16px] mm:p-[14px] rounded-[4px] focus:border-[#9a44b0] focus:outline-none'
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
          <div className='my-5'>
            <input
              className='hidden'
              type='checkbox'
              id='checkbox'
              {...register('privacyPolicy', {
                required:
                  'Обязательное согласие с политикой конфиденциальности!',
              })}
            />
            <label
              htmlFor='checkbox'
              className='text-sm flex cursor-pointer mm:items-center'
            >
              <div className='w-7 h-7 min-w-[28px] min-h-[28px] mr-2 flex justify-center items-center bg-[#d660f2] border border-white rounded'>
                {privacyPolicy ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    width='20'
                    height='20'
                    viewBox='0 0 30 30.000001'
                    version='1.0'
                  >
                    <defs>
                      <clipPath id='id1'>
                        <path d='M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656 ' />
                      </clipPath>
                    </defs>
                    <g clipPath='url(#id1)'>
                      <path
                        fill='#fff'
                        d='M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125 '
                        fillOpacity='1'
                        fillRule='nonzero'
                      />
                    </g>
                  </svg>
                ) : (
                  ''
                )}
              </div>
              <p>
                Я согласен (на) с
                <NavLink className='ml-1 underline' to='/user-agreement'>
                  {' '}
                  условиями пользовательского соглашения
                </NavLink>
              </p>
            </label>
            {errors?.privacyPolicy && (
              <p className='text-red-500 text-xs mt-2'>
                {errors?.privacyPolicy.message || 'Error!'}
              </p>
            )}
          </div>
        </div>
        <div className='flex justify-center'>
          <button
            type='submit'
            className='mt-10 font-medium hover:opacity-80 p-3 rounded-lg bg-black text-white duration-150 sm:max-w-[280px] w-full'
          >
            Отправить
          </button>
        </div>
      </form>
      <Modal isOpen={modalOpen} onClose={closeModal} content={modalContent} />
      {isLoading ? <Loading /> : ''}
    </div>
  );
};

export default GBFranchiseForm;
