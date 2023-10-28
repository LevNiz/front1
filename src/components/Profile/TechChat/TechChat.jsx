import chatBg from '../../../assets/images/chat-bg.jpeg';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from '../../../helpers/FormatDate/FormatDate';
import { fetchSupportChats, sendMessage } from '../../../api/chats';
import { fetchUser } from '../../../api/client';

const TechChat = () => {
  const { userID } = useSelector((state) => state?.user);
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchMessages = fetchSupportChats(userID, (newDocData) => {
      setMessages(newDocData);
    });

    return () => {
      fetchMessages();
    };
  }, []);

  const handleSendMessage = (e) => {
    sendMessage(e, userID, inputVal, userData);
    setInputVal('');
  };

  useEffect(() => {
    (async () => {
      const { success, data } = await fetchUser(userID);
      if (success) {
        setUserData(data);
      }
    })();
  }, []);

  return (
    <div className='w-screen scrollable'>
      <div className='relative'>
        <div className='flex items-center w-full p-2'>
          <div className='min-w-[50px] border-2 border-colYellow w-[50px] h-[50px] p-[2px] rounded-full overflow-hidden mr-3'>
            <img
              className='object-cover w-full h-full rounded-[50%]'
              src='https://cdn1.vectorstock.com/i/1000x1000/05/80/operator-man-avatar-customer-service-vector-9400580.jpg'
              alt='*'
            />
          </div>
          <div className='flex flex-col'>
            <h4 className='font-medium'>GivBox Support</h4>
          </div>
        </div>
        <div
          className='h-[calc(100vh_-_180px)] border border-gray-300 overflow-y-scroll p-2 pb-20 flex flex-col justify-end'
          style={{ backgroundImage: `url('${chatBg}')` }}
        >
          {messages?.map((message) => (
            <div
              key={message.id}
              className={`${
                Number(message?.data?.senderUid) === userID
                  ? 'ml-auto flex justify-end'
                  : ''
              } w-4/5`}
            >
              <div className='text-right w-fit flex flex-col'>
                <p
                  className={`${
                    Number(message?.data?.senderUid) === userID
                      ? 'bg-green-200 rounded-l-xl rounded-tr-xl ml-auto'
                      : 'bg-slate-500 text-white rounded-r-xl rounded-tl-xl'
                  }  text-left px-3 py-1 mb-1 text-[12px] mm:text-base break-all w-fit`}
                >
                  {message?.data?.text}
                </p>
                <span className='mr-3 mb-2 text-[8px] mm:text-[12px] text-gray-500'>
                  {message?.data?.time
                    ? formatDate(message?.data?.time)
                    : '-- --'}
                </span>
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => handleSendMessage(e)}
          className='w-full absolute bottom-0 left-0'
        >
          <div className='flex items-center relative m-2 mr-3'>
            <textarea
              id='chat'
              type='textarea'
              onChange={(e) => setInputVal(e.target.value)}
              value={inputVal}
              className='pl-3 pr-10 py-3 w-full caret-gray-500 rounded-xl focus:outline-none resize-none text-base text-gray-900 bg-white border border-gray-300'
              placeholder='Введите сообщение...'
              // onKeyDown={(e) => {
              //   if (e.key === 'Enter') {
              //     handleSendMessage
              //   }
              // }}
            ></textarea>
            <button
              type='submit'
              className='absolute top-[50%] -translate-y-[50%] right-0 inline-flex justify-center p-2 text-tpPurple2 cursor-pointer'
            >
              <svg
                aria-hidden='true'
                className='w-8 h-8 rotate-90'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
              </svg>
              <span className='sr-only'>Send message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TechChat;
