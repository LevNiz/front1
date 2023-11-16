import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { ContentLoading } from '../../helpers/Loader/Loader';
import { FormatDate } from '../../helpers/FormatDate/formatDate';
import {
  fetchChatMessages,
  sendGBChatImage,
  sendMessage,
} from '../../api/gbchat';
import { fetchUser } from '../../api/client';

import chatBg from '../../assets/images/chat-bg.jpeg';
import chatImg from '../../assets/images/chat.png';
import noImg from '../../assets/images/no-image.svg';
import noAva from '../../assets/images/no-ava.jpeg';
import back from '../../assets/icons/arrow-left.svg';
import tick from '../../assets/icons/read.png';
import doubleTick from '../../assets/icons/read2.png';
import clipFile from '../../assets/icons/clip-file.svg';

const GBChatMessages = ({ chats, setChatContent }) => {
  const { userID } = useSelector((state) => state?.user);
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [senderData, setSenderData] = useState({});
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [clickedImageUrl, setClickedImageUrl] = useState(null);

  const messagesEndRef = useRef();
  const { id } = useParams();
  const chatData = chats.find((chat) => chat?.chatId === id)?.data || {};

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
    (async () => {
      const { success, data } = await fetchUser(userID);
      if (success) {
        setSenderData(data);
      }
    })();
  }, [userID]);

  useEffect(() => {
    const fetchChats = async () => {
      setIsLoading(true);
      await fetchChatMessages(id, senderData, (data) => {
        setMessages(data);
        setIsLoading(false);
      });
    };

    if (id) {
      fetchChats();
    }
  }, [id, senderData, navigate]);

  const handleSendMessage = async (e) => {
    setInputVal('');
    await sendMessage(e, inputVal, senderData, chatData);
  };

  const handleSendImage = (e) => {
    const file = e.target.files[0];
    (async () => {
      await sendGBChatImage(senderData, chatData, file);
    })();
  };

  return (
    <div className='relative w-full'>
      <>
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
              src={chatData?.lastMessageReceiverAvatar}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = noAva;
              }}
              alt='*'
            />
          </div>
          <div className='flex flex-col'>
            <h4 className='font-medium'>
              {chatData?.lastMessageReceiverName || '-'}
            </h4>
          </div>
        </div>
        <div
          className='h-[calc(100vh-136px)] mm:h-[calc(100vh-180px)] border md:border-0 md:border-t scrollable border-gray-300 overflow-y-scroll p-2 pb-16'
          style={{ backgroundImage: `url('${chatBg}')` }}
        >
          {isLoading ? (
            <ContentLoading extraStyle='100%' />
          ) : messages?.length ? (
            messages?.map((message) =>
              message?.data?.senderUid === `${userID}` ? (
                <div
                  key={message.id}
                  className='ml-auto justify-end w-4/5 flex my-1'
                >
                  <div className='text-right w-fit flex flex-col'>
                    <p
                      className={`bg-green-200 rounded-l-xl rounded-tr-xl ml-auto ${
                        message?.data?.text ? 'px-3 py-1 mb-1' : ''
                      } text-[12px] mm:text-sm break-all w-fit flex items-end`}
                    >
                      {message?.data?.text}
                    </p>
                    {message?.data?.image ? (
                      <div className='w-28 h-28 rounded-l-xl rounded-tr-xl overflow-hidden mb-1 bg-green-200 p-1'>
                        <img
                          className='w-full h-full object-cover cursor-zoom-in rounded-l-xl rounded-tr-xl'
                          src={message?.data?.image}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = noImg;
                          }}
                          alt='*'
                          onClick={(e) => {
                            setOpenImg(true);
                            setClickedImageUrl(e.target.getAttribute('src'));
                          }}
                        />
                      </div>
                    ) : (
                      ''
                    )}
                    <span className='mr-3 mb-2 text-[8px] mm:text-[10px] text-gray-500 flex justify-end'>
                      {message?.data?.time ? (
                        <FormatDate dateFormat={message?.data?.time} />
                      ) : (
                        '-- --'
                      )}
                      {message?.data?.read ? (
                        <img
                          className='w-[14px] ml-1'
                          src={doubleTick}
                          alt='*'
                        />
                      ) : (
                        <img className='w-[14px] ml-1' src={tick} alt='*' />
                      )}
                    </span>
                  </div>
                </div>
              ) : (
                <div key={message.id} className='w-4/5 flex my-1'>
                  <div className='text-right w-fit flex flex-col'>
                    <p
                      className={`bg-slate-500 text-white rounded-r-xl rounded-bl-xl mt-1 text-left ${
                        message?.data?.text ? 'px-3 py-1 mb-1' : ''
                      } text-[12px] mm:text-sm break-all w-fit flex items-end`}
                    >
                      {message?.data?.text}
                    </p>
                    {message?.data?.image ? (
                      <div className='w-28 h-28 rounded-r-xl rounded-bl-xl overflow-hidden p-1 bg-slate-500'>
                        <img
                          className='w-full h-full object-cover cursor-zoom-in  rounded-r-xl rounded-bl-xl'
                          src={message?.data?.image}
                          alt='*'
                          onClick={(e) => {
                            setOpenImg(true);
                            setClickedImageUrl(e.target.getAttribute('src'));
                          }}
                        />
                      </div>
                    ) : (
                      ''
                    )}
                    <span className='ml-3 text-left mb-2 text-[8px] mm:text-[10px] text-gray-500'>
                      {message?.data?.time ? (
                        <FormatDate dateFormat={message?.data?.time} />
                      ) : (
                        '-- --'
                      )}
                    </span>
                  </div>
                </div>
              )
            )
          ) : (
            <div className='w-full h-full flex justify-center items-center pb-5 px-4'>
              <div className='text-center'>
                <img className='w-3/4 mm:w-1/2 mx-auto' src={chatImg} alt='*' />
                <h2 className='font-medium text-xl sm:text-2xl'>Чат создан!</h2>
                <p className='text-gray-500 text-sm mt-1'>
                  Начните общаться с{' '}
                  <span className='font-medium text-black'>
                    {chatData?.lastMessageReceiverName}
                  </span>
                </p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>
      </>
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
            className='pl-8 pr-10 py-3 w-full rounded-md sm:rounded-xl focus:outline-none resize-none text-base text-gray-900 bg-white border border-gray-300'
            placeholder='Введите сообщение'
          ></textarea>
          <label
            className='absolute top-1/2 -translate-y-1/2 cursor-pointer -left-1 w-10 opacity-70'
            htmlFor='file'
          >
            <img className='opacity-70' src={clipFile} alt='*' />
            <input
              className='hidden'
              name='image'
              accept='image/*'
              onChange={(e) => handleSendImage(e)}
              type='file'
              id='file'
            />
          </label>
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
          </button>
        </div>
      </form>
      <div
        className={`${
          openImg ? '' : 'hidden'
        } fixed top-0 left-0 w-full h-full z-[99999999] bg-[rgba(0,0,0,.8)] p-5`}
      >
        <span
          onClick={() => setOpenImg(false)}
          className='absolute top-0 right-0 flex items-center h-[70px] mm:h-[90px] p-5 mm:p-10 cursor-pointer text-white text-5xl z-10 bg-[rgba(0,0,0,.7)]'
        >
          &times;
        </span>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 md:px-10 w-full'>
          <img className='mx-auto max-h-[90vh]' src={clickedImageUrl} alt='*' />
        </div>
      </div>
    </div>
  );
};

export default GBChatMessages;
