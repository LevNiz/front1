import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormatDate } from '../../../helpers/FormatDate/formatDate';

const GBChatSidebar = ({ chat }) => {
  const { userID } = useSelector((state) => state?.user);

  return (
    <NavLink to={chat?.chatId} className='flex items-center'>
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
            {chat?.data?.lastMessageSender === `${userID}`
              ? 'Вы'
              : chat?.data?.lastMessageSenderName}
          </h4>
          <span className='pl-1 text-xs'>
            {chat?.data?.lastMessageTime ? (
              <FormatDate dateFormat={chat?.data?.lastMessageTime} />
            ) : (
              '-- --'
            )}
          </span>
        </div>
        <p className='text-sm opacity-70 line-clamp-1 break-all'>
          {chat?.data?.lastMessage}
        </p>
      </div>
    </NavLink>
  );
};

export default GBChatSidebar;
