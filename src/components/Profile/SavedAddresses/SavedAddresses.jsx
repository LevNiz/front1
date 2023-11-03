import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import Modal from '../../../helpers/Modals/Modal';
import { deleteAddress, fetchAddresses } from '../../../api/addresses';
import { fetchDepots } from '../../../api/depots';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import { ErrorEmpty } from '../../../helpers/Errors/ErrorEmpty';
import edit from '../../../assets/icons/update.svg';
import trash from '../../../assets/icons/trash.svg';

const SavedAddresses = () => {
  const { userID } = useSelector((state) => state?.user);
  const { loading, error, addresses } = useSelector(
    (state) => state?.addresses
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [addressID, setAddressID] = useState('');

  const closeModal = () => {
    setModalOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDeleteAddress = async () => {
    const { success } = await deleteAddress(addressID);
    if (success) {
      setModalOpen(false);
      await fetchAddresses(userID, dispatch);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchAddresses(userID, dispatch);
      await fetchDepots(dispatch);
    })();
  }, []);

  return (
    <div className='w-screen md:p-4 pt-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl mr-2 sm:mr-0'>Сохраненные адреса</h1>
        <button
          onClick={() => navigate('new')}
          className={`${
            addresses?.length ? 'block' : 'hidden'
          } bg-black text-white py-2 ss:py-[10px] px-3 sm:px-5 font-medium rounded-md hover:opacity-70 duration-100 text-xs sm:text-sm`}
        >
          Добавить новый
        </button>
      </div>
      {loading ? (
        <ContentLoading extraStyle='380px' />
      ) : error ? (
        <ErrorServer />
      ) : !addresses?.length ? (
        <div className='grid sm:grid-cols-2 ld:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5'>
          {addresses?.map((el, index) => (
            <div
              key={el?.id}
              className='border border-gray-300 rounded-md p-4 text-left h-max relative'
            >
              <div className='flex flex-col space-y-2'>
                <div>
                  <h3 className='text-sm font-medium sm:max-w-[70%] md:max-w-[80%] break-all line-clamp-1'>
                    Сохранeный адрес {index + 1}
                  </h3>
                  <div className='flex absolute top-3 right-3'>
                    <img
                      onClick={() => navigate(`update/${el?.id}`)}
                      className='cursor-pointer w-6'
                      src={edit}
                      alt='*'
                    />
                    <img
                      onClick={() => {
                        setModalOpen(true);
                        setModalContent('deleteAddress');
                        setAddressID(el?.id);
                      }}
                      className='cursor-pointer ml-1 w-[26px]'
                      src={trash}
                      alt='*'
                    />
                  </div>
                </div>
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
                <div>
                  <p className='text-xs opacity-50'>Доп. по адресу</p>
                  <h4 className='text-sm'>{el?.nameAddress || 'Не указана'}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ErrorEmpty
          title='Здесь пока пусто!'
          desc='Нажав на кнопку выше, вы можете добавить свои адреса.'
        />
      )}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        content={modalContent}
        onDelAddress={onDeleteAddress}
      />
    </div>
  );
};

export default SavedAddresses;
