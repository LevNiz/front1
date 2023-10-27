// import { db } from "../../../firebase/firebase";
import chatBg from '../../../assets/images/chat-bg.jpeg';

const TechChat = () => {
  return (
    <div className='w-screen scrollable'>
      <div className='relative'>
        <div className='flex items-center w-full p-2'>
          <div className='min-w-[50px] border-2 border-colYellow w-[50px] h-[50px] p-[2px] rounded-full overflow-hidden mr-3'>
            <img
              className='object-cover w-full h-full rounded-[50%]'
              src='https://cdn1.vectorstock.com/i/1000x1000/05/80/operator-man-avatar-customer-service-vector-9400580.jpg'
              // onError={(e) => {
              //   e.target.onerror = null;
              //   e.target.src = emptyImg;
              // }}
              alt='*'
            />
          </div>
          <div className='flex flex-col'>
            <h4 className='font-medium'>GivBox Support</h4>
          </div>
        </div>
        <div
          className='h-[calc(100vh_-_180px)] border border-gray-300 overflow-y-scroll p-2'
          style={{
            backgroundImage: `url('${chatBg}')`,
          }}
        >
          {/* {messages?.map((message) => ( */}
          <div
            // key={message.id}
            // className={`${
            //    message?.data?.sender == currentUser?.id
            //     ? 'ml-auto flex justify-end'
            //     : ''
            // } w-4/5`}
            className='w-4/5'
          >
            <div className='text-right w-fit flex flex-col'>
              <p
                // className={`${
                //   message?.data?.sender == currentUser?.id
                //     ? 'bg-tpPurple1 rounded-l-xl rounded-tr-xl'
                //     : 'bg-slate-500 rounded-r-xl rounded-tl-xl'
                // }  text-left text-white p-2 md:p-3 mb-1 text-[12px] mm:text-base break-all`}
                className='text-left text-white bg-slate-500 p-2 text-[12px] mm:text-base break-all rounded-xl rounded-tl-none '
              >
                {/* {message?.data?.text} */}lorem lorem
              </p>
              <span className='mr-3 mb-2 text-[8px] mm:text-[12px] text-gray-500'>
                21:14
              </span>
            </div>
          </div>
          <div className='w-4/5 ml-auto flex justify-end'>
            <div className='text-right w-fit flex flex-col'>
              <p className='text-left text-black bg-green-200 rounded-xl rounded-br-none p-2 text-[12px] mm:text-base break-all'>
                lorem lorem sdcscs sdocisocssc
              </p>
              <span className='mr-3 mb-2 text-[8px] mm:text-[12px] text-gray-500'>
                12:00
              </span>
            </div>
          </div>
          {/* ))} */}
          {/* <div ref={messagesEndRef}></div> */}
        </div>
        <form className='w-full absolute bottom-0 left-0'>
          <div className='flex items-center relative m-2 mr-3'>
            <textarea
              id='chat'
              type='textarea'
              // onChange={(e) => setInput(e.target.value)}
              // value={input}
              className='pl-3 pr-10 py-3 w-full caret-gray-500 rounded-xl focus:outline-none resize-none text-base text-gray-900 bg-white border border-gray-300'
              placeholder='Введите сообщение...'
              // onKeyDown={(e) => {
              //   if (e.key === 'Enter') {
              //     sendMessage;
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
