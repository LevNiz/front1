import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ContentLoading } from '../../helpers/Loader/Loader';
import GBChatSidebar from './GBChatSidebar';
import GBChatMessages from './GBChatMessages';
import { fetchGBChats } from '../../api/gbchat';
import { ErrorEmpty } from '../../helpers/Errors/ErrorEmpty';
import chatImg from '../../assets/images/chat.png';

const GBChatItem = () => {
  const { userID } = useSelector((state) => state?.user);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chatContent, setChatContent] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    setChatContent(pathname?.split('/')[2] === 't');
  }, [pathname]);

  useEffect(() => {
    const unsubscribe = fetchGBChats(userID, (data) => {
      setIsLoading(false);
      setChats(data);
    });
    return () => {
      unsubscribe();
    };
  }, [userID]);

  return (
    <div className={`flex ${chats?.length ? '' : 'justify-center'} w-full`}>
      {isLoading ? (
        <ContentLoading extraStyle='480px' />
      ) : chats?.length ? (
        <>
          <div
            className={`${
              chatContent ? 'hidden' : 'block'
            } mm:block w-full mm:w-2/5 lg:w-2/6`}
          >
            <h4 className='text-xl font-medium bg-slate-100 p-3 ld:border-r-[3px] border-[#bdbdbd]'>
              GB-Chat
            </h4>
            <div className='chatSidebar flex flex-col space-y-3 scrollable pt-4 mm:h-[calc(100vh-180px)] overflow-y-scroll mm:pr-2 md:pr-3'>
              {chats?.map((chat) => (
                <GBChatSidebar
                  key={chat?.chatId}
                  chat={chat}
                  setChatContent={setChatContent}
                />
              ))}
            </div>
          </div>
          <div
            className={`${
              chatContent ? 'block' : 'hidden'
            } w-full mm:w-3/5 lg:w-4/6`}
          >
            <GBChatMessages chats={chats} setChatContent={setChatContent} />
          </div>
          <div
            className={`${
              chatContent
                ? 'hidden'
                : 'hidden mm:flex justify-center items-center w-4/6'
            } `}
          >
            <div>
              <img className='w-[65%] mx-auto' src={chatImg} alt='*' />
              <h1 className='font-medium text-xl md:text-2xl pt-3 text-center'>
                Добро пожаловать в GB-Chat!
              </h1>
              <p className='opacity-50 text-center pt-1 mb-10'>
                Начните общаться прямо сейчас.
              </p>
            </div>
          </div>
        </>
      ) : (
        <ErrorEmpty
          title='Чат пока пуст.'
          desc='Здесь будут сообщения с клиентами и байерами.'
        />
      )}
    </div>
  );
};

export default GBChatItem;
