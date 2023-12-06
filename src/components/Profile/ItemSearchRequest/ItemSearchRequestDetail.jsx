import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteSearchRequest,
  fetchSearchRequestDetail,
} from '../../../api/searchRequest';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import noImg from '../../../assets/images/no-image.jpeg';
import edit from '../../../assets/icons/update.svg';
import trash from '../../../assets/icons/trash.svg';
import Modal from '../../../helpers/Modals/Modal';

const ItemSearchRequestDetail = () => {
  const [itemData, setItemData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [itemId, setItemId] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const closeModal = () => {
    setModalOpen(false);
  };

  const onDeleteSearchRequest = async () => {
    setModalOpen(true);
    const { success } = await deleteSearchRequest(
      itemId,
      setIsLoading,
      setModalOpen
    );
    if (success) {
      setModalOpen(false);
      navigate(-1);
    }
    setModalOpen(false);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { success, data } = await fetchSearchRequestDetail(id);
      if (success) {
        setItemData(data);
        setIsLoading(false);
      }
    })();
  }, [id]);

  return (
    <div className='w-full py-8 md:p-4'>
      <div className='flex justify-between items-center mb-3'>
        <h1 className='ss:text-xl font-medium'>Заявка на поиcк товара</h1>
        <div className='flex space-x-2'>
          <img
            // onClick={() =>
            //   navigate(`/profile/search-request/update/${itemData?.id}`)
            // }
            onClick={() => alert('В процессе разработки!')}
            className='cursor-pointer min-w-[28px]'
            src={edit}
            alt='*'
          />
          <img
            onClick={() => {
              setModalOpen(true);
              setModalContent('deleteSearchRequest');
              setItemId(itemData?.id);
            }}
            className='cursor-pointer min-w-[30px] delete-btn'
            src={trash}
            alt='*'
          />
        </div>
      </div>
      {isLoading ? (
        <ContentLoading extraStyle='480px' />
      ) : (
        <>
          <div className='flex items-center py-5'>
            <div className='min-w-[64px] w-16 h-16 rounded-full overflow-hidden border-2 border-colYellow'>
              <img
                className='w-full h-full object-cover p-[2px] rounded-full'
                src={itemData?.client?.avatar}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = noImg;
                }}
                alt='*'
              />
            </div>
            <div className='ml-3'>
              <h4 className='font-medium text-lg leading-5 pt-1'>
                {itemData?.name || 'Не указана'}
              </h4>
              <span className='text-sm opacity-50'>
                {itemData?.phone || 'Не указана'}
              </span>
            </div>
          </div>
          <h4 className='text-lg font-medium mb-5'>Товары</h4>
          <div className='grid mm:grid-cols-2 gap-8 mm:gap-5'>
            {itemData?.wantedItems?.map((el) => (
              <div
                className='shadow-[0px_10px_20px_2px_rgba(204,_204,_204,_0.40)]'
                key={el?.id}
              >
                <div className='h-[220px] ss:h-[260px] md:h-[240px] lg:h-[300px] overflow-hidden rounded-tr-md rounded-tl-md bg-gray-100 flex justify-center items-center'>
                  <img
                    className='mx-auto w-full h-full object-contain'
                    src={el?.photo}
                    alt='*'
                  />
                </div>
                <p className='p-3 italic'>{el?.description || 'Не указана'}</p>
              </div>
            ))}
          </div>
        </>
      )}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        content={modalContent}
        onDeleteSearchRequest={onDeleteSearchRequest}
      />
    </div>
  );
};

export default ItemSearchRequestDetail;
