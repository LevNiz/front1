// import { db } from "../../../firebase/firebase";

const TechChat = () => {
  return (
    <div className='w-screen md:p-4 !pt-0'>
      <div className='w-full h-full flex relative justify-between items-center rounded-[12px] flex-col px-3 py-3'>
        <div className='w-full h-full'>
          <div className='flex items-center w-full pb-3 border-b-[1px] border-gray-200'>
            <div className='sm:hidden block mr-3'></div>
            <div className='min-w-[50px] border-[1px] border-tpPurple2 w-[50px] h-[50px] p-[1.5px] rounded-[50%] overflow-hidden mr-3'>
              <img
                className='object-cover w-full h-full rounded-[50%]'
                src='https://t3.ftcdn.net/jpg/02/39/63/06/360_F_239630622_lMzoP7BsTMLwIeDzFEvNfJisLJSYy0Wa.jpg'
                // onError={(e) => {
                //   e.target.onerror = null;
                //   e.target.src = emptyImg;
                // }}
                alt='*'
              />
            </div>
            <div className='flex flex-col'>
              <h4 className='text-lg'>GivBox Support</h4>
            </div>
          </div>
          <div className='w-full h-[calc(100vh_-_150px)] sm:h-[calc(100vh_-_180px)] overflow-y-scroll scrollable pr-2 pt-2 bg-[url(https://img.freepik.com/premium-vector/social-networks-dating-apps-vector-seamless-pattern_341076-469.jpg)]'>
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
                  className='text-left text-white bg-slate-500 p-2 md:p-3 mb-1 text-[12px] mm:text-base break-all'
                >
                  {/* {message?.data?.text} */}lorem lorem
                </p>
                <span className='mr-3 text-[8px] mm:text-[12px] text-gray-500'>
                  {/* {message?.data?.time
                    ? formatDate(message?.data?.time)
                    : '-- --'} */}
                </span>
              </div>
            </div>
            {/* ))} */}
            {/* <div ref={messagesEndRef}></div> */}
          </div>
        </div>
        <form className='w-full absolute bottom-0 left-0'>
          <div className='flex items-center relative mx-3 mb-3'>
            <textarea
              id='chat'
              type='text'
              // maxRows={2}
              // onChange={(e) => setInput(e.target.value)}
              // value={input}
              className='pl-5 pr-10 py-3 w-full rounded-xl resize-none text-base text-gray-900 bg-white border border-gray-400'
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
