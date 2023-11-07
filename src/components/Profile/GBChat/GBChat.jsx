import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GBChatItem from './GBChatItem';
import { fetchGBChats } from '../../../api/chats';
import welcomeImg from '../../../assets/images/welcome-chat.png';
import { ContentLoading } from '../../../helpers/Loader/Loader';

const GBChat = () => {
  const { userID } = useSelector((state) => state?.user);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className='flex items-center w-full pb-4 ld:py-5'>
      <div className='w-full ld:w-3/5 md:w-full lg:w-2/4 h-full'>
        <h4 className='text-xl font-medium bg-slate-100 p-3 ld:border-r-[3px] border-[#bdbdbd]'>
          GB-Чат
        </h4>
        <div className='flex flex-col space-y-3 scrollable pt-4 ld:h-[calc(100vh-200px)] ld:overflow-y-scroll px-3 ss:px-4'>
          {isLoading ? (
            <ContentLoading extraStyle='480px' />
          ) : chats?.length ? (
            chats?.map((chat) => <GBChatItem key={chat?.chatId} chat={chat} />)
          ) : (
            ''
          )}
        </div>
      </div>
      <div className='ld:2/5 lg:w-2/4 p-3 hidden ld:block md:p-8 md:hidden lg:block'>
        <img src={welcomeImg} alt='*' />
      </div>
    </div>
  );
};

export default GBChat;
