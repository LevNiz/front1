import { NavLink, useNavigate } from 'react-router-dom';
import edit from '../../../assets/icons/update.svg';
import trash from '../../../assets/icons/trash.svg';
import Modal from '../../../helpers/Modals/Modal';
import { useState } from 'react';
import { FetchBuyRequests, deleteBuyRequest } from '../../../api/buyRequests';
import { useDispatch, useSelector } from 'react-redux';
import { buyRequestStatus } from '../../../constants/statusData';

const BuyRequestItem = ({ data = {} }) => {
  const { userID } = useSelector((state) => state?.user);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [buyRequestID, setBuyRequestID] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onDeleteBuyRequest = async () => {
    setModalOpen(true);
    const { success } = await deleteBuyRequest(buyRequestID);
    if (success) {
      setModalOpen(false);
      await FetchBuyRequests(dispatch, userID);
    }
    setModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className='bg-colBgGray2 p-2 sm:p-4 rounded-md'>
        <div className='w-full mb-3'>
          <div className='flex justify-between items-center'>
            <h4 className='font-medium break-all line-clamp-1 pr-2'>
              {data?.name || 'Не указана'}
            </h4>
            <div className='flex space-x-1'>
              <img
                onClick={() => navigate(`update/${data?.id}`)}
                className='cursor-pointer min-w-[28px]'
                src={edit}
                alt='*'
              />
              <img
                onClick={() => {
                  setModalOpen(true);
                  setModalContent('deleteBuyRequest');
                  setBuyRequestID(data?.id);
                }}
                className='cursor-pointer min-w-[30px]'
                src={trash}
                alt='*'
              />
            </div>
          </div>
          <div className='flex items-center'>
            <span className='text-sm my-1 pr-1 opacity-50'>Ссылка:</span>
            <NavLink
              to={data?.link || '#'}
              target='_blank'
              className='text-sm text-blue-500 break-all line-clamp-1'
            >
              {data?.link || 'Не указана'}
            </NavLink>
          </div>
          <div className='flex'>
            <span className='text-sm mb-1 pr-1 opacity-50'>Комментарий:</span>
            <p className='text-sm break-all line-clamp-2 italic'>
              {data?.comment || 'Не указана'}
            </p>
          </div>
        </div>
        <div className='flex justify-between items-end'>
          <div
            className={`w-max px-3 py-1 text-center text-[10px] rounded-lg ${
              buyRequestStatus[data?.status].statusStyle
            }`}
          >
            {buyRequestStatus[data?.status].name || 'Не указан'}
          </div>
          <p className='text-xs text-colGray font-medium mt-1'>
            {data?.dateCreated?.split('T')[0] || 'Не указана'}
          </p>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        content={modalContent}
        onDelBuyRequest={onDeleteBuyRequest}
      />
    </>
  );
};

export default BuyRequestItem;
