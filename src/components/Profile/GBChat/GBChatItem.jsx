import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchGBChats } from '../../../api/chats';
import { ContentLoading } from '../../../helpers/Loader/Loader';

const GBChatSidebar = () => {
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
    <div className='flex flex-col space-y-3 scrollable ld:h-[calc(100vh-200px)] ld:overflow-y-scroll ld:pr-4'>
      {isLoading ? (
        <ContentLoading extraStyle='480px' />
      ) : chats?.length ? (
        chats?.map((chat) => (
          <NavLink
            key={`/${Number(chat?.chatId)}`}
            to={chat?.chatId}
            className='flex items-center'
          >
            <div className='w-12 sm:w-14 h-12 sm:h-14 min-w-[48px] sm:min-w-[56px] rounded-full overflow-hidden border border-colYellow'>
              <img
                className='w-full h-full object-cover rounded-full p-[2px]'
                src={chat?.data?.lastMessageReceiverAvatar}
                alt='*'
              />
            </div>
            <div className='ml-2 w-full'>
              <div className='flex justify-between items-center'>
                <h4 className='font-medium line-clamp-1 break-all'>
                  {chat?.data?.lastMessageSender === `${userID}` ? 'Вы' : chat?.data?.lastMessageSenderName}
                </h4>
                <span className='pl-1 text-xs'>22:00</span>
              </div>
              <p className='text-sm opacity-70 line-clamp-1 break-all'>
                {chat?.data?.lastMessage}
              </p>
            </div>
          </NavLink>
        ))
      ) : (
        ''
      )}
    </div>
  );
};

export default GBChatSidebar;
