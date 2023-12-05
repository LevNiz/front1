import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteSearchRequest,
  fetchSearchRequest,
} from '../../../api/searchRequest.js';
import Modal from '../../../helpers/Modals/Modal';
import edit from '../../../assets/icons/update.svg';
import trash from '../../../assets/icons/trash.svg';
import noImg from '../../../assets/images/no-image.jpeg';
import { NavLink, useNavigate } from 'react-router-dom';

const ItemSearchRequestCard = ({ el }) => {
  const { userID } = useSelector((state) => state?.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [itemId, setItemId] = useState(null);

  const closeModal = () => {
    setModalOpen(false);
  };

  const onDeleteSearchRequest = async () => {
    setModalOpen(true);
    const { success } = await deleteSearchRequest(dispatch, itemId);
    if (success) {
      setModalOpen(false);
      await fetchSearchRequest(dispatch, userID);
    }
    setModalOpen(false);
  };

  return (
    <>
      <NavLink
        to={`${el?.id}`}
        className='bg-colBgGray2 p-3 sm:p-4 rounded-md cursor-pointer'
      >
        <div className='w-full'>
          <div className='flex justify-between items-center'>
            <span
              className={`${
                el?.active ? 'bg-colGreen' : 'bg-red-300'
              } mr-2 rounded-md text-xs px-3 py-1`}
            >
              {el?.active ? 'Активный' : 'Неактивный'}
            </span>
            <div className='flex space-x-1'>
              <img
                onClick={() => navigate(`update/${el?.id}`)}
                className='cursor-pointer min-w-[28px]'
                src={edit}
                alt='*'
              />
              <img
                onClick={() => {
                  setModalOpen(true);
                  setModalContent('deleteSearchRequest');
                  setItemId(el?.id);
                }}
                className='cursor-pointer min-w-[30px] delete-btn'
                src={trash}
                alt='*'
              />
            </div>
          </div>
          <div className='flex items-center py-3'>
            <div className='min-w-[24px] mm:min-w-[24px] w-6 h-6 rounded-full overflow-hidden border border-gray-400'>
              <img
                className='w-full h-full object-cover'
                src={el?.client?.avatar}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = noImg;
                }}
                alt='*'
              />
            </div>
            <h4 className='font-medium text-sm ml-3 line-clamp-1 break-all'>
              {el?.name}
            </h4>
          </div>
          <p className='text-sm font-medium'>Товары</p>
          <div className='flex mt-2'>
            <div className='min-w-[80px] w-20 ss:min-w-[96px] ss:w-24 h-16 ss:h-20 overflow-hidden rounded-md bg-white'>
              <img
                className='w-full h-full object-contain'
                src={el?.wantedItems[0]?.photo}
                alt='*'
              />
            </div>
            <div className='ml-3'>
              <span className='text-xs font-medium opacity-70'>
                Доп. информация:
              </span>
              <p className='line-clamp-2 break-all text-sm'>
                {el?.wantedItems[0]?.description}
              </p>
            </div>
          </div>
        </div>
      </NavLink>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        content={modalContent}
        onDeleteSearchRequest={onDeleteSearchRequest}
      />
    </>
  );
};

export default ItemSearchRequestCard;
