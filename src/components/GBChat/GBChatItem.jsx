import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ContentLoading } from '../../helpers/Loader/Loader';
import GBChatSidebar from './GBChatSidebar';
import GBChatMessages from './GBChatMessages';
import { fetchGBChats } from '../../api/gbchat';

const GBChatItem = () => {
  const { userID } = useSelector((state) => state?.user);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatContent, setChatContent] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    setChatContent(pathname?.split('/')[2] === 't');
  }, [pathname]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      await fetchGBChats(userID, (chatsData) => {
        setChats(chatsData);
        setIsLoading(false);
      });
    })();
  }, []);

  return (
    <div className='flex w-full'>
      <div
        className={`${
          chatContent ? 'hidden' : 'block'
        } mm:block w-full mm:w-2/5 lg:w-2/6`}
      >
        <h4 className='text-xl font-medium bg-slate-100 p-3 ld:border-r-[3px] border-[#bdbdbd]'>
          GB-Chat
        </h4>
        <div className='chatSidebar flex flex-col space-y-3 scrollable pt-4 mm:h-[calc(100vh-180px)] ld:overflow-y-scroll mm:pr-2 md:pr-3'>
          {isLoading ? (
            <ContentLoading extraStyle='480px' />
          ) : chats?.length ? (
            chats?.map((chat) => (
              <GBChatSidebar
                key={chat?.chatId}
                chat={chat}
                setChatContent={setChatContent}
              />
            ))
          ) : (
            ''
          )}
        </div>
      </div>
      <div
        className={`${
          chatContent ? 'block' : 'hidden'
        } w-full mm:w-3/5 lg:w-4/6`}
      >
        <GBChatMessages setChatContent={setChatContent} />
      </div>
    </div>
  );
};

export default GBChatItem;
