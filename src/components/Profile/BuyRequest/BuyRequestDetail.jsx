import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../helpers/Modals/Modal';
import {
  FetchBuyRequestsDetail,
  deleteBuyRequest,
  payForBuyRequest,
} from '../../../api/buyRequests';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { currency } from '../../../constants/currency';
import { fetchUser } from '../../../api/client';
import trash from '../../../assets/icons/trash.svg';
import update from '../../../assets/icons/update.svg';
import attention from '../../../assets/icons/attention3.svg';

const BuyRequestDetail = () => {
  const { userID } = useSelector((state) => state?.user);
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [modalContent, setModalContent] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const onDeleteBuyRequest = async () => {
    setModalOpen(true);
    const { success } = await deleteBuyRequest(dispatch, id);
    if (success) {
      setModalOpen(false);
      navigate(-1);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePay = () => {
    payForBuyRequest(
      (item?.totalCost * currency).toFixed(2),
      userData,
      item,
      handleFetchBuyRequest
    );
  };

  const handleFetchBuyRequest = async () => {
    setIsLoading(true);
    const { success, data } = await FetchBuyRequestsDetail(id);
    if (success) {
      setItem(data);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { success, data } = await FetchBuyRequestsDetail(id);
      if (success) {
        setItem(data);
        setIsLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      const { success, data } = await fetchUser(userID);
      if (success) {
        setUserData(data);
      }
    })();
  }, [userID]);

  return (
    <div className='w-full pt-5 md:p-4'>
      <div className='flex justify-between items-center pb-5'>
        <h3 className='ss:text-xl sm:font-medium pr-3'>
          Заявки на покупку товара
        </h3>
        <div className='flex'>
          <NavLink to={`/profile/buy-request/update/${id}`}>
            <img className='cursor-pointer' src={update} alt='*' />
          </NavLink>
          <img
            className='cursor-pointer ml-3'
            onClick={() => {
              setModalOpen(true);
              setModalContent('deleteBuyRequest');
            }}
            src={trash}
            alt='*'
          />
        </div>
      </div>
      {isLoading ? (
        <ContentLoading extraStyle={480} />
      ) : (
        <>
          <div className='flex items-center'>
            <span>ФИО:</span>
            <span className='ml-1 font-medium'>{item?.client?.fullname}</span>
          </div>
          <div className='flex items-center py-1'>
            <span>Статус оплаты:</span>
            <span
              className={`${
                item?.paid ? 'text-green-500' : 'text-red-500'
              } ml-1 font-medium`}
            >
              {item?.paid ? 'Оплачено' : 'Неоплачено'}
            </span>
          </div>
          {item?.totalCost !== 0 &&
            item?.totalCost !== null &&
            item?.paid === false && (
              <>
                <div className='flex items-center pt-3'>
                  <span>Счет на оплату:</span>
                  <div className='ml-1 flex justify-end items-center'>
                    <span className='font-bold whitespace-nowrap'>
                      $ {item?.totalCost?.toFixed(2)}
                    </span>
                    <span className='whitespace-nowrap pl-1 text-sm pt-[2px]'>
                      ({(item?.totalCost * currency)?.toFixed(2)} с)
                    </span>
                  </div>
                </div>
                <div className='flex items-start pt-1'>
                  <span className='text-sm'>Описание:</span>
                  <span className='ml-1 italic text-sm'>
                    {item?.info || 'Не указано'}
                  </span>
                </div>
                <button
                  onClick={handlePay}
                  className='hover:opacity-80 font-medium px-4 h-12 text-lg rounded-lg text-white bg-black duration-150 mt-4 w-full ld:max-w-[280px]'
                >
                  Оплатить
                </button>
                <div className='bg-gray-100 p-3 rounded-md mt-4 flex items-start'>
                  <img className='w-4 mt-[2px] mr-1' src={attention} alt='*' />
                  <p className='text-sm text-gray-700'>
                    Пожалуйста, обратите внимание, что к вашей сумме будет
                    добавлена комиссия в размере <strong>3%</strong>.
                  </p>
                </div>
              </>
            )}
          <h3 className='pt-6 pb-4 font-medium'>Товары</h3>
          <div className='grid mm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5'>
            {item?.cart_request?.map((el, index) => (
              <div
                key={index}
                className='shadow-[0_4px_16px_#e9e9e9] p-3 sm:p-5 rounded-xl'
              >
                <div className='flex flex-col'>
                  <span className='opacity-60 text-sm pb-[1px]'>Ссылка:</span>
                  <NavLink
                    className='text-blue-500 underline break-all w-max'
                    to={`${el?.link ? `${el?.link}` : '#'}`}
                    target={el?.link ? '_blank' : ''}
                  >
                    {el?.link || 'Не указана'}
                  </NavLink>
                </div>
                <div className='flex flex-col pt-3'>
                  <span className='opacity-60 text-sm pb-[1px]'>
                    Комментарий:
                  </span>
                  <p className=''>{el?.comment || 'Не указана'}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        content={modalContent}
        onDelBuyRequest={onDeleteBuyRequest}
      />
    </div>
  );
};

export default BuyRequestDetail;
