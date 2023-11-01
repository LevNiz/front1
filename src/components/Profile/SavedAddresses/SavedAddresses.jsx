import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from '../../../helpers/Modals/Modal';
import { deleteAddress, fetchAddresses } from '../../../api/addresses';
import { fetchDepots } from '../../../api/depots';
import inCorrectImg from '../../../assets/images/404.svg';
import edit from '../../../assets/icons/update.svg';
import trash from '../../../assets/icons/trash.svg';
import errorImg from '../../../assets/images/error.svg';

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
        <div className='flex justify-center items-center w-full pt-10 sm:pt-24'>
          <div>
            <img className='mx-auto w-24 sm:w-40' src={errorImg} alt='*' />
            <h4 className='text-xl sm:text-2xl font-medium py-6 sm:py-12 text-center'>
              Произошла ошибка, повторите попытку позже!
            </h4>
            <NavLink
              to='/'
              className='max-w-[255px] mx-auto w-full flex justify-center items-center bg-black h-[48px] font-medium text-white rounded-[10px] hover:opacity-80 duration-150'
            >
              Перейти на главную
            </NavLink>
          </div>
        </div>
      ) : addresses?.length ? (
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
        <div className='text-center max-w-[320px] min-h-[218px] mx-auto pt-20'>
          <img className='mx-auto mb-5' src={inCorrectImg} alt='*' />
          <h3 className='text-xl font-medium max-w-[260px] mx-auto'>
            Здесь пока пусто!
          </h3>
          <p className='text-sm opacity-75 max-w-[260px] mx-auto my-2 pb-3'>
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
