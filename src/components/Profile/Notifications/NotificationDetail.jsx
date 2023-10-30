import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../helpers/Modals/Modal';
import back from './../../../assets/icons/arrow-left.svg';

const NotificationDetail = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const navigate = useNavigate();

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='fixed z-[99999] mm:static top-0 left-0 w-full h-full mm:w-auto mm:h-auto bg-white overflow-y-scroll pt-16 mm:pt-4 pb-20 mm:pb-0 mm:overflow-y-hidden'>
      <div className='bg-colBgGray mm:rounded-[18px] p-3 lg:py-6 lg:px-4 xl:p-12'>
        <div className='mm:hidden flex justify-between items-center mt-3 mb-7'>
          <img onClick={() => navigate(-1)} src={back} alt='*' />
          <span className='font-semibold'>Уведомления</span>
        </div>
        <h3 className='text-base lg:text-xl font-bold pb-2 break-all text-center mm:text-left'>
          Вы получили сообщение
        </h3>
        <div className='text-xs mm:text-left text-right mm:text-[10px] lg:text-base text-colGray2 font-medium mb-2'>
          12.07.2023
        </div>
        <p className='text-xs lg:text-sm font-medium break-all'>
          Lorem ipsum dolor sit amet consectetur. Tincidunt enim feugiat porta
          elit venenatis mauris convallis venenatis massa. Rhoncus gravida est
          pharetra tristique. Faucibus egestas arcu sed morbi integer. Blandit
          tempor rhoncus vulputate turpis pulvinar in id arcu. Enim malesuada
          tristique imperdiet imperdiet pulvinar nibh ac enim mauris. Mattis sed
          ante id a in nam cursus massa molestie. Bibendum at purus quam
          condimentum vitae elementum in ut accumsan. Aliquam non eget viverra
          dictum lacus ut nisl. Mauris vivamus consectetur neque duis.
          Condimentum tempus nisi sed ipsum lorem lacus in nunc molestie. Non
          amet sollicitudin placerat eget.
        </p>
      </div>
      <div className='flex justify-end mt-8 mx-3'>
        <button
          onClick={() => {
            setModalOpen(true);
            setModalContent('deleteNotification');
          }}
          className='sm:max-w-[200px] lg:max-w-[255px] w-full text-xs lg:text-base bg-black h-[36px] lg:h-[48px] font-medium text-white rounded-md lg:rounded-[10px] hover:opacity-80 duration-150'
          type='submit'
        >
          Удалить
        </button>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal} content={modalContent} />
    </div>
  );
};

export default NotificationDetail;
