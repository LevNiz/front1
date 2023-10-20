import { useState } from 'react';
import Modal from '../../../helpers/Modals/Modal';
import { fetchAddresses } from '../../../api/addresses';
import { useDispatch, useSelector } from 'react-redux';

const SApplicationReceiver = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const { userID } = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddresses = async () => {
    await fetchAddresses(userID, dispatch);
  };

  return (
    <>
      <div className='md:pl-5 lg:pl-10'>
        <div>
          <button
            onClick={() => {
              setModalOpen(true);
              setModalContent('AddressModal');
              handleAddresses();
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
