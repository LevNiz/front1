import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ContentLoading } from '../../helpers/Loader/Loader';
import { fetchChatMessages } from '../../api/chats';
import { FormatDate } from '../../helpers/FormatDate/formatDate';
import chatBg from '../../assets/images/chat-bg.jpeg';
import chatImg from '../../assets/images/chat.png';
import back from '../../assets/icons/arrow-left.svg';

const GBChatMessages = ({ setChatContent }) => {
  const { userID } = useSelector((state) => state?.user);
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const messagesEndRef = useRef();
  const { id } = useParams();
  const { pathname } = useLocation();
  const chatID = pathname?.split('/')[3] ?? null;

  const scrollToBottom = () => {
    const scrollable = messagesEndRef.current;
    const atBottom =
      scrollable.scrollHeight - scrollable.scrollTop ===
      scrollable.clientHeight;
    if (atBottom) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    setIsLoading(true);
    const fetchChats = fetchChatMessages(id, (messagesData) => {
      setMessages(messagesData);
      setIsLoading(false);
    });

    return () => {
      fetchChats();
    };
  }, [chatID]);

  return (
    <div className='relative w-full'>
      <div className='flex items-center w-full p-2'>
        <img
          onClick={() => {
            navigate('/gb-chat');
            setChatContent(false);
          }}
          className='mm:hidden mr-2 cursor-pointer'
          src={back}
          alt='*'
        />
        <div className='min-w-[48px] border border-gray-400 w-12 h-12 rounded-full overflow-hidden mr-3'>
          <img
            className='object-cover w-full h-full rounded-[50%]'
            src='https://st3.depositphotos.com/3431221/13621/v/450/depositphotos_136216036-stock-illustration-man-avatar-icon-hipster-character.jpg'
            alt='*'
          />
        </div>
        <div className='flex flex-col'>
          <h4 className='font-medium'>GivBox Support</h4>
        </div>
      </div>
      <div
        className='h-[calc(100vh-136px)] mm:h-[calc(100vh-180px)] border md:border-0 md:border-t scrollable border-gray-300 overflow-y-scroll p-2 pb-16'
        style={{ backgroundImage: `url('${chatBg}')` }}
      >
        {isLoading ? (
          <ContentLoading extraStyle='100%' />
        ) : messages?.length ? (
          messages?.map((message) => (
            <div
              key={message.id}
              className={`${
                message?.data?.senderUid === `${userID}`
                  ? 'ml-auto justify-end'
                  : ''
              } w-4/5 flex`}
            >
              <div className='text-right w-fit flex flex-col'>
                <p
                  className={`${
                    message?.data?.senderUid === `${userID}`
                      ? 'bg-green-200 rounded-l-xl rounded-tr-xl ml-auto'
                      : 'bg-slate-500 text-white rounded-r-xl rounded-bl-xl mt-1'
                  }  text-left px-3 py-1 mb-1 text-[12px] mm:text-sm break-all w-fit`}
                >
                  {message?.data?.text}
                </p>
                <span
                  className={`${
                    message?.data?.senderUid === `${userID}`
                      ? 'mr-3'
                      : 'ml-3 text-left'
                  } mb-2 text-[8px] mm:text-[12px] text-gray-500`}
                >
                  {message?.data?.time ? (
                    <FormatDate dateFormat={message?.data?.time} />
                  ) : (
                    '-- --'
                  )}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className='w-full h-full flex justify-center items-center pb-5 px-4'>
            <div className='text-center'>
              <img className='w-3/4 mm:w-1/2 mx-auto' src={chatImg} alt='*' />
              <h2 className='font-medium text-xl sm:text-2xl'>Чат создан!</h2>
              <p className='text-gray-500 text-sm mt-1'>
                Начните общаться с{' '}
                <span className='font-medium text-black'>
                  Омурбек Аббдуллаев
                </span>
              </p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>
      <form
        // onSubmit={(e) => handleSendMessage(e)}
        className='w-full absolute bottom-0 left-0'
      >
        <div className='flex items-center relative m-2 mr-3'>
          <textarea
            id='chat'
            type='textarea'
            onChange={(e) => {
              setInputVal(e.target.value);
              const numLines = e.target.value.split('\n').length;
              e.target.rows = numLines > 2 ? 2 : 1;
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                // handleSendMessage(e);
              }
            }}
            value={inputVal}
            rows='1'
            className='pl-3 pr-10 py-3 w-full rounded-md sm:rounded-xl focus:outline-none resize-none text-base text-gray-900 bg-white border border-gray-300'
            placeholder='Введите сообщение'
          ></textarea>

          <button
            type='submit'
            onClick={() => alert('В процессе разработки!')}
            className='absolute top-[50%] -translate-y-[50%] right-0 inline-flex justify-center p-2 text-tpPurple2 cursor-pointer opacity-60'
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
          </button>
        </div>
      </form>
    </div>
  );
};

export default GBChatMessages;
