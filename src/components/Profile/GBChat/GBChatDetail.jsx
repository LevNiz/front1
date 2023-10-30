import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { FormatDate } from '../../../helpers/FormatDate/formatDate';
import chatBg from '../../../assets/images/chat-bg.jpeg';
import chatImg from '../../../assets/images/chat.png';
import back from '../../../assets/icons/arrow-left.svg';
import { useNavigate } from 'react-router-dom';

const GBChatDetail = () => {
  const { userID } = useSelector((state) => state?.user);
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef();

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

  return (
    <div className='w-full pt-1'>
      <div className='relative'>
        <div className='flex items-center w-full p-2'>
          <img
            onClick={() => navigate(-1)}
            className='mr-2'
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
          className='h-[calc(100vh-138px)] md:h-[calc(100vh-180px)] border md:border-0 md:border-t scrollable border-gray-300 overflow-y-scroll p-2 pb-20'
          style={{ backgroundImage: `url('${chatBg}')` }}
        >
          {isLoading ? (
            <ContentLoading extraStyle='100%' />
          ) : messages?.length ? (
            messages?.map((message) => (
              <div
                key={message.id}
                className={`${
                  message?.data?.senderUid === userID
                    ? 'ml-auto justify-end'
                    : ''
                } w-4/5 flex`}
              >
                <div className='text-right w-fit flex flex-col'>
                  <p
                    className={`${
                      message?.data?.senderUid === userID
                        ? 'bg-green-200 rounded-l-xl rounded-tr-xl ml-auto'
                        : 'bg-slate-500 text-white rounded-r-xl rounded-bl-xl mt-1'
                    }  text-left px-3 py-1 mb-1 text-[12px] mm:text-sm break-all w-fit`}
                  >
                    {message?.data?.text}
                  </p>
                  <span
                    className={`${
                      message?.data?.senderUid === userID
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
                <img className='w-3/4 mx-auto' src={chatImg} alt='*' />
                <h2 className='font-medium text-xl sm:text-2xl'>
                  Добро пожаловать в чат техподдержки!
                </h2>
                <p className='opacity-60 max-w-[300px] mt-1 mx-auto text-sm'>
                  Опишите вашу проблему, и администратор свяжется с вами.
                </p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>
        <form
          onSubmit={(e) => handleSendMessage(e)}
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
                  handleSendMessage(e);
                }
              }}
              value={inputVal}
              rows='1'
              className='pl-3 pr-10 py-3 w-full rounded-md sm:rounded-xl focus:outline-none resize-none text-base text-gray-900 bg-white border border-gray-300'
              placeholder='Введите сообщение'
            ></textarea>

            <button
              type='submit'
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
              <span className='sr-only'>Send message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GBChatDetail;
