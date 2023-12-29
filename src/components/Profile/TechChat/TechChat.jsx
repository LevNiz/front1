import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import {
  fetchSupportChats,
  sendImage,
  sendMessage,
} from '../../../api/techChat';
import { fetchUser } from '../../../api/client';
import { FormatDate } from '../../../helpers/FormatDate/formatDate';
import logo from '../../../assets/images/logo.png';
import chatImg from '../../../assets/images/empty-chat.svg';
import tick from '../../../assets/icons/read.png';
import doubleTick from '../../../assets/icons/read2.png';
import clipFile from '../../../assets/icons/clip-file.svg';
import noImg from '../../../assets/images/no-image.svg';
import sendIcon from '../../../assets/images/send.svg';

const TechChat = () => {
  const { userID } = useSelector((state) => state?.user);

  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [openImg, setOpenImg] = useState(false);
  const [clickedImageUrl, setClickedImageUrl] = useState(null);

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

  useEffect(() => {
    const unsubscribe = fetchSupportChats(userID, (newDocData) => {
      setMessages(newDocData);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [userID]);

  const handleSendMessage = (e) => {
    sendMessage(e, inputVal, userData);
    setInputVal('');
  };

  const handleSendImage = (e) => {
    const file = e.target.files[0];
    (async () => {
      await sendImage(file, userData);
    })();
  };

  useEffect(() => {
    (async () => {
      const { success, data } = await fetchUser(userID);
      if (success) {
        setUserData(data);
      }
    })();
  }, [userID]);

  return (
    <div className='w-screen'>
      <div className='relative'>
        <div className='flex items-center w-full pt-0 mm:pt-2 p-2'>
          <div className='min-w-[48px] w-12 h-12 rounded-full overflow-hidden mr-3 flex justify-center items-center bg-colYellow'>
            <img className='object-cover w-8' src={logo} alt='*' />
          </div>
          <div className='flex flex-col'>
            <h4 className='font-medium'>GivBox Admin</h4>
          </div>
        </div>
        <div className='h-[calc(100vh-126px)] md:h-[calc(100vh-162px)] border md:border-0 md:border-t scrollable border-gray-300 overflow-y-scroll p-2 pb-20 bg-[#F7F7F7]'>
          {isLoading ? (
            <ContentLoading extraStyle='100%' />
          ) : messages?.length ? (
            messages?.map((message) =>
              message?.data?.senderUid == `${userID}` ? (
                <div
                  key={message?.id}
                  className='ml-auto justify-end w-4/5 flex my-1'
                >
                  <div className='w-fit flex flex-col'>
                    <p
                      className={`bg-green-200 rounded-l-xl rounded-tr-xl ml-auto ${
                        message?.data?.text ? 'px-3 py-1 mb-1' : ''
                      } text-[12px] mm:text-sm break-all w-fit flex items-end`}
                    >
                      {message?.data?.text}
                    </p>
                    {message?.data?.image && (
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
                <div key={message?.id} className='w-4/5 flex my-1'>
                  <div className='text-right w-fit flex flex-col'>
                    <p
                      className={` ${
                        message?.data?.text ? 'flex' : 'hidden'
                      } text-[12px] mm:text-sm break-all w-fit items-end bg-slate-500 text-white rounded-r-xl rounded-bl-xl px-3 py-1 my-1 text-left`}
                    >
                      {message?.data?.text}
                    </p>
                    {message?.data?.image && (
                      <div className='w-28 h-28 rounded-r-xl rounded-bl-xl overflow-hidden p-1 bg-slate-500'>
                        <img
                          className='w-full h-full object-cover cursor-zoom-in  rounded-r-xl rounded-bl-xl'
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
                <img className='max-w-xs mx-auto' src={chatImg} alt='*' />
                <h2 className='font-medium text-xl sm:text-2xl pt-5'>
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
          className='w-full absolute bottom-0 left-0 bg-[#ECECEC]'
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
              className='pl-4 ml-[34px] pr-3 mr-[60px] py-3 w-full rounded-md sm:rounded-xl focus:outline-none resize-none text-base text-gray-900 bg-white border border-gray-300'
              placeholder='Введите сообщение'
            ></textarea>
            <label
              className='absolute top-1/2 -translate-y-1/2 cursor-pointer -left-1 w-10 opacity-70'
              htmlFor='file'
            >
              <img src={clipFile} alt='*' />
              <input
                className='hidden'
                name='image'
                accept='image/jpeg, image/png, image/webp'
                onChange={(e) => handleSendImage(e)}
                type='file'
                id='file'
              />
            </label>
            <button
              type='submit'
              className='absolute top-[50%] -translate-y-[50%] -right-[5px] inline-flex justify-center p-2 text-tpPurple2 cursor-pointer'
            >
              <img src={sendIcon} alt='*' />
            </button>
          </div>
        </form>
      </div>
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

export default TechChat;
