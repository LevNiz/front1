import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAddress, fetchAddresses } from '../../../api/addresses';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import inCorrectImg from '../../../assets/images/404.svg';
import edit from '../../../assets/icons/editt.svg';
import trash from '../../../assets/icons/trash.svg';
import Modal from '../../../helpers/Modals/Modal';
import { useNavigate } from 'react-router-dom';

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
    })();
  }, []);

  return (
    <div className='w-screen md:p-4'>
      <h1 className='text-xl font-medium'>Сохраненные адреса</h1>
      {loading ? (
        <ContentLoading extraStyle='380px' />
      ) : error ? (
        'Error'
      ) : addresses?.length ? (
        <div className='grid sm:grid-cols-2 ld:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5'>
          {addresses?.map((el, index) => (
            <div
              key={el?.id}
              className='border border-gray-300 rounded-md p-4 text-left h-max relative'
            >
              <div className='flex flex-col space-y-2'>
                <div>
                  <h3 className='text-sm font-medium max-w-[80%]'>
                    Сохраенный адрес {index + 1}
                  </h3>
                  <div className='flex absolute top-3 right-3'>
                    <img
                      onClick={() => alert('Эта функция совсем скоро!')}
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
                      ? 'custom'
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
        <div className='text-center max-w-[320px] min-h-[218px] mx-auto pt-20'>
          <img className='mx-auto mb-5' src={inCorrectImg} alt='*' />
          <h3 className='text-xl font-medium max-w-[260px] mx-auto'>
            Здесь пока пусто!
          </h3>
          <p className='text-sm opacity-75 max-w-[260px] mx-auto my-2'>
            Нажав на кнопку ниже, вы можете добавить свои адреса.
          </p>
          <button
            onClick={() => navigate('new')}
            className='bg-black text-white py-3 px-6 font-medium rounded-md hover:opacity-70 duration-100'
          >
            + Добавить адрес
          </button>
        </div>
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
