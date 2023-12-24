import { useForm } from 'react-hook-form';
import BecomeBuyerForm from './BecomeBuyerForm';
import BecomeBuyerInfo from './BecomeBuyerInfo';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { postStayBuyer } from '../../api/buyer';
import { useSelector } from 'react-redux';
import Modal from '../../helpers/Modals/Modal';
import { Loading } from '../../helpers/Loader/Loader';

const BecomeBuyer = () => {
  const [passportSelfie, setPassportSelfie] = useState(false);
  const [passport, setPassport] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const { userID } = useSelector((state) => state?.user);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
    register,
    reset,
  } = useForm({ mode: 'onChange' });

  const privacyPolicy = watch('privacyPolicy');
  const closeModal = () => {
    setModalOpen(false);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { success } = await postStayBuyer(
      data,
      userID,
      passport,
      passportSelfie
    );
    if (success) {
      setIsLoading(false);
      setModalOpen(true);
      setModalContent('successRequest');
      setPassportSelfie(null);
      setPassport(null);
      reset();
    } else {
      setIsLoading(false);
      setModalOpen(true);
      setModalContent('errorRequest');
    }
  };

  return (
    <div className='content py-20 min-h-[768px]'>
      <h1 className='text-2xl py-3 mm:text-3xl font-bold'>Стать Buyer ом</h1>
      <BecomeBuyerInfo />
      <form className='py-8' onSubmit={handleSubmit(onSubmit)}>
        <BecomeBuyerForm
          control={control}
          errors={errors}
          register={register}
          setPassportSelfie={setPassportSelfie}
          passportSelfie={passportSelfie}
          setPassport={setPassport}
          passport={passport}
        />
        <input
          className='hidden'
          type='checkbox'
          id='checkbox'
          {...register('privacyPolicy', {
            required: 'Обязательное согласие с политикой конфиденциальности!',
          })}
        />
        <label
          htmlFor='checkbox'
          className='text-sm flex cursor-pointer mm:items-center mt-8 ld:mt-3'
        >
          <div className='w-7 h-7 min-w-[28px] min-h-[28px] mr-2 flex justify-center items-center bg-colYellow border border-white rounded'>
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
            <NavLink
              className='ml-1 underline'
              to='/privacy-policy'
              tablet='_blank'
            >
              политикой конфиденсиальности
            </NavLink>
          </p>
        </label>
        {errors?.privacyPolicy && (
          <p className='text-red-500 text-xs mt-2'>
            {errors?.privacyPolicy.message || 'Error!'}
          </p>
        )}
        <button
          type='submit'
          disabled={(!isDirty && !isValid) || !passportSelfie || !passport}
          className={`${
            isDirty && isValid && passportSelfie && passport
              ? 'hover:opacity-80'
              : 'cursor-not-allowed opacity-50'
          } mt-8 font-medium p-4 rounded-md bg-black text-white duration-150 sm:max-w-[499px] w-full`}
        >
          Отправить
        </button>
      </form>
      {isLoading ? <Loading /> : ''}
      <Modal isOpen={modalOpen} onClose={closeModal} content={modalContent} />
    </div>
  );
};

export default BecomeBuyer;
