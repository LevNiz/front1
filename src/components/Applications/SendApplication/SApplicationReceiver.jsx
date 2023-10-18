import { useState } from 'react';
import Modal from '../../../helpers/Modals/Modal';

const SApplicationReceiver = () => {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className='md:pl-5 lg:pl-10'>
        <div>
          <button
            onClick={() => {
              setModalOpen(true);
              setModalContent('AddressModal');
            }}
            className='bg-colYellow max-w-[320px] w-full p-3 rounded-md hover:opacity-70 duration-150'
          >
            + Выбрать адрес
          </button>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal} content={modalContent} />
    </>
  );
};

export default SApplicationReceiver;
