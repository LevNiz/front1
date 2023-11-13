import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FormatDate } from '../../helpers/FormatDate/formatDate';
import noImg from '../../assets/images/no-ava.jpeg';

const GBChatSidebar = ({ chat, setChatContent }) => {
  const { userID } = useSelector((state) => state?.user);

  return (
    <NavLink
      to={`t/${chat?.chatId}`}
      onClick={() => setChatContent(true)}
      className='flex items-center rounded-md p-2'
    >
      <div className='w-12 md:w-14 h-12 md:h-14 min-w-[48px] md:min-w-[56px] rounded-full overflow-hidden border border-colYellow'>
        <img
          className='w-full h-full object-cover rounded-full p-[2px]'
          src={chat?.data?.lastMessageReceiverAvatar}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = noImg;
          }}
          alt='*'
        />
      </div>
      <div className='ml-2 w-full'>
        <div className='flex justify-between items-center'>
          <h4 className='font-medium line-clamp-1 break-all text-sm md:text-base mm:text-xs'>
            {chat?.data?.lastMessageSender === `${userID}`
              ? 'Вы'
              : chat?.data?.lastMessageSenderName}
          </h4>
          <span className='pl-1 text-[10px] leading-[10px] lg:leading-[14px] lg:text-xs text-right min-w-fit'>
            {chat?.data?.lastMessageTime ? (
              <FormatDate dateFormat={chat?.data?.lastMessageTime} />
            ) : (
              '-- --'
            )}
          </span>
        </div>
        <p className='text-sm mm:text-xs md:text-sm opacity-70 line-clamp-1 break-all'>
          {chat?.data?.lastMessage}
        </p>
      </div>
    </NavLink>
  );
};

export default GBChatSidebar;
