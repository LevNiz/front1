import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAlaketDetail } from '../../api/alaket';
import { ButtonLoading, ContentLoading } from '../../helpers/Loader/Loader';
import noImg from '../../assets/images/no-image.svg';
import noAva from '../../assets/images/no-ava.jpeg';
import location from '../../assets/icons/location3.svg';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';
import { ErrorEmpty } from '../../helpers/Errors/ErrorEmpty';
import { useSelector } from 'react-redux';
import { createGBChat } from '../../api/gbchat';
import { fetchUser } from '../../api/client';

const AlaketDetail = () => {
  const { id } = useParams();
  const { userID } = useSelector((state) => state?.user);
  const navigate = useNavigate();

  const [alaket, setAlaket] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [senderData, setSenderData] = useState({});
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { success, data } = await fetchAlaketDetail(id);
      if (success) {
        setAlaket(data);
        setIsLoading(false);
      }
      setIsLoading(false);
    })();
    scrollToTop();
  }, [id]);

  useEffect(() => {
    (async () => {
      const { success, data } = await fetchUser(userID);
      if (success) {
        setSenderData(data);
      }
    })();
  }, [userID]);

  const handleCreateGBChat = async () => {
    if (userID) {
      setIsButtonLoading(true);
      const chatID = `${userID}${alaket?.client?.id}`;
      const chatIDCheck = `${alaket?.client?.id}${userID}`;
      const { success, data } = await createGBChat(
        chatID,
        alaket?.client,
        senderData,
        chatIDCheck
      );
      if (success) {
        navigate(
          `/gb-chat/t/${
            data?.lastMessageSender === `${userID}` ? chatID : chatIDCheck
          }`
        );
        setIsButtonLoading(false);
      }
      setIsButtonLoading(false);
    } else {
      navigate('/auth/sign-in');
    }
  };

  return (
    <div className='min-h-[80vh] py-20 content'>
      {isLoading ? (
        <ContentLoading extraStyle='480px' />
      ) : Object.keys(alaket).length ? (
        <div className='md:flex items-start mt-5 sm:mt-10'>
          <div className='md:max-w-lg w-full h-[280px] ss:h-[360px] sm:h-[512px] rounded-md overflow-hidden border border-gray-300 p-3 mr-8'>
            <img
              className='w-full h-full mx-auto object-contain'
              src={alaket?.photo}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = noImg;
              }}
              alt='*'
            />
          </div>
          <div className='md:max-w-xl w-full pt-5 flex flex-col justify-between md:min-h-[512px]'>
            <div>
              <div className='flex items-center'>
                <div className='min-w-[48px] w-12 h-12 rounded-full border border-slate-500 overflow-hidden p-[2px] mr-2'>
                  <img
                    className='w-full h-full rounded-full object-cover'
                    src={alaket?.client?.avatar}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = noAva;
                    }}
                    alt='*'
                  />
                </div>
                <span className='text-lg font-medium leading-5'>
                  {alaket?.client?.fullname}
                </span>
              </div>
              <h4 className='font-medium text-lg sm:text-2xl mt-3 sm:mt-5 italic'>
                &quot; {alaket?.title} &quot;
              </h4>
              <div className='sm:flex items-center my-3'>
                <div className='flex items-center'>
                  <div className='ml-[2px] sm:ml-0 min-w-[16px] w-4 h-4 rounded-full flex justify-center items-center border border-black'>
                    <span className='w-2 h-2 rounded-full bg-black'></span>
                  </div>
                  <span className='ml-2 font-medium'>
                    {alaket?.fromCity?.nameRu || 'Не указан'}
                  </span>
                </div>
                <span className='hidden min-w-[34px] sm:flex mx-3'>
                  - - - &gt;
                </span>
                <ul className='sm:hidden flex flex-col space-y-1 ml-[9px] py-2'>
                  <li className='w-[1px] h-2 bg-gray-500'></li>
                  <li className='w-[1px] h-2 bg-gray-500'></li>
                  <li className='w-[1px] h-2 bg-gray-500'></li>
                </ul>
                <div className='flex sm:justify-end items-center'>
                  <img className='w-5' src={location} alt='*' />
                  <span className='ml-1 font-medium'>
                    {alaket?.toCity?.nameRu || 'Не указан'}
                  </span>
                </div>
              </div>
              <div className='flex items-center py-2'>
                <span className='opacity-60 mr-2'>Цена:</span>
                <span className='font-medium'>
                  {alaket?.cost === 0 ? 'Договорная' : alaket?.cost}
                </span>
              </div>
              <div className='flex mb-2'>
                <span className='opacity-60 mr-2'>Дата:</span>
                <p className='font-medium'>{alaket?.date || 'Не указан'}</p>
              </div>
              <div className='flex'>
                <span className='opacity-60 mr-2'>Описание:</span>
                <p className='font-medium'>
                  {alaket?.description || 'Не указано'}
                </p>
              </div>
            </div>
            <button
              onClick={handleCreateGBChat}
              className={`${
                alaket?.client?.id === userID ? 'hidden' : ''
              } uppercase font-bold hover:opacity-80 px-4 h-14 rounded-lg bg-colYellow duration-150 sm:max-w-xs w-full mt-8`}
            >
              {isButtonLoading ? <ButtonLoading /> : 'Написать сообщение'}
            </button>
          </div>
        </div>
      ) : (
        <ErrorEmpty
          title='Что-то пошло не так!'
          desc='По вашему запросу ничего не нашли.'
        />
      )}
    </div>
  );
};

export default AlaketDetail;
