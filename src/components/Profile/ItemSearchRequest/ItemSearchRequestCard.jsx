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
import { useNavigate } from 'react-router-dom';

const ItemSearchRequestCard = ({ el }) => {
  const { userID } = useSelector((state) => state?.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [itemId, setItemId] = useState(null);
  const [imgModal, setImgModal] = useState(null);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handelClickCard = (e) => {
    const hasClass = e.target.classList.contains('delete-btn');
    if (!hasClass) {
      setImgModal(el?.photo);
    }
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
      <div
        onClick={(e) => handelClickCard(e)}
        className='bg-colBgGray2 p-2 sm:p-4 rounded-md cursor-pointer'
      >
        <div className='w-full mb-3'>
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
            <div className='min-w-[48px] mm:min-w-[64px] w-12 h-12 mm:w-16 mm:h-16 rounded-full overflow-hidden'>
              <img
                className='w-full h-full object-cover'
                src={el?.photo}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = noImg;
                }}
                alt='*'
              />
            </div>
            <h4 className='font-medium mm:text-lg ml-3 line-clamp-1 break-all'>
              {el?.name}
            </h4>
          </div>
          <p className='text-sm break-all line-clamp-2'>
            {el?.description || 'Не указана'}
          </p>
        </div>
      </div>
      <div
        className={`${
          imgModal ? 'visible opacity-100' : 'invisible opacity-0'
        } fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[999999] duration-150`}
      >
        <span
          onClick={() => setImgModal(null)}
          className='absolute top-5 right-5 w-10 h-10 mm:w-16 mm:h-16 flex justify-center items-center rounded-full z-10 text-3xl mm:text-5xl cursor-pointer bg-white'
        >
          &times;
        </span>
        <div className='w-[90%] h-[90vh] mx-auto overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center'>
          <img
            className='mx-auto'
            src={imgModal}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = noImg;
            }}
            alt='*'
          />
        </div>
      </div>
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
