import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteSearchRequest,
  fetchSearchRequestDetail,
} from '../../../api/searchRequest';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import noImg from '../../../assets/images/no-image.svg';
import noAva from '../../../assets/images/no-ava.jpeg';
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
        <div className='ml-3'>
          <button
            onClick={() => {
              setModalOpen(true);
              setModalContent('deleteSearchRequest');
              setItemId(itemData?.id);
            }}
            className='bg-black text-white py-2 px-3 sm:px-5 font-medium rounded-md hover:opacity-70 duration-100 text-xs sm:text-sm'
          >
            Удалить
          </button>
        </div>
      </div>
      {isLoading ? (
        <ContentLoading extraStyle='480px' />
      ) : (
        <>
          <div className='flex items-center py-5'>
            <div className='min-w-[64px] w-16 h-16 rounded-full overflow-hidden bg-gray-100'>
              <img
                className='w-full h-full object-cover p-[1px] rounded-full'
                src={itemData?.client?.avatar}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = noAva;
                }}
                alt='*'
              />
            </div>
            <div className='ml-3'>
              <h4 className='font-medium text-lg leading-5 pt-1'>
                {itemData?.name || 'Не указана'}
              </h4>
            </div>
          </div>
          <div className='mm:shadow-[0px_10px_20px_2px_rgba(204,_204,_204,_0.40)] mm:p-5 rounded-lg'>
            <h4 className='font-medium mb-5'>Товары</h4>
            <div className='grid mm:grid-cols-2 gap-8 mm:gap-5'>
              {itemData?.wantedItems?.map((el) => (
                <div className='grid mm:grid-cols-2 gap-3' key={el?.id}>
                  <div className='h-52 mm:h-32 md:h-28 lg:h-36 xl:h-40 overflow-hidden rounded-md bg-gray-100 flex justify-center items-center'>
                    <img
                      className='mx-auto w-full h-full object-contain'
                      src={el?.photo}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = noImg;
                      }}
                      alt='*'
                    />
                  </div>
                  <div>
                    <p className='line-clamp-6 break-all'>
                      {el?.description || 'Не указана'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
