import { useState } from 'react';
import Modal from '../../../helpers/Modals/Modal';

const SApplicationComment = ({
  services,
  register,
  handleServicesData,
  handleServicesDelete,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='md:pl-5 lg:pl-10'>
      <p className='font-medium mb-2'>Дополнительные услуги</p>
      <button
        onClick={() => {
          setModalOpen(true);
          setModalContent('extraServices');
        }}
        className='bg-black sm:max-w-xs w-full p-3 h-[50px] text-white rounded-md hover:opacity-70 duration-150 mb-5'
      >
        + Выбрать услуги
      </button>
      {services &&
        services?.map((el) => (
          <div key={el?.id} className='py-2 max-w-xl mm:ml-5'>
            <div className='flex justify-between shadow-[0_0_10px_#e5e3e3] py-2 px-3 rounded-lg'>
              <div className='flex'>
                <div className='w-6 min-w-[24px] h-6 mr-2'>
                  <img src={el?.icon} alt='*' />
                </div>
                <div>
                  <h5 className='font-medium'>{el?.nameRu}</h5>
                  <p className='text-sm opacity-60'>
                    {el?.infoRu || 'Описание'}
                  </p>
                </div>
              </div>
              <div className='flex justify-end items-start'>
                <span className='font-bold text-colPurple'>{el?.cost} $</span>
                <span
                  onClick={() => handleServicesDelete(el?.id)}
                  className='ml-3 text-xl text-red-500 cursor-pointer'
                >
                  &times;
                </span>
              </div>
            </div>
          </div>
        ))}
      <div className='max-w-[768px] pt-5'>
        <p className='font-medium mb-2'>
          Дополнительная информация или комментарий
        </p>
        <textarea
          className='w-full border border-colGray2 p-4 rounded-lg focus:border-black focus:outline-none resize-none'
          placeholder='Комментарий'
          {...register('comment', {
            required: false,
          })}
        />
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        content={modalContent}
        handleServicesData={handleServicesData}
        services={services}
      />
    </div>
  );
};

export default SApplicationComment;
