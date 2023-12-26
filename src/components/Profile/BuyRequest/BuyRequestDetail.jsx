import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {
  FetchBuyRequestsDetail,
  deleteBuyRequest,
} from '../../../api/buyRequests';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import noImg from '../../../assets/images/no-ava.jpeg';
import Modal from '../../../helpers/Modals/Modal';
import { useDispatch } from 'react-redux';

const BuyRequestDetail = () => {
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
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

  return (
    <div className='w-full pt-5 md:p-4'>
      <div className='flex justify-between items-center pb-5'>
        <h3 className='ss:text-xl sm:font-medium pr-3'>
          Заявки на покупку товара
        </h3>
        <button
          onClick={() => {
            setModalOpen(true);
            setModalContent('deleteBuyRequest');
          }}
          className='bg-black text-white py-2 min-w-[98px] ss:py-[10px] px-3 sm:px-5 font-medium rounded-md hover:opacity-70 duration-100 text-xs sm:text-sm'
        >
          Удалить
        </button>
      </div>
      {isLoading ? (
        <ContentLoading extraStyle={480} />
      ) : (
        <>
          <div className='flex items-center'>
            <div className='min-w-[64px] w-16 h-16 border border-gray-100 rounded-full overflow-hidden'>
              <img
                className='w-full h-full object-contain rounded-full'
                src={item?.client?.avatar}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = noImg;
                }}
                alt='*'
              />
            </div>
            <span className='ml-3'>{item?.client?.fullname}</span>
          </div>
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
