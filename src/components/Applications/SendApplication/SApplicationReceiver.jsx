import { useState } from 'react';
import { fetchAddresses } from '../../../api/addresses';
import { useDispatch, useSelector } from 'react-redux';
import ModalAddress from '../../../helpers/Modals/ModalAddress';

const SApplicationReceiver = ({ receiverID, onReceiver }) => {
  const { userID } = useSelector((state) => state?.user);
  const { addresses } = useSelector((state) => state?.addresses);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const choseAddress = addresses?.filter((el) => el?.id === receiverID) || [];

  const handleAddresses = async () => {
    await fetchAddresses(userID, dispatch);
  };

  return (
    <>
      <div className='md:pl-5 lg:pl-10'>
        {choseAddress?.map((el) => (
          <div key={el?.id} className='text-left h-max max-w-[340px] mb-5'>
            <div className='flex flex-col space-y-2'>
              <div>
                <p className='text-xs opacity-50'>Имя получателя</p>
                <h4 className='text-sm border-b-gray-300 border-b pb-1'>
                  {el?.receiverName || 'Не указана'}
                </h4>
              </div>
              <div>
                <p className='text-xs opacity-50'>Номер телефона</p>
                <h4 className='text-sm border-b-gray-300 border-b pb-1'>
                  {el?.phone || 'Не указана'}
                </h4>
              </div>
              <div>
                <p className='text-xs opacity-50'>Тип адреса</p>
                <h4 className='text-sm border-b-gray-300 border-b pb-1'>
                  {el?.type === 'custom'
                    ? 'Кастомный'
                    : el?.type === 'depot'
                    ? 'Пункт выдачи GivBox'
                    : '' || 'Не указана'}
                </h4>
              </div>
              <div>
                <p className='text-xs opacity-50'>Город, страна</p>
                <h4 className='text-sm border-b-gray-300 border-b pb-1'>
                  {el?.city?.nameRu + ', ' + el?.country?.nameRu ||
                    'Не указана'}
                </h4>
              </div>
              <div>
                <p className='text-xs opacity-50'>Адрес</p>
                <h4 className='text-sm border-b-gray-300 border-b pb-1'>
                  {el?.address || 'Не указана'}
                </h4>
              </div>
            </div>
          </div>
        ))}
        <div>
          <button
            onClick={() => {
              setModalOpen(true);
              handleAddresses();
            }}
            className='bg-black sm:max-w-xs w-full p-3 h-[50px] text-white rounded-md hover:opacity-70 duration-150'
          >
            {choseAddress?.length ? 'Выбрать другой адрес' : '+ Выбрать адрес'}
          </button>
        </div>
      </div>
      <ModalAddress
        isOpen={modalOpen}
        onClose={closeModal}
        onReceiver={onReceiver}
      />
    </>
  );
};

export default SApplicationReceiver;
