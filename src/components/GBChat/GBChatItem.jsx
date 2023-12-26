import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ContentLoading } from '../../helpers/Loader/Loader';
import GBChatSidebar from './GBChatSidebar';
import GBChatMessages from './GBChatMessages';
import { fetchGBChats } from '../../api/gbchat';
import { ErrorEmpty } from '../../helpers/Errors/ErrorEmpty';
import chatImg from '../../assets/images/empty-chat.svg';
import emptyChat from '../../assets/images/empty-chat.svg';

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
    <div className='justify-center flex w-full'>
      {isLoading ? (
        <ContentLoading extraStyle='580px' />
      ) : chats?.length ? (
        <>
          <div
            className={`${
              chatContent ? 'hidden' : 'block'
            } mm:block w-full mm:w-2/5 lg:w-2/6`}
          >
            <div className='mm:pt-5 ld:border-r-[3px] border-[#bdbdbd]'>
              <h4 className='text-xl font-medium bg-[#F7F7F7] p-3'>GB-Chat</h4>
            </div>
            <div className='chatSidebar flex flex-col scrollable pt-4 mm:h-[calc(100vh-130px)] overflow-y-scroll mm:pr-2 md:pr-3'>
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
            } w-full mm:w-3/5 lg:w-4/6 bg-[#F7F7F7]`}
          >
            <GBChatMessages chats={chats} setChatContent={setChatContent} />
          </div>
          <div
            className={`${
              chatContent
                ? 'hidden'
                : 'hidden mm:flex justify-center items-center w-4/6 bg-[#F7F7F7]'
            } `}
          >
            <div>
              <img className='max-w-xs mx-auto' src={chatImg} alt='*' />
              <h1 className='font-medium text-xl md:text-2xl pt-5 text-center'>
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
          image={emptyChat}
        />
      )}
    </div>
  );
};

export default GBChatItem;
