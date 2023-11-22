import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FormatDate } from '../../helpers/FormatDate/formatDate';

import noImg from '../../assets/images/no-ava.jpeg';
import tick from '../../assets/icons/read.png';
import doubleTick from '../../assets/icons/read2.png';

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
          <div className='flex items-center'>
            <h4 className='font-medium line-clamp-1 break-all text-sm md:text-base mm:text-xs'>
              {chat?.data?.lastMessageReceiver === `${userID}`
                ? chat?.data?.lastMessageSenderName
                : chat?.data?.lastMessageReceiverName}
            </h4>
            <span
              className={`${
                chat?.data?.buyerChat ? '' : 'hidden'
              } text-[10px] ml-2 border border-gray-500 px-1.5 rounded-md bg-slate-100`}
            >
              {chat?.data?.buyerChat ? 'buyer' : ''}
            </span>
          </div>
          <span
            className={`${
              chat?.unreadMessagesCount > 0 ? 'block' : 'hidden'
            } bg-red-500 h-5 min-w-[20px] flex justify-center items-center text-xs text-white rounded-md px-1 ml-2`}
          >
            {chat?.unreadMessagesCount > 99 ? '99+' : chat?.unreadMessagesCount}
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex justify-between items-center w-full'>
            <p className='text-sm mm:text-xs md:text-sm opacity-70 line-clamp-1 break-all'>
              {chat?.data?.lastMessage}
            </p>
            <span className='pl-2 text-[9px] leading-[10px] lg:leading-[14px] lg:text-[10px] text-right min-w-fit'>
              {chat?.data?.lastMessageTime ? (
                <FormatDate dateFormat={chat?.data?.lastMessageTime} />
              ) : (
                '-- --'
              )}
            </span>
          </div>
          {chat?.data?.lastMessageSender === `${userID}` ? (
            <>
              {chat?.data?.lastMessageRead ? (
                <img className='w-[14px] ml-1' src={doubleTick} alt='*' />
              ) : (
                <img className='w-[14px] ml-1' src={tick} alt='*' />
              )}
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </NavLink>
  );
};

export default GBChatSidebar;
